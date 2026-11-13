import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Um arquivo .md por dashboard em src/content/projetos/.
// O nome do arquivo vira o endereço: supply-chain.md -> /projetos/supply-chain
const projetos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projetos' }),
  schema: ({ image }) =>
    z.object({
      // Card
      title: z.string(),
      area: z.string(), // rótulo curto: Financeiro, Comercial, RH...
      summary: z.string(), // uma frase de resumo
      cover: image(), // screenshot do dashboard
      coverAlt: z.string(),
      order: z.number(), // posição na grade

      // Case
      problem: z.string(), // a dor de negócio, em uma frase
      context: z.string(), // quem usaria e qual era a dor
      questions: z.array(z.string()).min(3).max(5), // o que o painel responde
      tools: z.array(z.string()).default(['Power BI']),

      // Link "Publicar na Web" do Power BI. Sem ele, o card mostra "Em breve".
      embedUrl: z.url().optional(),
    }),
});

export const collections = { projetos };
