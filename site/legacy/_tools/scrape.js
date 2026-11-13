// Usage: node scrape.js <outDir>
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const OUT = path.resolve(process.argv[2]);
const BASE = 'https://www.diogosilvaportfolio.com';
const PAGES = [
  { slug: 'home', url: BASE + '/' },
  { slug: 'dashboard-comercial', url: BASE + '/dashboard-comercial' },
  { slug: 'dashboard-fluxo-de-caixa', url: BASE + '/dashboard-fluxo-de-caixa' },
  { slug: 'dashboard-people-analytics', url: BASE + '/dashboard-people-analytics' },
  { slug: 'copia-dashboard-people-analytics', url: BASE + '/' + encodeURIComponent('cópia-dashboard-people-analytics') },
];

function download(url, dest) {
  execFileSync('curl', ['-sSfL', '--retry', '3', '-o', dest, url]);
}

// Wix image URL -> original file URL (drops the /v1/fill/... resize transform)
function originalWixUrl(u) {
  const m = u.match(/^https:\/\/static\.wixstatic\.com\/media\/([^/?#]+)/);
  return m ? { url: 'https://static.wixstatic.com/media/' + m[1], name: m[1] } : null;
}

const data_wait = p => p.slug === 'home' ? 5000 : 25000;
(async () => {
  fs.mkdirSync(path.join(OUT, 'images'), { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, locale: 'pt-BR' });
  const failedHosts = new Set();
  const allImages = new Map();
  const manifest = { source: BASE, capturedAt: new Date().toISOString(), viewport: '1440x900 @2x', pages: [] };

  for (const p of PAGES) {
    const page = await ctx.newPage();
    page.on('requestfailed', r => failedHosts.add(new URL(r.url()).host + ' (' + (r.failure() || {}).errorText + ')'));
    const resp = await page.goto(p.url, { waitUntil: 'load', timeout: 90000 });
    // scroll slowly to trigger lazy-loaded sections and images
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 250)); }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(data_wait(p));

    const dir = path.join(OUT, 'pages', p.slug);
    fs.mkdirSync(dir, { recursive: true });
    await page.screenshot({ path: path.join(dir, 'screenshot-full.png'), fullPage: true });
    fs.writeFileSync(path.join(dir, 'rendered.html'), await page.content());

    const data = await page.evaluate(() => {
      const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
      const blocks = [];
      document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,a,button,img').forEach(el => {
        if (!vis(el)) return;
        const tag = el.tagName.toLowerCase();
        const top = Math.round(el.getBoundingClientRect().top + scrollY);
        if (tag === 'img') { blocks.push({ tag, top, src: el.currentSrc || el.src, alt: el.alt || '' }); return; }
        if ((tag === 'a' || tag === 'button' || tag === 'li') && el.querySelector('h1,h2,h3,h4,h5,h6,p')) return;
        const text = el.innerText.trim(); if (!text) return;
        const b = { tag, top, text }; if (tag === 'a') b.href = el.href; blocks.push(b);
      });
      blocks.sort((a, b) => a.top - b.top);
      const sections = [...document.querySelectorAll('section, header, footer')].filter(vis).map(s => ({
        tag: s.tagName.toLowerCase(), id: s.id, top: Math.round(s.getBoundingClientRect().top + scrollY), height: Math.round(s.getBoundingClientRect().height),
        headings: [...s.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(vis).map(h => h.innerText.trim()).filter(Boolean),
      }));
      const bgImages = [...document.querySelectorAll('*')].map(e => getComputedStyle(e).backgroundImage).filter(b => b && b.includes('url(')).map(b => b.match(/url\("?([^")]+)"?\)/)[1]);
      const iframes = [...document.querySelectorAll('iframe')].map(f => f.src).filter(Boolean);
      return { title: document.title, description: (document.querySelector('meta[name=description]') || {}).content || '', height: document.documentElement.scrollHeight, blocks, sections, bgImages, iframes, fullText: document.body.innerText };
    });

    // text.md: readable text in page order
    const md = ['# ' + data.title, '', '<' + p.url + '>', ''];
    let lastText = null;
    for (const b of data.blocks) {
      if (b.tag === 'img') { const o = originalWixUrl(b.src); md.push(`![${b.alt}](../../images/${o ? o.name : path.basename(b.src)})`, ''); continue; }
      if (b.text === lastText) continue; lastText = b.text;
      if (/^h[1-6]$/.test(b.tag)) md.push('#'.repeat(Math.min(+b.tag[1] + 1, 6)) + ' ' + b.text, '');
      else if (b.tag === 'li') md.push('- ' + b.text);
      else if (b.tag === 'a') md.push(`[${b.text}](${b.href})`, '');
      else md.push(b.text, '');
    }
    fs.writeFileSync(path.join(dir, 'text.md'), md.join('\n'));
    fs.writeFileSync(path.join(dir, 'text-full.txt'), data.fullText);

    const imgs = new Set();
    for (const src of [...data.blocks.filter(b => b.tag === 'img').map(b => b.src), ...data.bgImages]) {
      const o = originalWixUrl(src); if (o) { allImages.set(o.name, o.url); imgs.add(o.name); }
    }
    const structure = { url: p.url, httpStatus: resp && resp.status(), title: data.title, description: data.description, pageHeightPx: data.height, sections: data.sections, iframes: data.iframes, images: [...imgs], blocks: data.blocks };
    fs.writeFileSync(path.join(dir, 'structure.json'), JSON.stringify(structure, null, 2));
    manifest.pages.push({ slug: p.slug, url: p.url, title: data.title, httpStatus: structure.httpStatus, images: imgs.size, iframes: data.iframes.length, pageHeightPx: data.height });
    for (const [i, src] of data.iframes.entries()) {
      const html = execFileSync('curl', ['-sSfL', src]).toString();
      fs.writeFileSync(path.join(dir, `embed-${i + 1}.html`), html);
      const pbi = (html.match(/src="(https:\/\/app\.powerbi\.com\/view[^"]+)"/) || [])[1];
      if (!pbi) continue;
      const e = await ctx.newPage();
      e.on('requestfailed', r => failedHosts.add(new URL(r.url()).host + ' (' + (r.failure() || {}).errorText + ')'));
      await e.goto(pbi.replace(/&amp;/g, '&'), { waitUntil: 'load', timeout: 90000 });
      await e.waitForTimeout(25000);
      await e.screenshot({ path: path.join(dir, `powerbi-${i + 1}.png`) });
      structure.powerbi = (structure.powerbi || []).concat({ embed: src, report: pbi.replace(/&amp;/g, '&'), title: (html.match(/title="([^"]*)"/) || [])[1] });
      await e.close();
    }
    fs.writeFileSync(path.join(dir, 'structure.json'), JSON.stringify(structure, null, 2));
    console.log(p.slug, structure.httpStatus, data.title, 'imgs:', imgs.size, 'height:', data.height);
    await page.close();
  }
  await browser.close();

  const dl = [];
  for (const [name, url] of allImages) {
    try { download(url, path.join(OUT, 'images', name)); dl.push({ name, url }); }
    catch (e) { dl.push({ name, url, error: e.message }); console.log('image failed', e.message); }
  }
  manifest.images = dl;
  manifest.blockedOrFailedRequests = [...failedHosts];
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('images:', dl.length, 'failed requests:', [...failedHosts]);
})();
