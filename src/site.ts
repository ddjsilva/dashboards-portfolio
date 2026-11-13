// Dados de contato e navegação usados no menu, na seção de contato e no rodapé.
export const site = {
  name: 'Diogo Silva',
  role: 'Consultoria em Business Intelligence',
  title: 'Diogo Silva | Dashboards em Power BI para decisões melhores',
  description:
    'Transformo dados espalhados em painéis claros para decisões melhores. Consultoria em Power BI para pequenas e médias empresas.',
};

// Canais públicos. O WhatsApp foi retirado de propósito (Diogo não quer o número exposto);
// o LinkedIn é o contato principal.
export const contact = {
  linkedin: {
    label: 'LinkedIn',
    display: 'in/silvadiogo',
    href: 'https://www.linkedin.com/in/silvadiogo/',
  },
  email: {
    label: 'E-mail',
    display: 'contato@diogosilvaportfolio.com',
    href: 'mailto:contato@diogosilvaportfolio.com',
  },
};

export const nav = [
  { label: 'Projetos', href: '/#projetos' },
  { label: 'Sobre mim', href: '/#sobre' },
  { label: 'Contato', href: '/#contato' },
];
