# Briefing — Portfólio Power BI

Nov 12, 2026 · @Diogo

## Objetivo e público

O site existe para gerar conversas com potenciais clientes de consultoria em BI: o visitante entende o que eu resolvo, navega em dashboards reais e entra em contato.

- **Público principal:** gestores e donos de pequenas e médias empresas (financeiro, comercial, operações, RH) que têm dados espalhados e decidem no feeling.
- **Público secundário:** líderes de dados que buscam um consultor para um projeto pontual.
- **Ação esperada:** agendar uma conversa ou mandar uma mensagem (WhatsApp, e-mail ou LinkedIn).
- **O que o visitante precisa sair sabendo:** quais problemas eu resolvo, a prova disso (os dashboards) e como começar a trabalhar comigo.

Mudança em relação ao site atual: hoje o site parece um currículo (experiências, cursos, barras de habilidade). O novo fala com quem contrata, ou seja, mostra o problema do cliente, depois a solução e a prova.

## Mensagem e storytelling

A narrativa conduz o visitante do problema dele até o contato, com calma: nada de pop-up, contador ou "última chance". O tom é o de uma conversa com um especialista acessível.

**Frase central (rascunho):** "Transformo dados espalhados em painéis claros para decisões melhores."

A home é uma única página que se lê de cima para baixo, nesta ordem:

1. **Abertura:** a frase central, uma linha de apoio e um botão discreto ("Ver projetos").
2. **O problema:** 2 ou 3 dores comuns, em frases curtas ("planilhas que não conversam", "relatório que chega tarde").
3. **Como eu ajudo:** 3 serviços em blocos simples (ex.: diagnóstico de dados, construção de dashboards, sustentação e treinamento).
4. **Projetos:** a grade com os dashboards; cada card leva ao case completo.
5. **Como funciona:** o processo em 4 passos, da primeira conversa à entrega.
6. **Sobre mim:** foto e um parágrafo curto (mais de 6 anos em dados, pós em Data Analytics pela FIAP), sem barras de porcentagem.
7. **Contato:** um convite simples e os canais (WhatsApp, e-mail, LinkedIn).

**Regras de texto**

- Primeira pessoa, frases curtas, linguagem de negócio antes de linguagem técnica.
- Cada seção tem uma ideia só, e um título que já a resume.
- Termos técnicos (DAX, SQL, Airflow) aparecem só dentro dos cases, como detalhe.

## Estrutura do site

O site tem só dois tipos de página: a home (a narrativa acima) e uma página por dashboard, todas com o mesmo layout.

| Página | Endereço | Conteúdo |
| --- | --- | --- |
| Home | `/` | As 7 seções da narrativa |
| Projetos | `/projetos` | A grade com todos os dashboards (opcional, se a home ficar longa) |
| Case de dashboard | `/projetos/[nome]` | Contexto, embed do Power BI, resultados e o próximo projeto |
| 404 | — | Mensagem simples e um link de volta para a home |

**Navegação:** um menu fixo e enxuto (Projetos, Como funciona, Sobre, Contato), com um botão "Vamos conversar" sempre visível. No celular, o menu vira um ícone que abre a lista.

**Rodapé:** nome, os canais de contato e o ano. Sem créditos de plataforma.

## Dashboards

São 6 dashboards publicados por mim no Power BI e exibidos por embed, para o visitante navegar dentro do site. Eles entram aos poucos: o site já nasce pronto para receber cada um sem mexer no layout.

| # | Dashboard | Problema de negócio | Principais análises | Link do embed | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Financeiro e Vendas | Margem e caixa sem previsibilidade | Margem, fluxo de caixa, simulação de cenários |  | A publicar |
| 2 | Comercial | Metas sem acompanhamento claro | Vendas, cobertura, lucro vs. ano anterior |  | A publicar |
| 3 | People Analytics | Rotatividade alta e sem explicação | Turnover, contratações, desligamentos, absenteísmo |  | A publicar |
| 4 | Supply Chain | Entregas atrasadas e ruptura | Pedidos entregues, OnTime, OTIF, Stockout |  | A publicar |
| 5 | A definir |  |  |  | A publicar |
| 6 | A definir |  |  |  | A publicar |

**Como adicionar um dashboard sob demanda:** cada case é um arquivo de texto próprio no projeto (ex.: `projetos/supply-chain.md`). Para incluir um novo, basta criar o arquivo com os campos abaixo e o link do embed; o card na home e a página do case aparecem sozinhos. Enquanto o embed não existir, o card mostra "Em breve".

**Campos de cada case**

- Título e uma frase de resumo (aparecem no card)
- Imagem de capa (screenshot do dashboard)
- Contexto: quem usaria e qual era a dor
- O que o painel responde: 3 a 5 perguntas de negócio
- Link do embed ("Publicar na Web" do Power BI)
- Bastidores: fonte dos dados, modelagem, ferramentas (Power BI, SQL, Python)
- Chamada final: "Quer algo assim para a sua empresa?" e o botão de contato

Os dados de todos os dashboards precisam ser fictícios ou públicos, porque o "Publicar na Web" deixa o painel aberto para qualquer pessoa.

## Direção visual

O visual é minimalista e objetivo: muito espaço em branco, uma cor de destaque (lilás) e nenhum enfeite que não ajude a contar a história. Os dashboards são o elemento mais colorido da página.

**Paleta (proposta, a conferir com os códigos exatos do site atual)**

| Papel | Cor | Hex | Uso |
| --- | --- | --- | --- |
| Fundo | Branco | `#FFFFFF` | Fundo principal |
| Fundo alternado | Lilás muito claro | `#F6F3FE` | Separar seções sem usar linhas |
| Destaque | Lilás | `#8B6FE8` | Botões, links, detalhes pequenos |
| Destaque suave | Lilás claro | `#D9CFFA` | Bordas, fundo de tags |
| Texto | Preto | `#0E0E12` | Títulos e textos |
| Texto secundário | Cinza | `#5B5B66` | Legendas e apoio |

**Tipografia:** uma família sem serifa moderna para tudo (sugestão: Inter ou Geist). Títulos grandes e com peso médio, corpo em 17–18 px, sem caixa alta nos títulos.

**Princípios**

- Uma ideia por tela: seções com bastante respiro entre elas.
- Movimento só de apoio: surgir suave ao rolar, nada que pisque ou gire.
- Cantos levemente arredondados e sombras quase invisíveis nos cards.
- Fotos e capas reais, sem ilustrações genéricas de "IA" ou gráficos decorativos.

**Referências**

| Referência | O que aproveitar | O que evitar |
| --- | --- | --- |
| [Site atual](https://www.diogosilvaportfolio.com/) | Paleta branco/lilás/preto, conteúdo dos cases, canais de contato | Cara de currículo, barras de porcentagem, excesso de caixa alta |
| [Dribbble – AI-powered Customer Growth Platform](https://dribbble.com/shots/27810945-AI-powered-Customer-Growth-Platform) | Estilo de navegação, transições e motion e animações |  |
| [Dribbble – Spark AI Agency](https://dribbble.com/shots/25963956-Spark-AI-Agency) | Disposição dos elementos, menu de navegação, sobreposição de cores |  |

Não consegui abrir os dois links do Dribbble. Ao começar no Claude Code, salve um screenshot de cada um na pasta `referencias/` do projeto, para o Claude ver o design.

## Requisitos técnicos

O site é estático, feito em Astro + Tailwind, versionado no GitHub e publicado gratuitamente na Vercel ou na Netlify, com o domínio diogosilvaportfolio.com.

- **Embeds do Power BI:** iframe responsivo na proporção 16:9, carregado só quando o visitante chega nele (lazy loading). Antes de carregar, aparece a imagem de capa com um botão "Abrir dashboard interativo".
- **Celular:** embeds do Power BI são difíceis de usar em telas pequenas. No celular, mostrar a capa e um link para abrir o painel em tela cheia.
- **Desempenho:** a home deve carregar rápido mesmo com 6 dashboards; nenhum iframe carrega na abertura da página.
- **Responsivo:** pensado primeiro para o celular, testado em 375 px, 768 px e 1440 px.
- **SEO e compartilhamento:** título e descrição por página, imagem de prévia para LinkedIn e WhatsApp, sitemap.
- **Acessibilidade:** contraste suficiente do lilás sobre o branco, textos alternativos nas imagens, navegação por teclado.
- **Contato:** links diretos para WhatsApp (`wa.me`), e-mail (`mailto:`) e LinkedIn. Sem formulário na primeira versão.
- **Métricas:** um contador de visitas simples e gratuito (ex.: Vercel Analytics) para saber quais cases são mais vistos.
- **Idioma:** português. Inglês fica para uma versão futura.

## Fora do escopo e critérios de sucesso

A primeira versão é pequena de propósito: a home, as páginas de case e o contato. O resto entra depois que o site estiver no ar.

**Fora do escopo da v1**

- Formulário de contato e agendamento integrado
- Modo escuro

**Pronto quando**

- [ ] A home conta a história completa em menos de 2 minutos de rolagem
- [ ] Pelo menos 1 dashboard está com o embed funcionando, e os outros mostram "Em breve"
- [ ] Adicionar um novo dashboard leva menos de 10 minutos (só criar o arquivo do case)
- [ ] O site funciona bem no celular e no computador
- [ ] O domínio aponta para o novo site, e a versão do Wix está salva no GitHub com a tag `v1-wix`
