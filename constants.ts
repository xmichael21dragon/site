
import { Recipe, Difficulty, DietType, Article } from './types';

export const WP_CONFIG = {
  baseUrl: 'https://seu-site-wordpress.com/wp-json/wp/v2',
  useExternalAPI: false,
};

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Smoothie Bowl de Frutas Vermelhas e Chia Antiox',
    description: 'Este smoothie bowl de frutas vermelhas é a escolha definitiva para quem busca um café da manhã rico em antioxidantes e fibras. Combinando morangos frescos, mirtilos e sementes de chia, esta receita não apenas acelera o metabolismo, mas também promove a saciedade por horas. É uma opção vegana e sem glúten, ideal para começar o dia com energia renovada e foco total. As frutas vermelhas são conhecidas por combater os radicais livres, enquanto a chia fornece ômega-3 essencial para a saúde cerebral e cardiovascular. Prepare em menos de 5 minutos e transforme sua rotina matinal.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    diet: DietType.VEGAN,
    category: 'Café da Manhã',
    ingredients: ['200g de morangos congelados', '100g de mirtilos', '1 unidade de banana madura', '1 colher de sementes de chia', '150ml de leite de amêndoas'],
    instructions: [
      'Coloque as frutas congeladas e a banana no liquidificador potente.',
      'Adicione o leite de amêndoas aos poucos para manter a consistência firme de sorbet.',
      'Bata até obter um creme homogêneo e sem pedaços.',
      'Transfira para um bowl e finalize salpicando as sementes de chia por cima.',
      'Dica: Adicione granola artesanal para garantir uma textura crocante e mais fibras.'
    ],
    nutrition: { calories: 280, protein: 5, carbs: 42, fat: 7, fiber: 12 },
    rating: 4.9,
    reviews: [],
    author: 'Nutri Chef'
  },
  {
    id: '2',
    title: 'Salmão Grelhado com Crosta de Amêndoas e Ervas Finas',
    description: 'O salmão grelhado é o padrão ouro da nutrição esportiva e do bem-estar. Nesta versão premium, utilizamos uma crosta crocante de amêndoas trituradas e ervas finas que elevam o sabor sem adicionar calorias vazias. Rico em ômega-3, este prato é fundamental para o controle de processos inflamatórios e melhora da saúde da pele. É uma refeição low carb perfeita para o jantar, garantindo uma digestão leve e um sono reparador. Acompanhado de aspargos ou legumes no vapor, este salmão se torna o protagonista de uma dieta equilibrada voltada para a longevidade.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.MEDIUM,
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    diet: DietType.LOW_CARB,
    category: 'Almoço',
    ingredients: ['2 unidades de filé de salmão', '50g de amêndoas laminadas', '1 colher de azeite de oliva', '1 colher de alecrim picado', '1 unidade de limão siciliano'],
    instructions: [
      'Tempere os filés de salmão com sal, pimenta e suco de meio limão.',
      'Triture levemente as amêndoas e misture com o alecrim.',
      'Pressione a mistura de amêndoas sobre o topo dos filés criando uma camada firme.',
      'Aqueça o azeite em uma frigideira antiaderente e sele o salmão primeiro com a crosta para baixo por 2 minutos.',
      'Vire com cuidado e finalize o cozimento por mais 6 a 8 minutos no fogo médio.',
      'Sirva com rodelas de limão siciliano para um toque cítrico refrescante.'
    ],
    nutrition: { calories: 350, protein: 34, carbs: 4, fat: 22, fiber: 3 },
    rating: 5.0,
    reviews: [],
    author: 'Chef Saudável'
  },
  {
    id: '3',
    title: 'Bowl de Quinoa Real com Legumes Assados e Tofu',
    description: 'A quinoa é considerada um superalimento por ser uma das poucas fontes vegetais de proteína completa. Este bowl mediterrâneo combina a textura leve da quinoa real com legumes assados lentamente no forno, potencializando seus açúcares naturais sem adição de óleos pesados. O tofu grelhado adiciona uma textura firme e um aporte extra de aminoácidos. É a refeição ideal para quem segue uma dieta vegana ou vegetariana e não abre mão de um prato colorido, nutritivo e visualmente incrível. Excelente para marmitas da semana (meal prep), mantendo o frescor e sabor por dias.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.MEDIUM,
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    diet: DietType.VEGAN,
    category: 'Almoço',
    ingredients: ['200g de quinoa em grãos', '1 unidade de abobrinha média', '1 unidade de pimentão vermelho', '200g de tofu firme em cubos', '2 colheres de azeite de oliva'],
    instructions: [
      'Cozinhe a quinoa em água fervente com sal por 15 minutos até ficar macia.',
      'Corte a abobrinha e o pimentão em cubos pequenos.',
      'Disponha os legumes em uma assadeira, regue com azeite e asse a 200°C por 20 minutos.',
      'Grelhe o tofu em uma frigideira até dourar todos os lados.',
      'Misture a quinoa cozida com os legumes assados e finalize com o tofu.',
      'Dica: Adicione um molho de tahine com limão para um sabor oriental irresistível.'
    ],
    nutrition: { calories: 310, protein: 15, carbs: 48, fat: 9, fiber: 8 },
    rating: 4.7,
    reviews: [],
    author: 'Nutri Chef'
  },
  {
    id: '4',
    title: 'Panqueca de Aveia e Banana Fit (Sem Açúcar)',
    description: 'Deseja um doce sem culpa? Esta panqueca de aveia e banana é a solução perfeita para o seu lanche da tarde ou café da manhã pós-treino. Sem adição de açúcar refinado ou farinha de trigo, utilizamos apenas a doçura natural da fruta e a fibra solúvel da aveia para criar uma massa fofinha e nutritiva. A aveia auxilia no controle glicêmico, evitando picos de insulina, enquanto a banana fornece potássio para a recuperação muscular. É uma receita rápida, econômica e amada por crianças e adultos que buscam um estilo de vida mais fitness.',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee9a?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.EASY,
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    diet: DietType.VEGETARIAN,
    category: 'Lanche da Tarde',
    ingredients: ['2 unidades de banana madura', '2 unidades de ovo integral', '100g de farelo de aveia', '1 colher de canela em pó'],
    instructions: [
      'Amasse bem as bananas em um prato até formar um purê.',
      'Em um bowl, bata os ovos e misture com a banana amassada.',
      'Adicione o farelo de aveia e a canela, misturando até ficar homogêneo.',
      'Aqueça uma frigideira levemente untada com óleo de coco.',
      'Coloque pequenas porções da massa e cozinhe em fogo baixo até formar bolhas.',
      'Vire e doure do outro lado por mais 1 minuto.'
    ],
    nutrition: { calories: 220, protein: 9, carbs: 32, fat: 6, fiber: 6 },
    rating: 4.8,
    reviews: [],
    author: 'Chef Fit'
  },
  {
    id: '5',
    title: 'Poke Bowl de Atum Fresco com Arroz Negro',
    description: 'Inspirado na culinária havaiana, este Poke de Atum combina proteínas de alta qualidade com carboidratos de baixo índice glicêmico provenientes do arroz negro. O atum fresco é rico em selênio e proteínas, essencial para a manutenção da massa magra. A adição de abacate traz gorduras monoinsaturadas saudáveis que protegem o coração. Esta receita é uma explosão de texturas e sabores, perfeita para quem busca uma refeição leve, porém extremamente satisfatória no almoço ou jantar.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    difficulty: Difficulty.MEDIUM,
    prepTime: 25,
    cookTime: 40,
    servings: 2,
    diet: DietType.NONE,
    category: 'Jantar',
    ingredients: ['300g de atum fresco em cubos', '150g de arroz negro cozido', '1 unidade de abacate pequeno', '1 colher de gergelim preto', '50ml de molho shoyu light'],
    instructions: [
      'Cozinhe o arroz negro conforme as instruções da embalagem (geralmente 35-40 min).',
      'Marine o atum no shoyu com um pouco de gengibre ralado por 10 minutos.',
      'Corte o abacate em fatias finas ou cubos.',
      'Monte o bowl colocando o arroz na base, o atum marinado de um lado e o abacate de outro.',
      'Finalize com gergelim preto e cebolinha picada.',
      'Opcional: Adicione pepino fatiado (sunomono) para mais crocância.'
    ],
    nutrition: { calories: 420, protein: 30, carbs: 35, fat: 18, fiber: 10 },
    rating: 5.0,
    reviews: [],
    author: 'Chef Oriental Fit'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Higiene do Sono: Como Dormir Melhor e Transformar sua Saúde',
    excerpt: 'Dormir bem é o segredo para a longevidade. Aprenda as técnicas de higiene do sono para restaurar sua mente.',
    content: `Dormir não é apenas uma pausa na nossa rotina agitada, mas sim um processo biológico fundamental para a manutenção da vida e da saúde mental. A higiene do sono refere-se a uma série de práticas e hábitos que são necessários para ter uma qualidade de sono boa e alerta durante o dia. Neste guia completo, vamos explorar por que você deve priorizar o seu descanso e como fazer isso hoje mesmo.

    ## A Importância do Sono para o Corpo
    Quando dormimos, nosso corpo entra em um estado de reparação intensa. É durante o sono profundo que o sistema glinfático atua como uma "limpeza" no cérebro, removendo toxinas acumuladas durante o dia. Além disso, a consolidação da memória ocorre durante a fase REM, garantindo que o aprendizado seja fixado. A falta de sono crônica está ligada ao aumento do cortisol, estresse, ganho de peso e maior risco de doenças cardiovasculares.

    ## 7 Passos para uma Higiene do Sono Impecável
    1. **Consistência de Horário:** Tente ir para a cama e acordar no mesmo horário todos os dias, inclusive nos finais de semana. Isso regula o seu ritmo circadiano.
    2. **Ambiente Escuro e Fresco:** O seu quarto deve ser um santuário. Use cortinas blackout e mantenha a temperatura entre 18°C e 22°C.
    3. **Fuja da Luz Azul:** Televisores, smartphones e tablets emitem luz azul que bloqueia a produção de melatonina, o hormônio do sono. Desligue as telas pelo menos 1 hora antes de dormir.
    4. **Cuidado com a Cafeína:** Evite estimulantes após as 14h. A cafeína pode permanecer no sistema por até 8 horas, prejudicando a entrada no sono profundo.
    5. **Evite Refeições Pesadas:** O processo digestivo intenso à noite pode elevar a temperatura corporal e causar desconforto, fragmentando o sono.
    6. **Rotina de Relaxamento:** Leia um livro físico, tome um banho morno ou pratique meditação. Isso sinaliza ao cérebro que o dia acabou.
    7. **Luz Solar pela Manhã:** Ver a luz do sol logo ao acordar ajuda a "setar" o relógio biológico, facilitando o sono na noite seguinte.

    ## O Papel da Alimentação no Sono
    Alimentos ricos em triptofano, como banana, aveia e sementes de abóbora, são excelentes aliados. O triptofano é um precursor da serotonina, que por sua vez é convertida em melatonina. Um chá de camomila ou erva-cidreira também possui propriedades relaxantes suaves que auxiliam na indução do repouso.

    ### Conclusão
    Adotar uma rotina de higiene do sono não é um luxo, é uma necessidade. Comece escolhendo dois passos da nossa lista e aplique-os por 21 dias. Você notará uma melhora significativa no seu humor, produtividade e saúde geral. Lembre-se: um dia produtivo começa com uma noite de sono reparadora.`,
    image: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=800',
    category: 'Bem-estar',
    date: '10 Jun, 2024',
    readTime: '8 min',
    author: 'Dra. Maria Sono'
  },
  {
    id: 'a2',
    title: 'Dieta Anti-inflamatória: O Poder dos Alimentos Reais',
    excerpt: 'A inflamação crônica é a base de muitas doenças modernas. Descubra como combatê-la comendo melhor.',
    content: `A inflamação é um processo natural de defesa do corpo contra invasores e lesões. No entanto, o problema surge quando ela se torna crônica e silenciosa, alimentada por dietas ricas em ultraprocessados, estresse e sedentarismo. Uma dieta anti-inflamatória não é apenas para perder peso, é um estilo de vida focado na longevidade e na prevenção de doenças como artrite, diabetes tipo 2 e problemas cardíacos.

    ## O que é Inflamação Crônica?
    Diferente de uma inflamação aguda (como quando você corta o dedo), a crônica acontece a nível celular. Ela danifica tecidos saudáveis e altera o metabolismo. Estudos indicam que a má alimentação é um dos principais gatilhos para esse estado inflamatório constante.

    ## Os Superalimentos Anti-inflamatórios
    Existem ingredientes que agem como verdadeiros remédios no prato:
    - **Cúrcuma (Açafrão-da-terra):** Contém curcumina, um dos compostos anti-inflamatórios mais potentes da natureza. Sempre consuma com pimenta preta para aumentar a absorção.
    - **Ômega-3:** Encontrado em peixes gordos (salmão, sardinha), sementes de linhaça e chia. O ômega-3 é vital para a saúde das articulações e do cérebro.
    - **Frutas Vermelhas:** Mirtilos, morangos e framboesas são ricos em antocianinas, que combatem o estresse oxidativo.
    - **Vegetais Crucíferos:** Brócolis, couve-flor e couve contêm sulforafano, que auxilia na detoxificação celular.
    - **Azeite de Oliva Extra Virgem:** O oleocantal presente no azeite possui efeito similar ao ibuprofeno em reduzir dores inflamatórias.

    ## O que Evitar a Todo Custo
    Para desinflamar, você deve reduzir drasticamente:
    1. Açúcares refinados e xarope de milho.
    2. Óleos vegetais refinados (soja, milho, canola) ricos em ômega-6 pró-inflamatório.
    3. Gorduras trans presentes em biscoitos e margarinas.
    4. Carboidratos refinados (pão branco, massas comuns).
    5. Embutidos e carnes processadas.

    ## Planejando seu Prato Desinflamante
    Um prato ideal deve ser 50% composto por vegetais coloridos, 25% por proteínas magras (vegetais ou animais) e 25% por gorduras boas e carboidratos complexos (como batata doce ou arroz integral). Temperar com ervas frescas como alecrim e manjericão também potencializa o efeito protetor.

    ### Conclusão
    Sua saúde começa no intestino. Uma dieta rica em fibras e polifenóis nutre a microbiota saudável, que é a primeira linha de defesa contra a inflamação. Comece hoje mesmo a substituir o processado pelo descascado e sinta a diferença no seu nível de energia e disposição física.`,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    category: 'Nutrição',
    date: '12 Jun, 2024',
    readTime: '7 min',
    author: 'Dr. Lucas Nutri'
  },
  {
    id: 'a3',
    title: 'Mindful Eating: Comendo com Atenção Plena para Emagrecer',
    excerpt: 'Comer rápido e distraído é o vilão da sua dieta. Aprenda a técnica que muda sua relação com a comida.',
    content: `Vivemos na era do "multitasking", onde almoçamos respondendo e-mails ou assistindo vídeos curtos. Esse hábito está nos desconectando dos nossos sinais naturais de fome e saciedade. O Mindful Eating, ou comer com atenção plena, é uma prática derivada da meditação que foca em estar presente no momento da refeição, saboreando cada pedaço e ouvindo o corpo.

    ## Por que o Mindful Eating Funciona?
    O cérebro demora cerca de 20 minutos para receber o sinal de saciedade enviado pelo estômago. Quando comemos rápido demais, ignoramos esse sinal e acabamos consumindo mais calorias do que o necessário. Ao praticar a atenção plena, você reduz o ritmo, mastiga melhor e desfruta mais da experiência sensorial.

    ## Como Praticar no Dia a Dia
    1. **Ambiente Sem Telas:** Elimine celulares, TVs e computadores da mesa.
    2. **Observe a Comida:** Antes de dar a primeira garfada, olhe para as cores, sinta o aroma e aprecie o trabalho de quem preparou.
    3. **Mastigação Lenta:** Tente mastigar entre 20 a 30 vezes cada garfada. Isso facilita a digestão enzimática na boca.
    4. **Sinta as Texturas:** É crocante? Macio? Quente ou frio? Foque nas sensações físicas.
    5. **Descanse os Talheres:** Entre uma garfada e outra, coloque os talheres sobre a mesa. Isso força você a desacelerar.
    6. **Escala de Fome:** Antes de comer, pergunte-se: "Em uma escala de 0 a 10, quão faminto eu estou?". Pare de comer quando atingir o nível 7.

    ## Benefícios Além do Peso
    O Mindful Eating ajuda a combater o comer emocional. Ao estar presente, você consegue identificar se está comendo por fome física ou por ansiedade, tristeza ou tédio. Isso cria uma liberdade alimentar incrível, onde não existem "alimentos proibidos", mas sim escolhas conscientes.

    ### Conclusão
    Transformar sua relação com a comida leva tempo. Não tente ser perfeito em todas as refeições. Escolha uma refeição do dia para praticar o Mindful Eating e, gradualmente, essa atenção se tornará natural. Você descobrirá que comer menos pode ser muito mais satisfatório quando feito com intenção.`,
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
    category: 'Mental',
    date: '15 Jun, 2024',
    readTime: '6 min',
    author: 'Psic. Fernanda Paz'
  },
  {
    id: 'a4',
    title: 'Saúde Intestinal: O Seu Segundo Cérebro',
    excerpt: '70% do seu sistema imunológico está no intestino. Saiba como cuidar da sua microbiota hoje.',
    content: `Você já sentiu "borboletas no estômago" ou uma sensação de desconforto intestinal durante o estresse? Isso acontece porque o intestino possui o seu próprio sistema nervoso, o sistema nervoso entérico, com centenas de milhões de neurônios. Ele produz cerca de 90% da serotonina do corpo, o hormônio do bem-estar. Cuidar do intestino é, portanto, cuidar da sua felicidade.

    ## A Microbiota Intestinal
    Temos trilhões de bactérias vivendo em nosso trato digestivo. Elas auxiliam na digestão, produzem vitaminas e treinam o sistema imunológico. O desequilíbrio entre bactérias boas e ruins é chamado de **Disbiose**, e está associado a fadiga, neblina mental, alergias e até depressão.

    ## Alimentos para um Intestino Feliz
    Para nutrir as boas bactérias, você precisa de dois tipos de alimentos:
    - **Prebióticos:** São as fibras que servem de "alimento" para as bactérias. Estão presentes na cebola, alho, banana verde (biomassa), aveia e maçã.
    - **Probióticos:** São os microrganismos vivos que você ingere para colonizar o trato. Exemplos: Iogurte natural, kefir, kombucha, chucrute e kimchi.

    ## Hábitos que Destroem a Saúde Intestinal
    Infelizmente, a vida moderna é agressiva com nossa flora:
    1. Uso indiscriminado de antibióticos.
    2. Dieta pobre em fibras e rica em açúcar.
    3. Estresse crônico (eixo cérebro-intestino).
    4. Sono de má qualidade.
    5. Consumo excessivo de álcool e adoçantes artificiais.

    ## O Protocolo dos 3Rs
    Muitos nutricionistas recomendam:
    1. **Remover:** Alimentos irritantes e patógenos.
    2. **Repor:** Enzimas digestivas e ácido gástrico se necessário.
    3. **Reinocular:** Com probióticos de alta qualidade.

    ### Conclusão
    Se você quer ter clareza mental, pele limpa e imunidade de ferro, comece cuidando do seu intestino. Hidratação adequada e ingestão de fibras variadas são o primeiro passo. Ouça o que seu corpo diz após as refeições e ajuste sua dieta para promover a harmonia interna.`,
    image: 'https://images.unsplash.com/photo-1616671285410-99432f83134c?auto=format&fit=crop&q=80&w=800',
    category: 'Nutrição',
    date: '18 Jun, 2024',
    readTime: '9 min',
    author: 'Gastro Dr. Roberto'
  },
  {
    id: 'a5',
    title: 'Benefícios da Atividade Física para a Saúde Mental',
    excerpt: 'Mais que estética: o exercício é o antidepressivo natural mais potente que existe.',
    content: `Muitas pessoas iniciam exercícios focando apenas no espelho, mas o maior benefício acontece dentro da cabeça. A atividade física regular é comparável em eficácia a alguns medicamentos para depressão leve e moderada, com a vantagem de não ter efeitos colaterais negativos e oferecer inúmeros bônus para a saúde física.

    ## A Farmácia Interna do Cérebro
    Durante e após o exercício, o corpo libera um coquetel de neurotransmissores:
    - **Endorfinas:** Reduzem a percepção de dor e geram euforia.
    - **Dopamina:** Melhora o foco e a sensação de recompensa.
    - **Serotonina:** Regula o humor, o sono e o apetite.
    - **BDNF:** É uma proteína que atua como "fertilizante" para os neurônios, promovendo a neuroplasticidade.

    ## Redução de Ansiedade e Estresse
    O exercício funciona como uma forma de "meditação ativa". Ao focar no movimento do corpo e na respiração, você treina o cérebro para sair do ciclo de pensamentos ruminantes. Além disso, a atividade física queima o excesso de adrenalina acumulado durante picos de estresse, trazendo calma imediata.

    ## Quanto Exercício é Necessário?
    A boa notícia é que você não precisa ser um maratonista. A OMS recomenda 150 a 300 minutos de atividade moderada por semana. Isso pode ser dividido em 30 minutos de caminhada rápida, 5 dias por semana. O segredo é a **consistência**, não a intensidade extrema esporádica.

    ## Dicas para Começar e Manter
    1. **Encontre o Prazer:** Se você odeia musculação, tente dança, natação ou artes marciais.
    2. **Tenha um Parceiro:** Treinar com amigos aumenta o compromisso social.
    3. **Comece Devagar:** 10 minutos é melhor que zero. Aumente gradualmente.
    4. **Escute o Corpo:** Descanso também faz parte do treino.

    ### Conclusão
    O movimento é vida. Se o exercício fosse uma pílula, seria o medicamento mais prescrito do mundo. Não espere a motivação chegar; crie a disciplina de se mover e a motivação virá como consequência do bem-estar que você sentirá após cada sessão.`,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
    category: 'Mental',
    date: '20 Jun, 2024',
    readTime: '7 min',
    author: 'Prof. Ana Fit'
  },
  {
    id: 'a6',
    title: 'Vitamina D: O Hormônio do Sol e sua Imunidade',
    excerpt: 'A deficiência de Vitamina D é silenciosa e afeta milhões. Saiba como otimizar seus níveis.',
    content: `Apesar do nome, a Vitamina D funciona mais como um pré-hormônio do que como uma vitamina tradicional. Ela modula mais de 2.000 genes no corpo humano e receptores para ela são encontrados em quase todas as células. No entanto, vivemos em uma epidemia global de deficiência de Vitamina D devido ao nosso estilo de vida indoor.

    ## Funções Vitais da Vitamina D
    - **Saúde Óssea:** Fundamental para a absorção de cálcio e fósforo. Previne osteoporose e raquitismo.
    - **Imunidade:** Ativa os linfócitos T, as "tropas de choque" do sistema imune contra vírus e bactérias.
    - **Saúde Mental:** Baixos níveis estão correlacionados com depressão sazonal e transtorno bipolar.
    - **Proteção Cardiovascular:** Auxilia no controle da pressão arterial e reduz inflamação nas artérias.

    ## Como Obter Vitamina D de Forma Eficiente
    A fonte primária é a exposição solar. Os raios UVB interagem com o colesterol na pele para sintetizar a vitamina.
    1. **Tempo:** 15 a 20 minutos por dia são geralmente suficientes.
    2. **Horário:** O sol do meio-dia (quando sua sombra é menor que você) é o mais rico em raios UVB, mas deve ser feito com cautela e sem protetor solar nas áreas expostas por esse curto período.
    3. **Área Exposta:** Braços e pernas devem estar descobertos.

    ## Fontes Alimentares e Suplementação
    É muito difícil obter Vitamina D apenas pela comida. Ela está presente em peixes gordos, gema de ovo e cogumelos expostos ao sol, mas em quantidades pequenas. A suplementação orientada por exames de sangue é, muitas vezes, a única forma de atingir níveis ideais (geralmente acima de 30-40 ng/mL).

    ## O Papel do Magnésio e Vitamina K2
    A Vitamina D não trabalha sozinha. O magnésio é necessário para ativá-la, e a Vitamina K2 garante que o cálcio absorvido vá para os ossos e dentes, e não se acumule nas artérias (calcificação).

    ### Conclusão
    Não ignore seus níveis de Vitamina D. Um simples exame de sangue pode revelar se você está em risco. O sol é gratuito e essencial. Combine exposição solar consciente com uma dieta rica em minerais para garantir que seu "hormônio do sol" esteja sempre protegendo você.`,
    image: 'https://images.unsplash.com/photo-1502472545331-026815969e0b?auto=format&fit=crop&q=80&w=800',
    category: 'Nutrição',
    date: '22 Jun, 2024',
    readTime: '8 min',
    author: 'Dr. Sol Nascente'
  },
  {
    id: 'a7',
    title: 'Detox Digital: Recuperando sua Atenção e Saúde Mental',
    excerpt: 'O excesso de telas está mudando sua química cerebral. Aprenda a desconectar para reconectar.',
    content: `Você já sentiu que sua capacidade de concentração diminuiu? Ou que sente ansiedade ao ficar longe do celular? O "vício" em dopamina gerado pelas notificações e pelo scroll infinito das redes sociais está criando uma geração hiperestimulada e exausta. O detox digital é uma prática para resetar seus receptores de recompensa e recuperar a paz de espírito.

    ## O Impacto das Telas no Cérebro
    As redes sociais são desenhadas para serem viciantes. Cada curtida ou comentário libera uma pequena dose de dopamina, o neurotransmissor da busca por novidade. Com o tempo, o cérebro se torna insensível a prazeres simples, exigindo estímulos cada vez maiores. Isso gera irritabilidade, ansiedade e dificuldade em focar em tarefas longas (como ler um livro).

    ## Sinais que Você Precisa de um Detox
    - Checar o celular logo ao acordar e antes de dormir.
    - Sentir que o tempo "voa" enquanto você está no Instagram/TikTok.
    - Comparar constantemente sua vida com a vida perfeita dos outros.
    - Dificuldade em manter conversas face a face sem olhar para a tela.

    ## Como Fazer um Detox Digital Eficaz
    1. **Desative Notificações:** Deixe apenas o essencial (chamadas de familiares).
    2. **Quarto sem Telas:** Não leve o celular para a cama. Use um despertador físico.
    3. **Zonas Livres de Celular:** Refeições e momentos em família devem ser sagrados.
    4. **Apps de Controle:** Use ferramentas que limitam o tempo de uso diário.
    5. **Domingo Offline:** Tente passar um dia inteiro por semana longe do mundo digital.

    ## O Que Fazer com o Tempo Livre?
    Redescubra hobbies manuais: cozinhar, jardinagem, pintura ou apenas caminhar na natureza sem fones de ouvido. O silêncio e o tédio são fundamentais para a criatividade humana.

    ### Conclusão
    A tecnologia deve ser uma ferramenta, não o seu mestre. Ao reduzir o ruído digital, você abre espaço para pensamentos mais profundos, relacionamentos mais reais e um sono muito melhor. Desconecte-se hoje e sinta a vida acontecer fora da tela.`,
    image: 'https://images.unsplash.com/photo-1521931961826-fe48677230a5?auto=format&fit=crop&q=80&w=800',
    category: 'Mental',
    date: '25 Jun, 2024',
    readTime: '7 min',
    author: 'Psic. Carlos Mente'
  },
  {
    id: 'a8',
    title: 'Magnésio: O Mineral Maestro do Bem-estar',
    excerpt: 'Envolvido em mais de 300 reações, o magnésio é a chave para relaxar músculos e mente.',
    content: `Se existisse um mineral que pudesse ser chamado de "o grande relaxante", seria o magnésio. Ele é essencial para o funcionamento de todas as células e participa de centenas de processos enzimáticos. Infelizmente, devido ao empobrecimento do solo e ao processamento de alimentos, a maioria da população não atinge as doses recomendadas.

    ## O Que o Magnésio Faz por Você?
    - **Função Muscular:** Evita cãibras e tensões. É vital para o batimento rítmico do coração.
    - **Sistema Nervoso:** Atua como um antagonista dos receptores NMDA, ajudando a acalmar o cérebro e reduzir a ansiedade.
    - **Produção de Energia:** Essencial para a síntese de ATP (a moeda de energia das nossas células).
    - **Controle Glicêmico:** Ajuda na regulação da insulina e no metabolismo da glicose.

    ## Sintomas de Deficiência
    Muitas vezes ignorados, os sinais de baixo magnésio incluem:
    - Tremores nas pálpebras (mioquimia).
    - Insônia e dificuldade de relaxar.
    - Dores de cabeça tensionais e enxaquecas.
    - Fadiga crônica.
    - Constipação (o magnésio ajuda no movimento intestinal).

    ## Onde Encontrar Magnésio no Prato
    Alimentos ricos em clorofila são excelentes fontes:
    - **Espinafre e Couve:** O magnésio está no centro da molécula de clorofila.
    - **Amêndoas e Castanhas:** Excelentes lanches ricos em minerais.
    - **Sementes de Abóbora:** Uma das maiores concentrações por grama.
    - **Chocolate Amargo (70%+):** Um prazer saudável e rico em magnésio.
    - **Abacate:** Combina gorduras boas com minerais essenciais.

    ## Tipos de Suplementação
    Se você optar por suplementar, o tipo importa:
    - **Glicinato de Magnésio:** Altamente absorvível, ideal para sono e ansiedade.
    - **Malato de Magnésio:** Ótimo para energia e dores musculares (fibromialgia).
    - **Citrato de Magnésio:** Ajuda na constipação, mas pode ter efeito laxativo.

    ### Conclusão
    O magnésio é o maestro que rege a orquestra das suas funções biológicas. Garanta uma dieta variada em folhas verdes e sementes para manter seus níveis otimizados. Se você sofre de estresse constante ou pratica exercícios intensos, sua demanda por esse mineral é ainda maior.`,
    image: 'https://images.unsplash.com/photo-1523450031456-df4920409249?auto=format&fit=crop&q=80&w=800',
    category: 'Nutrição',
    date: '28 Jun, 2024',
    readTime: '8 min',
    author: 'Nutri Marina Minerais'
  },
  {
    id: 'a9',
    title: 'Estratégias para Lidar com o Estresse no Trabalho',
    excerpt: 'O burnout é real. Aprenda técnicas rápidas de gerenciamento de estresse para manter o foco.',
    content: `O estresse ocupacional tornou-se uma das maiores causas de afastamento médico no século XXI. A pressão por metas, a comunicação constante e a falta de limites entre vida pessoal e profissional podem levar ao esgotamento mental. Gerenciar o estresse não é sobre eliminar o trabalho, mas sobre mudar sua resposta fisiológica e mental a ele.

    ## A Resposta de Luta ou Fuga
    Quando percebemos uma ameaça (um e-mail urgente, uma crítica), nosso corpo libera adrenalina e cortisol. Se essa resposta é ativada 20 vezes ao dia sem um período de recuperação, o sistema entra em colapso. O segredo é ativar o sistema nervoso parassimpático, o responsável pelo "descanso e digestão".

    ## Técnicas Rápidas de Gerenciamento
    1. **Respiração Quadrada:** Inspire por 4 segundos, segure por 4, expire por 4 e fique vazio por 4. Repita 3 vezes. Isso "engana" o cérebro para relaxar.
    2. **Técnica 5-4-3-2-1:** Observe 5 coisas que vê, 4 que pode tocar, 3 que ouve, 2 que cheira e 1 que pode sentir o gosto. Isso traz você de volta ao presente (grounding).
    3. **Pausas de 90 Minutos:** Nosso cérebro trabalha em ciclos ultradianos. Após 90 minutos de foco intenso, levante-se por 5 minutos.
    4. **Single-tasking:** Pare de tentar fazer tudo ao mesmo tempo. O cérebro perde eficiência a cada troca de contexto.

    ## Criando Limites Saudáveis
    - **Horário de Corte:** Defina uma hora para parar de olhar mensagens de trabalho.
    - **Espaço Físico:** Se trabalha em casa, tente ter um local dedicado. Ao sair dele, o trabalho termina.
    - **Comunicação Assertiva:** Aprenda a dizer "não" ou "não agora" de forma profissional.

    ## A Importância do Lazer Ativo
    Lazer não é apenas ficar no sofá. Atividades que trazem o estado de "fluxo" (flow), como tocar um instrumento, praticar um esporte ou artesanato, são as mais restauradoras para o cérebro estressado.

    ### Conclusão
    Seu trabalho é uma parte de quem você é, não a totalidade. Cultivar momentos de pausa e técnicas de respiração pode aumentar sua produtividade e, mais importante, preservar sua saúde mental. O sucesso profissional não vale o preço da sua paz de espírito.`,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    category: 'Mental',
    date: '30 Jun, 2024',
    readTime: '9 min',
    author: 'Coach Paulo Foco'
  },
  {
    id: 'a10',
    title: 'Hidratação Inteligente: Além dos 2 Litros de Água',
    excerpt: 'Água é vida, mas minerais são a chave. Entenda a hidratação celular e sinta a diferença.',
    content: `Beber 2 litros de água por dia é um conselho onipresente, mas a hidratação de verdade é mais complexa do que apenas volume de líquido. Hidratação celular significa levar a água para dentro das células, e para isso você precisa de eletrólitos (sais minerais). Beber água purificada demais pode, paradoxalmente, diluir seus eletrólitos e deixar você desidratado.

    ## O Papel dos Eletrólitos
    Os principais jogadores são o sódio, potássio, magnésio e cálcio. Eles atuam como "bombas" que empurram a água através das membranas celulares.
    - **Sódio:** Retém a água no espaço extracelular.
    - **Potássio:** Mantém a água dentro das células.
    - **Magnésio:** Regula a entrada e saída desses íons.

    ## Sinais de Desidratação Crônica
    Além da sede, seu corpo avisa quando falta água e sais:
    - Boca seca e lábios rachados.
    - Urina escura e com odor forte.
    - Dores de cabeça constantes e tontura.
    - Pele seca e sem elasticidade.
    - Fadiga inexplicável e dificuldade de concentração.

    ## Como Hidratar de Forma Inteligente
    1. **Adicione um Toque de Sal:** Se você bebe água filtrada/destilada, adicione uma pitada pequena de sal marinho ou sal rosa. Isso repõe minerais traço.
    2. **Alimentos Hidratantes:** Melancia, pepino, alface e abobrinha são 90%+ água e já vêm com minerais naturais.
    3. **Água de Coco:** O isotônico natural por excelência, rico em potássio.
    4. **Monitore sua Urina:** Ela deve ser de cor amarelo claro (palha). Se estiver transparente, você pode estar bebendo água demais e perdendo sais. Se estiver escura, precisa de mais líquidos.

    ## Hidratação e Performance
    Apenas 2% de desidratação pode reduzir sua performance cognitiva e física em até 20%. Antes de tomar um café por estar cansado, tente beber um copo grande de água com limão e uma pitada de sal.

    ### Conclusão
    Hidratação não é apenas "beber água", é equilibrar fluidos. Escute seu corpo, use o sal com sabedoria (se não tiver restrição médica) e priorize alimentos integrais que hidratam de dentro para fora. Sua energia e foco vão agradecer.`,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=800',
    category: 'Saúde Geral',
    date: '02 Jul, 2024',
    readTime: '7 min',
    author: 'Dra. Hidrata'
  }
];

export const CATEGORIES = ['Saúde Geral', 'Nutrição', 'Receitas Saudáveis', 'Bem-estar', 'Saúde Mental'];
