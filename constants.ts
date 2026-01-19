
import { Recipe, Difficulty, DietType, Article } from './types';

export const WP_CONFIG = {
  baseUrl: 'https://seu-site-wordpress.com/wp-json/wp/v2',
  useExternalAPI: false,
};

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Smoothie Bowl de Frutas Vermelhas e Chia Antiox',
    description: 'Smoothie rico em antioxidantes e fibras para começar o dia.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    diet: DietType.VEGAN,
    category: 'Receitas',
    subcategory: 'Receitas Fitness',
    ingredients: ['200g de morangos', '1 banana', '1 colher de chia'],
    instructions: ['Bata tudo no liquidificador até ficar cremoso.'],
    nutrition: { calories: 280, protein: 5, carbs: 42, fat: 7, fiber: 12 },
    rating: 4.9,
    reviews: [],
    author: 'Nutri Chef'
  },
  {
    id: '2',
    title: 'Salmão Grelhado com Amêndoas',
    description: 'Refeição proteica com gorduras boas e crocância.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.MEDIUM,
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    diet: DietType.LOW_CARB,
    category: 'Receitas',
    subcategory: 'Carnes e Peixes',
    ingredients: ['2 filés de salmão', 'Amêndoas laminadas', 'Limão siciliano'],
    instructions: ['Tempere o salmão com sal e limão.', 'Grelhe por 5 minutos de cada lado.', 'Finalize com as amêndoas tostadas.'],
    nutrition: { calories: 350, protein: 34, carbs: 4, fat: 22, fiber: 3 },
    rating: 5.0,
    reviews: [],
    author: 'Chef Saudável'
  },
  {
    id: '3',
    title: 'Suco Verde Energizante Detox',
    description: 'O clássico detox para o dia a dia, rico em clorofila.',
    image: 'https://images.unsplash.com/photo-1610970882799-64a3e1d20928?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    diet: DietType.VEGAN,
    category: 'Receitas',
    subcategory: 'Bebidas e Sucos',
    ingredients: ['2 folhas de couve', '1 maçã verde', 'Gengibre a gosto', 'Suco de 1 limão'],
    instructions: ['Bata todos os ingredientes com 200ml de água.', 'Beba sem coar para aproveitar as fibras.'],
    nutrition: { calories: 80, protein: 2, carbs: 18, fat: 0, fiber: 4 },
    rating: 4.8,
    reviews: [],
    author: 'Nutri Chef'
  },
  {
    id: '4',
    title: 'Quinoa Real com Legumes Assados',
    description: 'Um prato completo, equilibrado e cheio de texturas.',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    diet: DietType.VEGETARIAN,
    category: 'Receitas',
    subcategory: 'Pratos Principais',
    ingredients: ['1 xícara de quinoa', 'Abóbora cabotiá', 'Abobrinha', 'Azeite de oliva'],
    instructions: ['Cozinhe a quinoa em água fervente por 15 minutos.', 'Asse os legumes com azeite e ervas.', 'Misture tudo e sirva quente.'],
    nutrition: { calories: 310, protein: 12, carbs: 45, fat: 9, fiber: 8 },
    rating: 4.7,
    reviews: [],
    author: 'Chef Vegetariano'
  },
  {
    id: '5',
    title: 'Omelete de Claras com Espinafre',
    description: 'O café da manhã perfeito para quem busca hipertrofia.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    diet: DietType.LOW_CARB,
    category: 'Receitas',
    subcategory: 'Café da Manhã',
    ingredients: ['4 claras de ovo', '1 punhado de espinafre', 'Temperos naturais'],
    instructions: ['Refogue o espinafre levemente.', 'Adicione as claras batidas e cozinhe em fogo baixo.'],
    nutrition: { calories: 150, protein: 22, carbs: 2, fat: 4, fiber: 2 },
    rating: 4.9,
    reviews: [],
    author: 'Nutri Esportiva'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Higiene do Sono: Como Dormir Melhor',
    excerpt: 'Dormir bem é o segredo para a longevidade e recuperação muscular.',
    content: 'O sono reparador é fundamental para o equilíbrio hormonal...',
    image: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=800',
    category: 'Saúde',
    date: '10 Jun, 2024',
    readTime: '8 min',
    author: 'Dra. Maria Sono'
  },
  {
    id: 'a2',
    title: 'Benefícios da Caminhada Diária',
    excerpt: 'Um guia sobre como 30 minutos por dia podem mudar sua vida.',
    content: 'A caminhada é o exercício mais natural e acessível...',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800',
    category: 'Saúde',
    date: '15 Jul, 2024',
    readTime: '5 min',
    author: 'Lucas Ferreira'
  },
  {
    id: 'a3',
    title: 'Alimentação Anti-inflamatória',
    excerpt: 'Descubra quais alimentos combatem a inflamação crônica no corpo.',
    content: 'A inflamação silenciosa é a base de muitas doenças modernas...',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    category: 'Saúde',
    date: '20 Ago, 2024',
    readTime: '10 min',
    author: 'Dr. Roberto Nutri'
  },
  {
    id: 'a4',
    title: 'Meditação para Iniciantes',
    excerpt: 'Como acalmar a mente em um mundo hiperconectado.',
    content: 'Mindfulness não é sobre esvaziar a mente, mas sim sobre observar...',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    category: 'Bem-Estar',
    date: '05 Set, 2024',
    readTime: '6 min',
    author: 'Ana Zen'
  }
];
