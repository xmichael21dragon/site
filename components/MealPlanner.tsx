
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
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-4 block">Alta Performance Nutricional</span>
        <h1 className="text-6xl md:text-8xl font-black text-stone-900 tracking-tighter mb-8 uppercase">Gestão de <span className="text-[#3b82f6]">Ciclo Alimentar</span></h1>
        <p className="text-stone-500 max-w-2xl mx-auto font-medium text-xl italic mb-10 leading-relaxed">Organize sua jornada de longevidade. O planejamento é o antídoto contra escolhas impulsivas e o segredo para uma microbiota intestinal diversificada.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => setShowShoppingList(true)}
            className="bg-stone-900 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-2xl active:scale-95"
          >
            <i className="fa-solid fa-cart-shopping mr-3"></i> Gerar Lista Automática ({shoppingList.length})
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-24 overflow-x-auto pb-4 no-scrollbar">
        {mealPlan.map((day, dayIdx) => (
          <div key={day.day} className="min-w-[220px] bg-white rounded-[2.5rem] border-2 border-stone-100 shadow-sm overflow-hidden flex flex-col hover:border-blue-100 transition-colors group">
            <div className="p-4 bg-stone-900 text-center group-hover:bg-blue-600 transition-colors">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">{day.day}</span>
            </div>
            <div className="p-4 space-y-6">
              {MEAL_ORDER.map((slot) => {
                const recipeId = day.meals[slot];
                const recipe = recipes.find(r => String(r.id) === String(recipeId));
                return (
                  <div key={slot} className="relative">
                    <p className="text-[8px] font-black text-stone-300 uppercase tracking-widest mb-2">{slot}</p>
                    {recipe ? (
                      <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 relative group/item">
                        <p className="text-[11px] font-bold text-stone-800 line-clamp-2 leading-tight">{recipe.title}</p>
                        <button onClick={() => {
                          const next = [...mealPlan];
                          next[dayIdx].meals[slot] = null;
                          setMealPlan(next);
                        }} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity shadow-lg">
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setSearchModal({ dayIdx, slot })} className="w-full h-14 border-2 border-dashed border-stone-100 rounded-2xl flex items-center justify-center text-stone-200 hover:border-blue-400 hover:text-blue-400 transition-all bg-white hover:bg-blue-50/30">
                        <i className="fa-solid fa-plus-circle text-lg"></i>
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

      <section className="max-w-5xl mx-auto py-24 border-t border-stone-100">
        <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-12 tracking-tight uppercase">A Bio-Psicologia do Planejamento</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-stone-600 leading-relaxed text-lg font-medium">
          <div className="space-y-8">
            <p>
              Estudos da <strong>Psicologia Comportamental</strong> indicam que a "Fadiga de Decisão" é a maior causa de falha em dietas saudáveis. Ao final de um dia exaustivo, o cérebro busca recompensas rápidas de glicose e dopamina, levando à ingestão de alimentos ultraprocessados.
            </p>
            <h3 className="text-2xl font-black text-stone-800 uppercase tracking-tighter border-b-4 border-blue-100 pb-2 inline-block">Homeostase Nutricional</h3>
            <p>
              O planejamento semanal permite uma visão macro da sua ingestão de fitoquímicos. Nosso sistema foi projetado para que você possa alternar cores e nutrientes, garantindo que o seu corpo receba todo o espectro vitamínico necessário para manter a homeostase e prevenir inflamações crônicas.
            </p>
          </div>
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-stone-800 uppercase tracking-tighter border-b-4 border-blue-100 pb-2 inline-block">Estratégia de Compras Inteligente</h3>
            <p>
              Ao utilizar nossa lista de compras automática, você reduz o desperdício de alimentos em até 40%. Além de ser uma prática sustentável, focar apenas nos ingredientes necessários impede que você navegue por corredores de supermercado repletos de produtos industrializados tentadores.
            </p>
            <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
               <h4 className="text-blue-900 font-black mb-4 uppercase text-xs tracking-widest">Dica de Organização</h4>
               <p className="text-blue-800/70 text-base leading-relaxed italic">
                 "Reserve 20 minutos do seu domingo para preencher este plano. Cozinhar em lotes (Meal Prep) nas noites de domingo economiza até 5 horas semanais de trabalho na cozinha durante a semana útil."
               </p>
            </div>
          </div>
        </div>
      </section>

      <AdBanner />
    </div>
  );
};

export default MealPlanner;
