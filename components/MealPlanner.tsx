
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12" id="meal-planner-view">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 no-print">
        <div className="text-center md:text-left">
          <h2 className="text-5xl font-black text-stone-800 tracking-tighter mb-2 leading-none">Plano Nutricional</h2>
          <p className="text-stone-500 text-lg font-medium italic">Organize sua semana e mantenha o foco na saúde.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => setShowShoppingList(true)}
            className="flex items-center gap-3 bg-stone-900 text-white px-8 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-stone-800 transition-all shadow-xl active:scale-95"
          >
            <i className="fa-solid fa-list-check"></i>
            Lista de Compras
          </button>
        </div>
      </div>

      <AdBanner className="mb-12" />

      {/* Main Planner Grid */}
      <div className="meal-grid grid grid-cols-1 md:grid-cols-7 gap-4 mb-16">
        {mealPlan.map((day, dayIdx) => (
          <div key={day.day} className="day-card bg-white rounded-[2rem] border-2 border-stone-100 shadow-sm overflow-hidden flex flex-col">
            {/* Day Header - Fundo Escuro para Destaque */}
            <div className="p-4 bg-stone-900 text-center">
              <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">{day.day}</span>
            </div>
            
            <div className="p-3 space-y-4 flex-grow bg-white">
              {MEAL_ORDER.map((slot) => {
                const recipeId = day.meals[slot];
                const recipe = recipes.find(r => r.id === recipeId);

                return (
                  <div key={slot} className="slot-container group relative">
                    {/* Meal Label - Mais Escuro e Visível */}
                    <div className="flex justify-between items-center mb-1.5 px-1">
                      <span className="slot-label text-[9px] font-black text-stone-800 uppercase tracking-tight">{slot}</span>
                    </div>

                    {recipe ? (
                      <div 
                        onClick={() => onRecipeClick(recipe)}
                        className="bg-stone-50 p-3 rounded-2xl border border-stone-200 hover:border-red-400 hover:bg-red-50/30 transition-all cursor-pointer shadow-sm group"
                      >
                        <p className="recipe-title text-[11px] font-bold text-stone-900 leading-tight line-clamp-2 group-hover:text-red-700">{recipe.title}</p>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setSearchModal({ dayIdx, slot })}
                        className="w-full py-5 border-2 border-dashed border-stone-200 bg-stone-50/50 rounded-2xl text-stone-300 hover:border-stone-400 hover:text-stone-500 transition-all flex items-center justify-center no-print"
                      >
                        <i className="fa-solid fa-plus text-sm"></i>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <AdBanner className="mb-16" />

      {searchModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-stone-900/90 backdrop-blur-md no-print">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-8 border-b border-stone-100 bg-stone-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Escolher Receita</h3>
                <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mt-1">Para: {searchModal.slot} na {DAYS[searchModal.dayIdx]}</p>
              </div>
              <button onClick={() => setSearchModal(null)} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            <div className="p-6 border-b border-stone-100 bg-stone-50">
              <input 
                type="text" 
                placeholder="Pesquisar por nome ou categoria..."
                className="w-full px-8 py-5 rounded-2xl border-2 border-transparent focus:border-red-500 outline-none transition-all font-bold text-stone-700 shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-3 bg-white">
              {filteredRecipes.length > 0 ? filteredRecipes.map(recipe => (
                <div 
                  key={recipe.id}
                  onClick={() => {
                    const newPlan = [...mealPlan];
                    newPlan[searchModal.dayIdx].meals[searchModal.slot] = recipe.id;
                    setMealPlan(newPlan);
                    setSearchModal(null);
                  }}
                  className="flex items-center gap-5 p-5 rounded-3xl bg-white border border-stone-100 hover:border-red-200 hover:bg-red-50/20 cursor-pointer group transition-all"
                >
                  <img src={recipe.image} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt={recipe.title} />
                  <div>
                    <h4 className="font-bold text-stone-800 text-lg group-hover:text-red-600 transition-colors">{recipe.title}</h4>
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-1">{recipe.category}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 text-stone-300">
                   <i className="fa-solid fa-magnifying-glass text-4xl mb-4"></i>
                   <p className="font-bold">Nenhuma receita encontrada.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
