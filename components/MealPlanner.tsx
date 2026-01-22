
import React, { useState, useMemo } from 'react';
import { Recipe, MealPlan, MealSlotType } from '../types';
import AdBanner from './AdBanner';

interface MealPlannerProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
}

const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const MEAL_ORDER: MealSlotType[] = ['Café da Manhã', 'Lanche da Manhã', 'Almoço', 'Lanche da Tarde', 'Jantar'];

const MealPlanner: React.FC<MealPlannerProps> = ({ recipes, onRecipeClick }) => {
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [searchModal, setSearchModal] = useState<{ dayIdx: number; slot: MealSlotType } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(false);
  
  const [mealPlan, setMealPlan] = useState<MealPlan>(
    DAYS.map(day => ({ 
      day, 
      meals: {
        'Café da Manhã': null, 'Lanche da Manhã': null,
        'Almoço': null, 'Lanche da Tarde': null, 'Jantar': null
      }
    }))
  );

  const filteredRecipes = useMemo(() => {
    return recipes.filter(r => 
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, recipes]);

  const shoppingList = useMemo(() => {
    const counts: Record<string, { count: number; name: string; recipes: string[] }> = {};
    mealPlan.forEach(day => {
      Object.entries(day.meals).forEach(([slot, recipeId]) => {
        if (recipeId) {
          const recipe = recipes.find(r => String(r.id) === String(recipeId));
          if (recipe && recipe.ingredients) {
            recipe.ingredients.forEach((ing) => {
              const key = ing.trim().toLowerCase();
              if (!counts[key]) {
                counts[key] = { count: 0, name: ing.trim(), recipes: [] };
              }
              counts[key].count += 1;
              if (!counts[key].recipes.includes(recipe.title)) {
                counts[key].recipes.push(recipe.title);
              }
            });
          }
        }
      });
    });
    return Object.values(counts).sort((a, b) => a.name.localeCompare(b.name));
  }, [mealPlan, recipes]);

  const copyToClipboard = () => {
    const listText = shoppingList.map(item => `[ ] ${item.name}`).join('\n');
    const headerText = `LISTA DE COMPRAS - SAÚDE COM SABOR\nGerada em: ${new Date().toLocaleDateString('pt-BR')}\n\n`;
    
    navigator.clipboard.writeText(headerText + listText).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 3000);
    });
  };

  const selectRecipe = (recipeId: string) => {
    if (!searchModal) return;
    const nextPlan = JSON.parse(JSON.stringify(mealPlan));
    nextPlan[searchModal.dayIdx].meals[searchModal.slot] = recipeId;
    setMealPlan(nextPlan);
    setSearchModal(null);
    setSearchTerm('');
  };

  const closeModal = () => {
    setShowShoppingList(false);
    setCopyFeedback(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 animate-fade-in" id="meal-planner-view">
      
      <header className="text-center mb-16">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-4 block">Gestão de Saúde</span>
        <h2 className="text-6xl md:text-8xl font-black text-stone-900 tracking-tighter mb-8 uppercase">Plano <span className="text-[#3b82f6]">Alimentar</span></h2>
        <p className="text-stone-500 max-w-2xl mx-auto font-medium text-xl italic mb-10">Organize sua semana com as melhores receitas funcionais para atingir seus objetivos.</p>
        <button 
          onClick={() => setShowShoppingList(true)}
          className="bg-stone-900 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-2xl"
        >
          <i className="fa-solid fa-cart-shopping mr-3"></i> Ver Lista de Compras ({shoppingList.length})
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-24 overflow-x-auto pb-4 no-scrollbar">
        {mealPlan.map((day, dayIdx) => (
          <div key={day.day} className="min-w-[200px] bg-white rounded-[2.5rem] border-2 border-stone-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-stone-900 text-center">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">{day.day}</span>
            </div>
            <div className="p-4 space-y-6">
              {MEAL_ORDER.map((slot) => {
                const recipeId = day.meals[slot];
                const recipe = recipes.find(r => String(r.id) === String(recipeId));
                return (
                  <div key={slot}>
                    <p className="text-[8px] font-black text-stone-300 uppercase tracking-widest mb-2">{slot}</p>
                    {recipe ? (
                      <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
                        <p className="text-[11px] font-bold text-stone-800 line-clamp-2">{recipe.title}</p>
                        <button onClick={() => {
                          const next = [...mealPlan];
                          next[dayIdx].meals[slot] = null;
                          setMealPlan(next);
                        }} className="text-[8px] text-red-500 font-black mt-2 uppercase">Remover</button>
                      </div>
                    ) : (
                      <button onClick={() => setSearchModal({ dayIdx, slot })} className="w-full h-12 border-2 border-dashed border-stone-100 rounded-2xl flex items-center justify-center text-stone-200 hover:border-stone-400 hover:text-stone-400 transition-all">
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <AdBanner />

      {/* CONTEÚDO EDITORIAL PARA O ADSENSE */}
      <section className="max-w-4xl mx-auto prose prose-stone prose-lg py-20">
        <h2 className="text-4xl font-black text-stone-900 mb-10 tracking-tight uppercase">A Ciência da Organização Alimentar</h2>
        <p className="text-stone-600 text-xl leading-relaxed mb-8">
          O planejamento semanal de refeições não é apenas uma técnica de gestão de tempo, mas uma estratégia biológica comprovada para manter a homeostase do organismo. Quando decidimos o que comer com antecedência, reduzimos a "fadiga de decisão", um estado mental que frequentemente nos leva a escolher alimentos ultraprocessados ricos em sódio e gorduras saturadas.
        </p>
        <h3 className="text-2xl font-black text-stone-800 mb-6">Por que planejar sua semana?</h3>
        <p className="text-stone-600 leading-relaxed mb-8">
          Ao estruturar um cardápio equilibrado, garantimos a ingestão de diversos fitoquímicos e macronutrientes. Nosso planejador foi desenvolvido para integrar as receitas funcionais do portal, permitindo que você visualize o balanço entre proteínas, carboidratos de baixo índice glicêmico e gorduras saudáveis ao longo dos sete dias.
        </p>
        <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100 mb-12">
          <h4 className="text-emerald-900 font-black mb-4 uppercase text-sm">Benefícios Psicológicos</h4>
          <p className="text-emerald-800/80 mb-0">Estudos de psicologia comportamental indicam que pessoas que planejam suas refeições apresentam níveis mais baixos de cortisol (o hormônio do estresse) relacionado à alimentação e maior sucesso em programas de emagrecimento sustentável.</p>
        </div>
        <p className="text-stone-600 leading-relaxed">
          Recomendamos que você dedique 15 minutos do seu domingo para preencher este plano. Utilize nossa lista de compras automática para otimizar sua ida ao mercado, focando em alimentos frescos e da estação.
        </p>
      </section>

      <AdBanner />

      {/* MODAL BUSCA RECEITA */}
      {searchModal && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-stone-900/98 backdrop-blur-3xl">
          <div className="bg-white rounded-[4rem] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in">
            <div className="p-10 bg-stone-900 text-white flex items-center justify-between">
              <h3 className="text-3xl font-black uppercase tracking-tighter">Escolher Receita</h3>
              <button onClick={() => setSearchModal(null)} className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                <i className="fa-solid fa-times text-2xl"></i>
              </button>
            </div>
            <div className="p-8 bg-stone-50 border-b border-stone-100">
              <input 
                type="text" 
                placeholder="Pesquisar prato..." 
                className="w-full p-6 rounded-[2rem] bg-white border-2 border-transparent focus:border-stone-900 outline-none transition-all font-bold shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-grow overflow-y-auto p-8 space-y-4">
              {filteredRecipes.map(recipe => (
                <div key={recipe.id} onClick={() => selectRecipe(recipe.id)} className="flex items-center gap-6 p-6 rounded-[2.5rem] border border-stone-100 hover:border-stone-900 hover:bg-stone-50 cursor-pointer transition-all group">
                  <img src={recipe.image} className="w-20 h-20 rounded-[1.5rem] object-cover" />
                  <div>
                    <h4 className="font-black text-stone-800 text-xl truncate group-hover:text-black">{recipe.title}</h4>
                    <p className="text-[11px] font-black text-red-500 uppercase tracking-widest mt-2">{recipe.diet}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL LISTA DE COMPRAS */}
      {showShoppingList && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-stone-900/95 backdrop-blur-2xl">
          <div className="bg-white rounded-[4rem] w-full max-w-xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-stone-100">
            <div className="p-8 md:p-10 border-b border-stone-100 bg-stone-900 text-white">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Sua Lista</h3>
                <button onClick={closeModal} className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-xl">
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={copyToClipboard}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg ${copyFeedback ? 'bg-emerald-500 text-white' : 'bg-white text-stone-900 hover:bg-[#3b82f6] hover:text-white'}`}
                >
                  <i className={`fa-solid ${copyFeedback ? 'fa-check' : 'fa-copy'}`}></i>
                  {copyFeedback ? 'Copiado para o Celular!' : 'Copiar Lista Inteira'}
                </button>
                <button 
                  onClick={() => window.print()}
                  className="w-16 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  title="Imprimir Lista"
                >
                  <i className="fa-solid fa-print"></i>
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-8 md:p-10 space-y-4 print:p-0">
              {shoppingList.length > 0 ? (
                shoppingList.map((item) => (
                  <div key={item.name} className="flex items-center gap-6 p-6 rounded-[2rem] border border-stone-100 bg-stone-50/50 hover:bg-white transition-all group select-text">
                     <div className="w-8 h-8 rounded-xl border-2 border-stone-300 flex-shrink-0 group-hover:border-[#3b82f6] transition-colors"></div>
                     <div className="flex-grow">
                        <span className="font-black text-stone-800 text-lg md:text-xl tracking-tight block select-text">{item.name}</span>
                        <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mt-1">Usado em {item.count} preparo(s)</p>
                     </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                   <i className="fa-solid fa-basket-shopping text-6xl text-stone-100 mb-6"></i>
                   <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Adicione receitas ao plano para gerar a lista.</p>
                </div>
              )}
            </div>
            
            <div className="p-8 bg-stone-50 text-center border-t border-stone-100">
               <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Dica: Copie a lista e cole no seu WhatsApp ou bloco de notas!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
