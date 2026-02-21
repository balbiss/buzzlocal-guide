export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  city: string;
  location: string;
  category: string;
  image: string;
  isFree: boolean;
  isHot?: boolean;
  description: string;
  organizerUrl: string;
  organizerName: string;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Festival de Música Eletrônica 2026",
    date: "15 Mar 2026",
    time: "22:00",
    city: "São Paulo",
    location: "Parque Ibirapuera",
    category: "Shows e Festas",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop",
    isFree: false,
    isHot: true,
    description: "O maior festival de música eletrônica do Brasil está de volta! Com mais de 50 artistas nacionais e internacionais, 3 palcos simultâneos e uma experiência imersiva que vai te transportar para outro universo. Prepare-se para uma noite inesquecível com os melhores DJs do cenário mundial.",
    organizerUrl: "https://example.com",
    organizerName: "Produtora XYZ",
  },
  {
    id: "2",
    title: "Workshop de Marketing Digital",
    date: "20 Mar 2026",
    time: "09:00",
    city: "Rio de Janeiro",
    location: "Centro de Convenções RJ",
    category: "Cursos e Workshops",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    isFree: false,
    description: "Aprenda as estratégias mais avançadas de marketing digital com especialistas do mercado. Workshop intensivo com certificado, material exclusivo e networking com profissionais da área.",
    organizerUrl: "https://example.com",
    organizerName: "Digital Academy",
  },
  {
    id: "3",
    title: "Feira de Tecnologia e Inovação",
    date: "25 Mar 2026",
    time: "10:00",
    city: "Curitiba",
    location: "Expo Center Norte",
    category: "Tecnologia",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    isFree: true,
    isHot: true,
    description: "A maior feira de tecnologia do sul do Brasil reúne startups, empresas de tecnologia e entusiastas para apresentar as últimas inovações em IA, IoT, blockchain e muito mais.",
    organizerUrl: "https://example.com",
    organizerName: "TechSul Events",
  },
  {
    id: "4",
    title: "Corrida Noturna 10K",
    date: "28 Mar 2026",
    time: "20:00",
    city: "Belo Horizonte",
    location: "Praça da Liberdade",
    category: "Esportes",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
    isFree: false,
    description: "Corra sob as estrelas! A Corrida Noturna 10K é o evento esportivo mais emocionante de BH. Percurso iluminado, música ao vivo e premiação para os melhores colocados.",
    organizerUrl: "https://example.com",
    organizerName: "BH Running",
  },
  {
    id: "5",
    title: "Feira Imobiliária 2026",
    date: "01 Abr 2026",
    time: "09:00",
    city: "São Paulo",
    location: "WTC Events Center",
    category: "Imobiliários",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    isFree: true,
    description: "A principal feira do mercado imobiliário brasileiro. Encontre as melhores oportunidades de investimento, conheça novos empreendimentos e participe de palestras com os maiores nomes do setor.",
    organizerUrl: "https://example.com",
    organizerName: "Imob Eventos",
  },
  {
    id: "6",
    title: "Festival Infantil de Verão",
    date: "05 Abr 2026",
    time: "14:00",
    city: "Florianópolis",
    location: "Parque da Cidade",
    category: "Infantil",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=600&h=400&fit=crop",
    isFree: true,
    description: "Um dia inteiro de diversão para a criançada! Brincadeiras, teatro, música, oficinas criativas e muita alegria. Traga toda a família para esse evento especial.",
    organizerUrl: "https://example.com",
    organizerName: "Kids Fun",
  },
  {
    id: "7",
    title: "Congresso de Negócios e Empreendedorismo",
    date: "10 Abr 2026",
    time: "08:00",
    city: "Porto Alegre",
    location: "Centro de Eventos FIERGS",
    category: "Negócios",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop",
    isFree: false,
    isHot: true,
    description: "O maior congresso de negócios do RS reúne empreendedores, investidores e líderes de mercado para debater tendências, compartilhar cases de sucesso e criar oportunidades de networking.",
    organizerUrl: "https://example.com",
    organizerName: "Business Hub",
  },
  {
    id: "8",
    title: "Encontro de Fé e Louvor",
    date: "12 Abr 2026",
    time: "19:00",
    city: "Goiânia",
    location: "Arena Goiânia",
    category: "Religiosos",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&h=400&fit=crop",
    isFree: true,
    description: "Uma noite especial de adoração e comunhão com cantores e pastores renomados. Venha viver uma experiência de fé transformadora junto com milhares de fiéis.",
    organizerUrl: "https://example.com",
    organizerName: "Ministério Louvor Vivo",
  },
];

export const categories = [
  { name: "Shows e Festas", icon: "🎵", count: 245 },
  { name: "Negócios", icon: "💼", count: 128 },
  { name: "Cursos e Workshops", icon: "📚", count: 312 },
  { name: "Esportes", icon: "⚽", count: 89 },
  { name: "Tecnologia", icon: "💻", count: 167 },
  { name: "Infantil", icon: "🎈", count: 54 },
  { name: "Religiosos", icon: "🙏", count: 76 },
  { name: "Imobiliários", icon: "🏠", count: 43 },
];

export const blogPosts = [
  {
    id: "1",
    title: "O que fazer em São Paulo neste fim de semana",
    excerpt: "Confira os melhores eventos, shows e atividades para curtir o final de semana na capital paulista.",
    image: "https://images.unsplash.com/photo-1543059080-f9b1272213d5?w=400&h=250&fit=crop",
    date: "18 Fev 2026",
    category: "Agenda",
  },
  {
    id: "2",
    title: "Guia completo de feiras e exposições 2026",
    excerpt: "Descubra as principais feiras e exposições que acontecem em todo o Brasil durante este ano.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop",
    date: "15 Fev 2026",
    category: "Guias",
  },
  {
    id: "3",
    title: "5 dicas para organizar um evento de sucesso",
    excerpt: "Aprenda com especialistas como planejar e executar eventos que realmente fazem a diferença.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=250&fit=crop",
    date: "10 Fev 2026",
    category: "Dicas",
  },
];
