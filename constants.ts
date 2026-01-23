
import { Recipe, Difficulty, DietType, Article } from './types';

export const WP_CONFIG = {
  baseUrl: 'https://seu-site-wordpress.com/wp-json/wp/v2',
  useExternalAPI: false,
};

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Smoothie Bowl de Frutas Vermelhas e Chia Antiox Premium',
    description: 'Um guia gastronômico completo para um café da manhã funcional, rico em antocianinas e focado na regeneração celular. Esta receita foi desenvolvida para otimizar o metabolismo basal logo nas primeiras horas do dia, utilizando ingredientes com baixo índice glicêmico para evitar picos de insulina e garantir energia prolongada.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    diet: DietType.VEGAN,
    category: 'Receitas',
    subcategory: 'Café da Manhã Funcional',
    ingredients: [
      '200g de mix de frutas vermelhas (mirtilos, framboesas e morangos)',
      '1 banana nanica congelada para textura cremosa (prebiótico natural)',
      '1 colher de sopa de sementes de chia hidratadas em 30ml de água',
      '100ml de leite de coco artesanal ou amêndoas sem açúcar',
      '1 pitada de canela do ceilão (termogênico natural)',
      'Topping: Granola artesanal de baixo carboidrato e sementes de abóbora'
    ],
    instructions: [
      'Higienização Crítica: Lave as frutas vermelhas em solução clorada por 15 minutos se forem frescas para garantir a segurança alimentar absoluta.',
      'Processamento Bioativo: No liquidificador de alta potência, combine as frutas, a banana e o leite vegetal. Bata em velocidade média para preservar as fibras e atingir a consistência de sorbet.',
      'Hidratação da Chia: A chia deve ser previamente hidratada para formar o gel mucilaginoso que auxilia na saciedade e no controle glicêmico. Incorpore-a delicadamente após o batimento.',
      'Montagem e Estética: Transfira para um bowl de cerâmica fria. A temperatura baixa ajuda a manter os polifenóis estáveis por mais tempo.',
      'Finalização Nutricional: Adicione a granola e as sementes. Consuma em até 20 minutos após o preparo para evitar a oxidação das vitaminas termolábeis.'
    ],
    nutrition: { calories: 285, protein: 6, carbs: 44, fat: 8, fiber: 14 },
    rating: 4.9,
    reviews: [],
    author: 'Dra. Aline Mendes - Nutricionista Clínica (CRN-3 45678)'
  },
  {
    id: '2',
    title: 'Salmão Selvagem em Crosta de Amêndoas e Ervas Finas',
    description: 'Uma abordagem sofisticada para a ingestão de proteínas de alto valor biológico e ácidos graxos essenciais. Este prato é um pilar da dieta anti-inflamatória mediterrânea, focado na saúde cardiovascular e na redução do estresse oxidativo sistêmico.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.MEDIUM,
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    diet: DietType.LOW_CARB,
    category: 'Receitas',
    subcategory: 'Almoço Gourmet',
    ingredients: [
      '2 filés de salmão (aprox. 180g cada, preferencialmente selvagem)',
      '60g de farinha de amêndoas grossa ou amêndoas laminadas',
      'Ramos frescos de alecrim, tomilho e salsa picada',
      'Azeite de oliva extra virgem com acidez < 0.2%',
      'Flor de sal e pimenta-do-reino preta moída na hora',
      'Zestes de limão siciliano para frescor aromático'
    ],
    instructions: [
      'Preparação Térmica: Retire o peixe da geladeira 20 minutos antes para que as fibras relaxem e a cocção seja perfeitamente uniforme.',
      'Crosta Crocante: Misture as amêndoas com as ervas picadas e as raspas de limão em um bowl pequeno, adicionando um fio de azeite para dar liga.',
      'Selagem Inicial: Tempere o salmão com sal e pimenta. Em uma frigideira antiaderente quente, sele apenas o lado da pele por 3 minutos até ficar crocante.',
      'Forneamento Técnico: Coloque a crosta sobre o lado superior do peixe e leve ao forno pré-aquecido a 180°C por 8 a 10 minutos.',
      'Descanso Molecular: Deixe o peixe descansar por 2 minutos fora do forno antes de servir para que os sucos internos se redistribuam.'
    ],
    nutrition: { calories: 410, protein: 34, carbs: 6, fat: 28, fiber: 4 },
    rating: 5.0,
    reviews: [],
    author: 'Chef Gabriel Arcanjo - Especialista em Gastronomia Funcional'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'O Impacto do Ciclo Circadiano na Nutrição e Longevidade',
    excerpt: 'Entenda como o horário das suas refeições influencia a expressão gênica e a regulação hormonal do emagrecimento.',
    content: 'A ciência da Crononutrição revela que não é apenas o que comemos, mas QUANDO comemos que determina nossa saúde metabólica. ## A Regulação Hormonal. Durante o dia, nosso corpo está otimizado para a digestão e absorção de nutrientes. À medida que a noite se aproxima, a produção de melatonina inibe a secreção de insulina. ## O Perigo das Refeições Tardias. Jantar muito próximo ao horário de dormir causa uma disrupção metabólica, aumentando o estoque de gordura visceral. ## Dicas Práticas. Tente realizar sua última refeição pelo menos 3 horas antes de deitar e priorize proteínas leves no jantar.',
    image: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=800',
    category: 'Saúde',
    date: '15 Jan, 2025',
    readTime: '12 min',
    author: 'Dr. Roberto Silva - Endocrinologista'
  },
  {
    id: 'a2',
    title: 'Microbiota Intestinal: O Segundo Cérebro da sua Saúde',
    excerpt: 'Como as bactérias que habitam seu trato digestivo controlam desde seu humor até sua imunidade e resistência a doenças.',
    content: 'O intestino abriga trilhões de microrganismos que compõem a microbiota. ## Eixo Intestino-Cérebro. Cerca de 90% da serotonina corporal é produzida no trato gastrointestinal, influenciando diretamente o bem-estar mental. ## Alimentos Probióticos e Prebióticos. Para uma flora saudável, consuma fibras fermentáveis (cebola, alho, banana verde) e alimentos fermentados (kombucha, kefir, chucrute). ## Disbiose e Inflamação. Um desequilíbrio intestinal pode levar à permeabilidade aumentada, permitindo que toxinas entrem na corrente sanguínea.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200',
    category: 'Saúde',
    date: '10 Jan, 2025',
    readTime: '15 min',
    author: 'Dra. Beatriz Santos - Gastroenterologista'
  }
];
