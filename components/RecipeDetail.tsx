
import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // JSON-LD para SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": recipe.title,
    "image": [recipe.image],
    "author": { "@type": "Person", "name": recipe.author },
    "datePublished": "2024-06-01",
    "description": recipe.description,
    "prepTime": `PT${recipe.prepTime}M`,
    "cookTime": `PT${recipe.cookTime}M`,
    "totalTime": `PT${recipe.prepTime + recipe.cookTime}M`,
    "recipeYield": `${recipe.servings} porções`,
    "recipeCategory": recipe.category,
    "recipeCuisine": "Saudável",
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": `${recipe.nutrition.calories} calories`,
      "proteinContent": `${recipe.nutrition.protein}g`,
      "fatContent": `${recipe.nutrition.fat}g`,
      "carbohydrateContent": `${recipe.nutrition.carbs}g`,
      "fiberContent": `${recipe.nutrition.fiber}g`
    },
    "recipeIngredient": recipe.ingredients,
    "recipeInstructions": recipe.instructions.map(text => ({ "@type": "HowToStep", "text": text })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": recipe.rating,
      "reviewCount": Math.max(recipe.reviews.length, 1)
    }
  };

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timer !== null && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => (t !== null ? t - 1 : 0));
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      if (window.Notification && Notification.permission === "granted") {
        new Notification("Saúde com Sabor: O tempo acabou!");
      } else {
        alert('O tempo acabou!');
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const startTimer = (minutes: number) => {
    setTimer(minutes * 60);
    setIsTimerRunning(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8" itemScope itemType="https://schema.org/Recipe">
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-stone-400 hover:text-red-600 transition-all font-black text-xs uppercase tracking-widest"
      >
        <i className="fa-solid fa-arrow-left"></i> Voltar para receitas
      </button>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl rotate-1">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" itemProp="image" />
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <span className="px-4 py-2 bg-white text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
              {recipe.diet}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <nav className="flex items-center gap-2 mb-6">
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest" itemProp="recipeCategory">{recipe.category}</span>
            <span className="w-1 h-1 rounded-full bg-stone-300"></span>
            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{recipe.difficulty}</span>
          </nav>
          
          <h1 className="text-5xl font-black mb-6 text-stone-800 leading-[1.1] tracking-tighter" itemProp="name">{recipe.title}</h1>
          <p className="text-lg text-stone-500 mb-8 leading-relaxed italic" itemProp="description">"{recipe.description}"</p>
          
          <div className="grid grid-cols-3 gap-4 py-8 border-y border-stone-100">
            <div className="text-center">
              <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mb-2">Preparo</p>
              <p className="font-black text-stone-800 text-xl"><i className="fa-regular fa-clock mr-1 text-red-500"></i> {recipe.prepTime} min</p>
            </div>
            <div className="text-center border-x border-stone-100 px-4">
              <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mb-2">Cozimento</p>
              <p className="font-black text-stone-800 text-xl"><i className="fa-solid fa-fire-burner mr-1 text-orange-500"></i> {recipe.cookTime} min</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mb-2">Porções</p>
              <p className="font-black text-stone-800 text-xl" itemProp="recipeYield"><i className="fa-solid fa-utensils mr-1 text-blue-500"></i> {recipe.servings}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* AdSense lateral simulado */}
        <aside className="lg:col-span-1 space-y-12">
          <section className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-sm">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <i className="fa-solid fa-carrot"></i>
              </span> 
              Ingredientes
            </h3>
            <ul className="space-y-5">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-4 text-stone-600 group" itemProp="recipeIngredient">
                  <div className="mt-1.5 w-2 h-2 rounded-full border-2 border-red-500 group-hover:bg-red-500 transition-all"></div>
                  <span className="font-medium text-sm leading-relaxed">{ing}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-stone-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <i className="fa-solid fa-chart-line text-red-500"></i> Nutrição
            </h3>
            <div className="space-y-5" itemProp="nutrition" itemScope itemType="https://schema.org/NutritionInformation">
              {[
                { label: 'Calorias', value: recipe.nutrition.calories, unit: 'kcal', prop: 'calories' },
                { label: 'Proteínas', value: recipe.nutrition.protein, unit: 'g', prop: 'proteinContent' },
                { label: 'Carboidratos', value: recipe.nutrition.carbs, unit: 'g', prop: 'carbohydrateContent' },
                { label: 'Gorduras', value: recipe.nutrition.fat, unit: 'g', prop: 'fatContent' },
                { label: 'Fibras', value: recipe.nutrition.fiber, unit: 'g', prop: 'fiberContent' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-stone-400 text-xs font-bold uppercase tracking-widest">{item.label}</span>
                  <span className="font-black text-lg" itemProp={item.prop}>{item.value}{item.unit}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Steps */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-stone-800 tracking-tight">Modo de Preparo</h2>
            {timer !== null && (
              <div className="flex items-center gap-4 bg-red-600 text-white px-6 py-3 rounded-2xl shadow-xl shadow-red-200 animate-pulse">
                <i className="fa-solid fa-hourglass-half"></i>
                <span className="font-mono font-black text-xl">{formatTime(timer)}</span>
                <button 
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-all"
                >
                  <i className={`fa-solid ${isTimerRunning ? 'fa-pause' : 'fa-play'}`}></i>
                </button>
              </div>
            )}
          </div>

          <div className="space-y-8" itemProp="recipeInstructions">
            {recipe.instructions.map((step, i) => (
              <div 
                key={i} 
                className={`p-8 rounded-[2rem] transition-all border ${activeStep === i ? 'bg-white border-red-200 shadow-xl scale-[1.03]' : 'bg-transparent border-stone-100 hover:border-stone-200'} cursor-pointer group`}
                onClick={() => setActiveStep(i)}
              >
                <div className="flex gap-6">
                  <span className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-all ${activeStep === i ? 'bg-red-600 text-white shadow-lg rotate-3' : 'bg-stone-100 text-stone-400 group-hover:rotate-6'}`}>
                    {i + 1}
                  </span>
                  <div>
                    <p className={`text-lg leading-relaxed font-medium ${activeStep === i ? 'text-stone-800' : 'text-stone-500'}`}>
                      {step}
                    </p>
                    {activeStep === i && (
                      <div className="mt-6 flex gap-3">
                        <button 
                          onClick={(e) => { e.stopPropagation(); startTimer(5); }}
                          className="text-[10px] bg-red-50 text-red-600 px-4 py-2 rounded-xl font-black uppercase tracking-widest hover:bg-red-100 transition-all"
                        >
                          Timer 5m
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); startTimer(15); }}
                          className="text-[10px] bg-red-50 text-red-600 px-4 py-2 rounded-xl font-black uppercase tracking-widest hover:bg-red-100 transition-all"
                        >
                          Timer 15m
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="ads-placeholder mt-16">
            <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Publicidade (AdSense)</span>
          </div>

          <section className="mt-24 pt-16 border-t border-stone-100">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-3xl font-black text-stone-800 tracking-tight">Experiências Reais</h3>
              <button className="bg-stone-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-red-600 transition-all shadow-xl active:scale-95">
                Avaliar Receita
              </button>
            </div>
            
            {recipe.reviews.length > 0 ? (
              <div className="space-y-10">
                {recipe.reviews.map(review => (
                  <div key={review.id} className="bg-white p-8 rounded-[2rem] border border-stone-100 group">
                    <div className="flex items-center gap-4 mb-6">
                      <img src={`https://picsum.photos/seed/${review.user}/80/80`} className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt={review.user} />
                      <div>
                        <p className="font-black text-stone-800">{review.user}</p>
                        <div className="flex gap-1 text-yellow-500 text-[10px]">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fa-solid fa-star ${i >= review.rating ? 'opacity-20' : ''}`}></i>
                          ))}
                        </div>
                      </div>
                      <span className="ml-auto text-[10px] font-black text-stone-300 uppercase">{review.date}</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed font-medium italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-stone-50 rounded-[3rem] border-2 border-dashed border-stone-100">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-stone-200 mx-auto mb-6 shadow-sm">
                  <i className="fa-solid fa-comment-dots text-3xl"></i>
                </div>
                <p className="text-stone-400 font-bold">Ninguém comentou ainda. Seja o primeiro a inspirar!</p>
              </div>
            )}
          </section>
        </section>
      </div>
    </article>
  );
};

export default RecipeDetail;
