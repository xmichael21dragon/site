
import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';
import AdBanner from './AdBanner';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <article className="max-w-5xl mx-auto px-4 py-12">
      <button onClick={onBack} className="mb-12 flex items-center gap-3 text-stone-400 hover:text-red-600 transition-all font-black text-sm uppercase tracking-widest">
        <i className="fa-solid fa-arrow-left text-base"></i> Voltar para receitas
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.3)] rotate-1">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          <div className="absolute top-8 left-8">
            <span className="px-6 py-3 bg-white text-red-600 rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-2xl">
              {recipe.diet}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <nav className="flex items-center gap-3 mb-8 text-xs font-black uppercase tracking-[0.2em]">
            <span className="text-red-500">{recipe.category}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
            <span className="text-stone-400">{recipe.subcategory}</span>
          </nav>
          <h1 className="text-6xl md:text-7xl font-black mb-10 text-stone-800 leading-[1] tracking-tighter">{recipe.title}</h1>
          <p className="text-2xl text-stone-500 mb-12 leading-relaxed italic font-serif">"{recipe.description}"</p>
          
          <div className="grid grid-cols-3 gap-6 py-10 border-y-2 border-stone-50">
            <div className="text-center">
              <p className="text-xs text-stone-400 uppercase font-black tracking-widest mb-3">Preparo</p>
              <p className="font-black text-stone-800 text-3xl">{recipe.prepTime}m</p>
            </div>
            <div className="text-center border-x-2 border-stone-50">
              <p className="text-xs text-stone-400 uppercase font-black tracking-widest mb-3">Cozimento</p>
              <p className="font-black text-stone-800 text-3xl">{recipe.cookTime}m</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-stone-400 uppercase font-black tracking-widest mb-3">Porções</p>
              <p className="font-black text-stone-800 text-3xl">{recipe.servings}</p>
            </div>
          </div>
        </div>
      </div>

      <AdBanner className="mb-24" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 mb-24">
        <aside className="lg:col-span-1 space-y-16">
          <section className="bg-white p-12 rounded-[3.5rem] border border-stone-100 shadow-xl">
            <h3 className="text-2xl font-black mb-10 flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <i className="fa-solid fa-carrot"></i>
              </span> 
              Ingredientes
            </h3>
            <ul className="space-y-6">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-5 text-stone-600 text-lg font-medium leading-tight">
                  <div className="mt-2 w-2.5 h-2.5 rounded-full border-2 border-red-500 flex-shrink-0"></div>
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-stone-900 text-white p-12 rounded-[3.5rem] shadow-2xl transform hover:scale-[1.02] transition-transform">
            <h3 className="text-2xl font-black mb-10 border-b border-white/10 pb-6"><i className="fa-solid fa-chart-line text-red-500 mr-3"></i> Nutrição</h3>
            <div className="space-y-6">
              {Object.entries(recipe.nutrition).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                  <span className="text-stone-400 text-xs font-black uppercase tracking-widest">{key}</span>
                  <span className="text-xl font-black">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <section className="lg:col-span-2">
          <h2 className="text-4xl font-black text-stone-800 mb-16 tracking-tight">Modo de Preparo</h2>
          <div className="space-y-10">
            {recipe.instructions.map((step, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-[3rem] border-2 transition-all cursor-pointer ${activeStep === i ? 'bg-white border-red-100 shadow-2xl scale-[1.02]' : 'bg-stone-50/30 border-stone-50'}`}
                onClick={() => setActiveStep(i)}
              >
                <div className="flex gap-8">
                  <span className={`flex-shrink-0 w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-2xl transition-colors ${activeStep === i ? 'bg-red-600 text-white' : 'bg-stone-100 text-stone-400'}`}>
                    {i + 1}
                  </span>
                  <p className={`text-xl leading-relaxed font-medium ${activeStep === i ? 'text-stone-800' : 'text-stone-500'}`}>{step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <AdBanner className="mt-12" />
    </article>
  );
};

export default RecipeDetail;
