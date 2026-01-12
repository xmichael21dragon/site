
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-[2rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-64">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        <div className="absolute top-5 left-5">
          <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-[10px] font-black text-red-600 uppercase tracking-[0.2em] rounded-xl shadow-lg">
            {recipe.diet}
          </span>
        </div>
      </div>

      <div className="p-8">
        <p className="text-red-600 text-xs font-black uppercase tracking-[0.3em] mb-3">{recipe.category}</p>
        <h3 className="text-2xl font-bold text-stone-800 mb-4 line-clamp-2 group-hover:text-red-600 transition-colors duration-300 leading-tight tracking-tight">
          {recipe.title}
        </h3>
        <p className="text-base text-stone-500 line-clamp-2 mb-8 leading-relaxed">
          {recipe.description}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-stone-50">
          <div className="flex items-center gap-5 text-stone-400 text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <i className="fa-regular fa-clock text-base text-stone-300"></i>
              {recipe.prepTime + recipe.cookTime}m
            </span>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-signal text-base text-stone-300"></i>
              {recipe.difficulty}
            </span>
          </div>
          <button className="w-12 h-12 rounded-2xl bg-stone-50 text-stone-400 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm">
            <i className="fa-solid fa-arrow-right text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
