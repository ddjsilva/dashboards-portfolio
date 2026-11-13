# Site legado (Wix)

Cópia do site publicado em <https://www.diogosilvaportfolio.com/>, capturada em 2026-11-13.

## Estrutura

```
manifest.json          lista de páginas, imagens baixadas e requisições que falharam
images/                imagens originais (sem redimensionamento do Wix) usadas nas páginas
pages/<página>/
  screenshot-full.png  screenshot de página inteira (1440px de largura, 2x)
  powerbi-1.png        screenshot direto do relatório Power BI incorporado (páginas de dashboard)
  embed-1.html         HTML do embed do Wix (iframe do Power BI)
  text.md              textos em ordem de leitura, com títulos, listas, links e imagens
  text-full.txt        texto bruto da página (innerText)
  structure.json       título, descrição, seções, blocos com posição, imagens e iframes
  rendered.html        DOM renderizado pelo navegador
_tools/scrape.js       script Playwright usado na captura
```

## Páginas

| Pasta | URL | Título |
|---|---|---|
| `home` | `/` | Portfolio Diogo Silva \| Soluções Analíticas para o seu Negócio |
| `dashboard-comercial` | `/dashboard-comercial` | Dashboard comercial |
| `dashboard-fluxo-de-caixa` | `/dashboard-fluxo-de-caixa` | Dashboard fluxo de caixa |
| `dashboard-people-analytics` | `/dashboard-people-analytics` | Dashboard people analytics |
| `copia-dashboard-people-analytics` | `/cópia-dashboard-people-analytics` | Dashboard Supply chain |

O slug da página de Supply chain ainda é `cópia-dashboard-people-analytics`, herdado de uma duplicação no Wix.

## Limitações

- Os dashboards são relatórios Power BI "Publicar na Web": os screenshots mostram só a página inicial de cada relatório, e os dados ficam no Power BI.
- O mapa "Delivered orders por estado" (Supply chain) aparece em branco porque usa Bing Maps, que não estava liberado na rede da captura.

## Recapturar

```bash
node _tools/scrape.js site/legacy
```
