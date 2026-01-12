
import React, { useState } from 'react';
import AdBanner from './AdBanner';

const WeightConverter: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('xicara');
  const [ingredient, setIngredient] = useState<string>('agua');

  const density: Record<string, number> = {
    agua: 240, farinha: 120, acucar: 200, manteiga: 230, arroz: 200, cacau: 100, aveia: 90, leite: 245, sal: 300, oleo: 220
  };

  const calculate = () => {
    const val = parseFloat(value);
    if (isNaN(val) || val <= 0) return null;

    let grams = 0;
    if (fromUnit === 'xicara') grams = val * density[ingredient];
    else if (fromUnit === 'colher_sopa') grams = val * (density[ingredient] / 16);
    else if (fromUnit === 'colher_cha') grams = val * (density[ingredient] / 48);
    else grams = val;

    return {
      grams: grams.toFixed(1),
      kg: (grams / 1000).toFixed(3),
      ml: grams.toFixed(1)
    };
  };

  const results = calculate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-4xl font-black text-stone-800 mb-4 tracking-tight">Conversor de Medidas</h2>
        <p className="text-stone-500 max-w-lg mx-auto font-medium">Precisão é o segredo da boa culinária.</p>
      </div>

      <AdBanner className="mb-12" />

      <div className="bg-white rounded-[3.5rem] p-8 md:p-16 border border-stone-100 shadow-2xl relative overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-2">Quantidade</label>
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full p-5 rounded-[2rem] bg-stone-50 border-2 border-transparent focus:border-red-500 outline-none transition-all text-xl font-bold" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-2">Medida</label>
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full p-5 rounded-[2rem] bg-stone-50 border-2 border-transparent focus:border-red-500 outline-none font-bold">
              <option value="xicara">Xícaras</option>
              <option value="colher_sopa">Colheres Sopa</option>
              <option value="colher_cha">Colheres Chá</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-2">Ingrediente</label>
            <select value={ingredient} onChange={(e) => setIngredient(e.target.value)} className="w-full p-5 rounded-[2rem] bg-stone-50 border-2 border-transparent focus:border-red-500 outline-none font-bold">
              <option value="agua">Água / Líquidos</option>
              <option value="farinha">Farinha</option>
              <option value="acucar">Açúcar</option>
            </select>
          </div>
        </div>

        {results && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in fade-in">
            <div className="bg-stone-50 p-6 rounded-3xl text-center">
              <p className="text-[10px] font-black text-stone-400 uppercase mb-2">Grama</p>
              <p className="text-2xl font-black">{results.grams}g</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-3xl text-center">
              <p className="text-[10px] font-black text-stone-400 uppercase mb-2">Quilo</p>
              <p className="text-2xl font-black">{results.kg}kg</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-3xl text-center">
              <p className="text-[10px] font-black text-stone-400 uppercase mb-2">ML</p>
              <p className="text-2xl font-black">{results.ml}ml</p>
            </div>
          </div>
        )}
      </div>

      <AdBanner />
    </div>
  );
};

export default WeightConverter;
