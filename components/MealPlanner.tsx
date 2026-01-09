
import React, { useState, useMemo } from 'react';
import { Recipe, MealPlan, MealSlotType } from '../types';

interface MealPlannerProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
}

const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const MEAL_ORDER: MealSlotType[] = ['Café da Manhã', 'Lanche da Manhã', 'Almoço', 'Lanche da Tarde', 'Jantar'];

const parseIngredient = (ingStr: string) => {
  const regex = /^([\d.,]+)\s*([a-zA-Záàâãéèêíïóôõöúç]*)\s*(?:de\s+)?(.*)/i;
  const match = ingStr.match(regex);
  if (match) {
    const amount = parseFloat(match[1].replace(',', '.'));
    const unit = match[2]?.toLowerCase() || '';
    const name = match[3]?.trim().toLowerCase() || '';
    return { amount, unit, name, originalName: match[3]?.trim() || ingStr };
  }
  return { amount: 0, unit: '', name: ingStr.toLowerCase(), originalName: ingStr };
};

const formatUnit = (amount: number, unit: string) => {
  if (amount <= 1) return unit;
  const plurals: Record<string, string> = {
    'colher': 'colheres', 'xícara': 'xícaras', 'dente': 'dentes',
    'unidade': 'unidades', 'fatia': 'fatias', 'pote': 'potes'
  };
  return plurals[unit] || unit;
};

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

  const clearPlan = () => {
    if(confirm("Deseja realmente limpar todo o seu planejamento?")) {
      setMealPlan(DAYS.map(day => ({ 
        day, 
        meals: {
          'Café da Manhã': null, 'Lanche da Manhã': null,
          'Almoço': null, 'Lanche da Tarde': null, 'Jantar': null
        }
      })));
    }
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter(r => 
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, recipes]);

  const selectRecipe = (recipeId: string) => {
    if (!searchModal) return;
    setMealPlan(prev => {
      const newPlan = [...prev];
      newPlan[searchModal.dayIdx].meals[searchModal.slot] = recipeId;
      return newPlan;
    });
    setSearchModal(null);
    setSearchTerm('');
  };

  const removeMeal = (dayIdx: number, slot: MealSlotType) => {
    setMealPlan(prev => {
      const newPlan = [...prev];
      newPlan[dayIdx].meals[slot] = null;
      return newPlan;
    });
  };

  const aggregatedShoppingList = useMemo(() => {
    const registry = new Map<string, { amount: number; unit: string; displayName: string }>();
    mealPlan.forEach(day => {
      Object.values(day.meals).forEach(recipeId => {
        if (recipeId) {
          const recipe = recipes.find(r => r.id === recipeId);
          recipe?.ingredients.forEach(ingStr => {
            const { amount, unit, name, originalName } = parseIngredient(ingStr);
            const key = `${name}|${unit}`;
            if (registry.has(key)) {
              registry.get(key)!.amount += amount;
            } else {
              registry.set(key, { amount, unit, displayName: originalName });
            }
          });
        }
      });
    });

    return Array.from(registry.values()).map(item => {
      const unitLabel = formatUnit(item.amount, item.unit);
      return {
        text: `${item.amount % 1 === 0 ? item.amount : item.amount.toFixed(1)}${unitLabel ? ' ' + unitLabel : ''} de ${item.displayName}`,
      };
    });
  }, [mealPlan, recipes]);

  const handlePrint = () => {
    const printContent = document.getElementById('meal-planner-view');
    const headContent = document.head.innerHTML;
    if (!printContent) return;

    // Criar uma nova janela para evitar bloqueios de iframe
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            ${headContent}
            <style>
              body { background: white !important; padding: 40px !important; }
              .no-print { display: none !important; }
              .meal-grid { display: grid !important; grid-template-columns: repeat(7, 1fr) !important; gap: 8px !important; }
              .day-card { border: 1px solid #eee !important; min-height: 0 !important; page-break-inside: avoid; border-radius: 12px !important; }
              .slot-container { background: #f9f9f9 !important; padding: 6px !important; border-bottom: 1px solid #eee; }
              .print-list { display: block !important; margin-top: 50px; }
              @media print {
                @page { size: landscape; margin: 1cm; }
                * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
              }
            </style>
          </head>
          <body>
            <div style="text-align:center; margin-bottom: 30px;">
              <h1 style="margin:0; font-family:serif;">Meu Plano Nutricional</h1>
              <p style="color:#666; margin:5px 0 0 0;">Saúde com Sabor - Sua Jornada Saudável</p>
            </div>
            ${printContent.innerHTML}
            <script>
              window.onload = () => {
                setTimeout(() => {
                  window.print();
                  // window.close();
                }, 1000);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      // Se popups estiverem bloqueados, usa o método comum como fallback
      window.print();
    }
  };

  const downloadOffline = () => {
    const content = document.getElementById('meal-planner-view')?.innerHTML;
    const styles = document.head.innerHTML;
    const html = `<!DOCTYPE html><html><head>${styles}<style>body{padding:40px}.no-print{display:none!important}.meal-grid{display:grid!important;grid-template-columns:repeat(7,1fr)!important;gap:8px}.day-card{border:1px solid #eee!important;border-radius:12px}.print-list{display:block!important}</style></head><body>${content}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meu-plano-alimentar.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="meal-planner-view">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .meal-grid { display: grid !important; grid-template-columns: repeat(7, 1fr) !important; gap: 8px !important; }
          .day-card { border: 1px solid #eee !important; min-height: 0 !important; }
          .print-list { display: block !important; }
        }
      `}</style>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 no-print">
        <div className="text-center md:text-left">
          <h2 className="text-5xl font-black text-stone-800 tracking-tighter mb-2">Plano Nutricional</h2>
          <p className="text-stone-500 text-lg font-medium italic">Organize sua semana e imprima seu cardápio.</p>
          <button onClick={clearPlan} className="text-xs text-red-500 font-bold mt-2 hover:underline">
            <i className="fa-solid fa-trash-can mr-1"></i> Limpar todo o plano
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="relative group">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-3 bg-red-600 text-white px-8 py-5 rounded-[2rem] font-bold hover:bg-red-700 transition-all shadow-xl active:scale-95"
            >
              <i className="fa-solid fa-print text-xl"></i> Imprimir Plano
            </button>
            <div className="absolute top-full left-0 right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
               <p className="bg-stone-800 text-white text-[10px] p-2 rounded-lg text-center">Abre em nova aba para imprimir</p>
            </div>
          </div>
          <button 
            onClick={() => setShowShoppingList(true)}
            className="flex items-center gap-3 bg-stone-900 text-white px-8 py-5 rounded-[2rem] font-bold hover:bg-stone-800 transition-all shadow-xl active:scale-95"
          >
            <div className="relative">
              <i className="fa-solid fa-list-check text-xl"></i>
              {aggregatedShoppingList.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-stone-900">
                  {aggregatedShoppingList.length}
                </span>
              )}
            </div>
            Lista de Compras
          </button>
        </div>
      </div>

      <div className="no-print mb-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-center text-xs text-blue-600 font-medium">
        <i className="fa-solid fa-circle-info mr-2"></i>
        Problemas ao imprimir? Tente <button onClick={downloadOffline} className="underline font-bold hover:text-blue-800">Baixar Versão Offline</button> para abrir fora do navegador.
      </div>

      {/* Main Planner Grid */}
      <div className="meal-grid grid grid-cols-1 md:grid-cols-7 gap-4">
        {mealPlan.map((day, dayIdx) => (
          <div key={day.day} className="day-card bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-stone-50 border-b border-stone-100 text-center">
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{day.day}</span>
            </div>
            
            <div className="p-3 space-y-3 flex-grow bg-white">
              {MEAL_ORDER.map((slot) => {
                const recipeId = day.meals[slot];
                const recipe = recipes.find(r => r.id === recipeId);

                return (
                  <div key={slot} className="slot-container group relative">
                    <div className="flex justify-between items-center mb-1">
                      <span className="slot-label text-[8px] font-black text-stone-300 uppercase tracking-tighter">{slot}</span>
                      {recipe && (
                        <button 
                          onClick={() => removeMeal(dayIdx, slot)}
                          className="text-stone-300 hover:text-red-500 transition-colors no-print"
                        >
                          <i className="fa-solid fa-circle-xmark text-xs"></i>
                        </button>
                      )}
                    </div>

                    {recipe ? (
                      <div 
                        onClick={() => onRecipeClick(recipe)}
                        className="bg-stone-50 p-3 rounded-xl border border-stone-100 hover:border-red-200 transition-all cursor-pointer"
                      >
                        <p className="recipe-title text-[11px] font-bold text-stone-800 leading-tight line-clamp-2">
                          {recipe.title}
                        </p>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setSearchModal({ dayIdx, slot })}
                        className="w-full py-4 border-2 border-dashed border-stone-100 rounded-xl text-stone-200 hover:border-red-100 hover:text-red-400 transition-all flex items-center justify-center no-print"
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

      {/* Lista de Compras para Impressão */}
      <div className="hidden print-list mt-12 pt-12 border-t-4 border-stone-800">
        <h3 className="text-3xl font-black mb-8">Lista de Compras da Semana:</h3>
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          {aggregatedShoppingList.map((item, i) => (
            <div key={i} className="flex items-center gap-4 py-2 border-b border-stone-100">
              <div className="w-5 h-5 border-2 border-stone-800"></div>
              <span className="text-sm font-bold">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Busca de Receitas */}
      {searchModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-stone-900/90 backdrop-blur-md no-print">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl scale-in-center">
            <div className="p-8 border-b border-stone-100 bg-stone-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Escolher Receita</h3>
                <p className="text-stone-400 text-xs">Para: {searchModal.slot} na {DAYS[searchModal.dayIdx]}</p>
              </div>
              <button onClick={() => setSearchModal(null)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            <div className="p-6 border-b border-stone-100 bg-stone-50">
              <div className="relative">
                <i className="fa-solid fa-search absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                <input 
                  type="text" 
                  placeholder="Pesquisar por nome ou categoria..."
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-transparent focus:border-red-500 outline-none transition-all font-bold text-stone-700 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-3">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map(recipe => (
                  <div 
                    key={recipe.id}
                    onClick={() => selectRecipe(recipe.id)}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-100 hover:border-red-200 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <img src={recipe.image} className="w-16 h-16 rounded-xl object-cover" alt={recipe.title} />
                    <div className="flex-grow">
                      <p className="text-[10px] font-black text-red-500 uppercase">{recipe.category}</p>
                      <h4 className="font-bold text-stone-800 group-hover:text-red-600 transition-colors">{recipe.title}</h4>
                      <p className="text-[10px] text-stone-400">{recipe.nutrition.calories} kcal • {recipe.diet}</p>
                    </div>
                    <i className="fa-solid fa-chevron-right text-stone-200 group-hover:text-red-500 group-hover:translate-x-1 transition-all"></i>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-stone-300">
                  <i className="fa-solid fa-cookie-bite text-5xl mb-4 opacity-10"></i>
                  <p>Nenhuma receita encontrada.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Lista de Compras */}
      {showShoppingList && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-stone-900/90 backdrop-blur-md no-print">
          <div className="bg-white rounded-[3rem] w-full max-w-xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-stone-900 text-white">
              <div>
                <h3 className="text-2xl font-bold">Lista de Compras Otimizada</h3>
                <p className="text-stone-400 text-xs mt-1">Quantidades somadas para a semana.</p>
              </div>
              <button onClick={() => setShowShoppingList(false)} className="text-stone-400 hover:text-white transition-colors">
                <i className="fa-solid fa-times text-2xl"></i>
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-8 space-y-3 bg-stone-50/50">
              {aggregatedShoppingList.length > 0 ? (
                aggregatedShoppingList.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-stone-100 group shadow-sm">
                    <input type="checkbox" className="w-6 h-6 rounded-lg border-2 border-stone-300 text-blue-600" />
                    <span className="text-stone-700 font-medium">
                      <span className="font-black text-stone-900 mr-1">{item.text.split(' de ')[0]}</span>
                      de {item.text.split(' de ')[1]}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-stone-300">
                  <i className="fa-solid fa-basket-shopping text-7xl mb-4 opacity-10"></i>
                  <p className="font-bold">Seu plano está vazio!</p>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-stone-100 bg-white flex gap-4">
              <button 
                onClick={() => {
                  const text = aggregatedShoppingList.map(i => `- ${i.text}`).join('\n');
                  navigator.clipboard.writeText(text);
                  alert('Lista copiada!');
                }}
                className="flex-1 py-5 bg-blue-600 text-white rounded-3xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
              >
                <i className="fa-solid fa-copy"></i> Copiar Tudo
              </button>
              <button 
                onClick={handlePrint}
                className="flex-1 py-5 bg-stone-900 text-white rounded-3xl font-bold hover:bg-stone-800 transition-all flex items-center justify-center gap-3"
              >
                <i className="fa-solid fa-print"></i> Imprimir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
