
import { Recipe, Difficulty, DietType, Article } from './types';

export const WP_CONFIG = {
  baseUrl: 'https://seu-site-wordpress.com/wp-json/wp/v2',
  useExternalAPI: false,
};

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Smoothie Bowl de Frutas Vermelhas e Chia Antiox',
    description: 'Um guia completo para um café da manhã rico em antocianinas, focado na regeneração celular e no controle do índice glicêmico matinal.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    diet: DietType.VEGAN,
    category: 'Receitas',
    subcategory: 'Receitas Fitness',
    ingredients: ['200g de mix de frutas vermelhas', '1 banana congelada', '1 colher de chia', '100ml de leite vegetal'],
    instructions: [
      'Bata as frutas congeladas com o leite vegetal até obter uma textura de sorvete.',
      'A chia deve ser adicionada ao final para preservar as fibras e ômega-3.',
      'Consuma imediatamente para evitar a oxidação das vitaminas C e E presentes nas frutas.'
    ],
    nutrition: { calories: 280, protein: 5, carbs: 42, fat: 7, fiber: 12 },
    rating: 4.9,
    reviews: [],
    author: 'Dra. Aline Nutri'
  },
  {
    id: '2',
    title: 'Salmão Grelhado com Amêndoas e Ervas Finas',
    description: 'Proteína de alto valor biológico com ácidos graxos essenciais. Este prato é um pilar da dieta mediterrânea para saúde cardiovascular.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.MEDIUM,
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    diet: DietType.LOW_CARB,
    category: 'Receitas',
    subcategory: 'Carnes e Peixes',
    ingredients: ['2 filés de salmão', '50g de amêndoas fatiadas', 'Alecrim fresco', 'Azeite extra virgem'],
    instructions: [
      'Tempere o salmão apenas com ervas e pouco sal para manter a pureza do sabor.',
      'Grelhe em fogo médio para não degradar as gorduras boas do peixe.',
      'Adicione as amêndoas ao final para garantir a textura crocante e aporte extra de magnésio.'
    ],
    nutrition: { calories: 350, protein: 34, carbs: 4, fat: 22, fiber: 3 },
    rating: 5.0,
    reviews: [],
    author: 'Chef Gabriel Arcanjo'
  },
  {
    id: '3',
    title: 'Quinoa Real com Vegetais Mediterrâneos',
    description: 'Um prato completo que oferece todos os aminoácidos essenciais, ideal para recuperação muscular e saciedade prolongada.',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    diet: DietType.VEGETARIAN,
    category: 'Receitas',
    subcategory: 'Pratos Principais',
    ingredients: ['1 xícara de quinoa', 'Abobrinha italiana', 'Pimentões coloridos', 'Cebola roxa'],
    instructions: [
      'Lave a quinoa para remover a saponina antes do cozimento.',
      'Asse os vegetais com azeite e orégano para realçar o sabor natural sem excesso de sódio.',
      'Misture os ingredientes gentilmente para manter a integridade dos grãos.'
    ],
    nutrition: { calories: 310, protein: 12, carbs: 45, fat: 9, fiber: 8 },
    rating: 4.7,
    reviews: [],
    author: 'Chef Ricardo Fontes'
  },
  {
    id: '4',
    title: 'Omelete de Claras com Espinafre e Ricota',
    description: 'Focado em densidade proteica e baixo valor calórico, este prato é perfeito para quem busca controle de peso com nutrição.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    diet: DietType.LOW_CARB,
    category: 'Receitas',
    subcategory: 'Café da Manhã',
    ingredients: ['4 claras', '1 punhado de espinafre', '30g de ricota fresca'],
    instructions: [
      'Refogue o espinafre levemente para reduzir o volume e ativar os fitonutrientes.',
      'Bata as claras até espumar para garantir uma textura aerada e leve.',
      'Cozinhe em fogo baixo para evitar a formação de compostos indesejados pela queima.'
    ],
    nutrition: { calories: 180, protein: 24, carbs: 3, fat: 7, fiber: 2 },
    rating: 4.9,
    reviews: [],
    author: 'Dra. Fernanda Esporte'
  },
  {
    id: '5',
    title: 'Suco Verde Detox Energizante',
    description: 'Uma bebida funcional rica em clorofila e magnésio, auxiliando nos processos naturais de desintoxicação do fígado.',
    image: 'https://images.unsplash.com/photo-1610970882799-64a3e1d20928?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    diet: DietType.VEGAN,
    category: 'Receitas',
    subcategory: 'Bebidas e Sucos',
    ingredients: ['2 folhas de couve', '1 maçã verde', 'Gengibre fresco', 'Limão'],
    instructions: [
      'Bata todos os ingredientes com água gelada para manter o frescor dos nutrientes.',
      'Dica: Não coe o suco para garantir o aporte de fibras essenciais para o intestino.',
      'O gengibre atua como termogênico natural, acelerando o metabolismo de repouso.'
    ],
    nutrition: { calories: 95, protein: 3, carbs: 22, fat: 0, fiber: 5 },
    rating: 4.8,
    reviews: [],
    author: 'Nutri Luiza Costa'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Higiene do Sono: O Guia Definitivo para Performance',
    excerpt: 'Descubra como o ciclo circadiano e a regulação da melatonina impactam diretamente no seu metabolismo e saúde mental.',
    content: 'O sono reparador é a base da pirâmide da saúde. ## Importância Metabólica. Durante o sono, o corpo regula hormônios como a grelina e a leptina, que controlam a fome. ## Dicas Práticas. Evite luz azul 2 horas antes de deitar e mantenha a temperatura do quarto amena para facilitar a entrada no sono profundo.',
    image: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=800',
    category: 'Saúde',
    date: '10 Jun, 2024',
    readTime: '8 min',
    author: 'Dr. Marcos Oliveira'
  },
  {
    id: 'a2',
    title: 'Caminhada: O Exercício Perfeito para Longevidade',
    excerpt: 'Por que 30 minutos de caminhada diária são mais eficazes que treinos intensos esporádicos para a saúde do coração.',
    content: 'A consistência é a chave. ## Benefícios Cardiovasculares. A caminhada reduz a pressão arterial sistólica e melhora a circulação periférica. ## Saúde Mental. O exercício de baixo impacto libera endorfinas de forma sustentada, combatendo o cortisol elevado.',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800',
    category: 'Saúde',
    date: '15 Jul, 2024',
    readTime: '5 min',
    author: 'Prof. Lucas Mendes'
  },
  {
    id: 'a3',
    title: 'Alimentação Anti-inflamatória e Doenças Crônicas',
    excerpt: 'Como a escolha de alimentos ricos em polifenóis pode silenciar genes inflamatórios no seu organismo.',
    content: 'A inflamação silenciosa é a causa base de muitas patologias modernas. ## O Papel dos Alimentos. Cúrcuma, azeite e peixes de águas frias são poderosos aliados. ## O Que Evitar. Açúcares refinados e óleos vegetais processados devem ser eliminados da dieta diária.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    category: 'Saúde',
    date: '20 Ago, 2024',
    readTime: '10 min',
    author: 'Dra. Beatriz Nutro'
  },
  {
    id: 'a4',
    title: 'Neuroplasticidade e Meditação: Mudando o Cérebro',
    excerpt: 'A ciência por trás do mindfulness e como 8 semanas de prática podem aumentar a massa cinzenta no hipocampo.',
    content: 'A meditação não é apenas relaxamento, é treinamento cerebral. ## Foco e Atenção. A prática regular fortalece o córtex pré-frontal. ## Resiliência. Aprenda a observar seus pensamentos sem julgamento para reduzir a reatividade ao estresse.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    category: 'Bem-Estar',
    date: '05 Set, 2024',
    readTime: '6 min',
    author: 'Psic. Ana Clara Silveira'
  }
];
