
import React, { useState } from 'react';

const WeightConverter: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('xicara');
  const [ingredient, setIngredient] = useState<string>('agua');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Fatores de conversão atualizados e expandidos
  const density: Record<string, number> = {
    agua: 240,
    farinha: 120,
    acucar: 200,
    manteiga: 230,
    arroz: 200,
    cacau: 100,
    aveia: 90,
    leite: 245,
    sal: 300,
    oleo: 220
  };

  const calculate = () => {
    const val = parseFloat(value);
    if (isNaN(val) || val <= 0) return null;

    let grams = 0;
    if (fromUnit === 'xicara') grams = val * density[ingredient];
    else if (fromUnit === 'colher_sopa') grams = val * (density[ingredient] / 16);
    else if (fromUnit === 'colher_cha') grams = val * (density[ingredient] / 48);
    else if (fromUnit === 'libra') grams = val * 453.59;
    else if (fromUnit === 'onca') grams = val * 28.35;
    else grams = val;

    return {
      grams: grams.toFixed(1),
      kg: (grams / 1000).toFixed(3),
      ml: (fromUnit === 'xicara' || fromUnit === 'colher_sopa' || fromUnit === 'colher_cha' ? 
          (fromUnit === 'xicara' ? val * 240 : fromUnit === 'colher_sopa' ? val * 15 : val * 5) : 
          grams).toFixed(1)
    };
  };

  const results = calculate();

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-[3.5rem] p-8 md:p-16 border border-stone-100 shadow-2xl relative overflow-hidden">
        {/* Elemento Decorativo de Fundo */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10 text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-3xl mb-6 shadow-inner">
            <i className="fa-solid fa-scale-balanced text-2xl"></i>
          </div>
          <h2 className="text-4xl font-black text-stone-800 mb-4 tracking-tight">Conversor de Medidas</h2>
          <p className="text-stone-500 max-w-lg mx-auto font-medium">
            Precisão é o segredo da boa culinária. Converta volumes caseiros em pesos exatos em segundos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] ml-2">Quantidade</label>
            <input 
              type="number" 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ex: 1.5"
              className="w-full p-5 rounded-[2rem] bg-stone-50 border-2 border-stone-50 focus:border-red-500 focus:bg-white outline-none transition-all text-xl font-bold text-stone-800 shadow-sm"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] ml-2">Medida Original</label>
            <div className="relative">
              <select 
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-5 rounded-[2rem] bg-stone-50 border-2 border-stone-50 focus:border-red-500 focus:bg-white outline-none transition-all font-bold text-stone-700 appearance-none shadow-sm"
              >
                <option value="xicara">Xícaras</option>
                <option value="colher_sopa">Colheres de Sopa</option>
                <option value="colher_cha">Colheres de Chá</option>
                <option value="libra">Libras (lb)</option>
                <option value="onca">Onças (oz)</option>
                <option value="grama">Gramas (g)</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                <i className="fa-solid fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] ml-2">Ingrediente</label>
            <div className="relative">
              <select 
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                className="w-full p-5 rounded-[2rem] bg-stone-50 border-2 border-stone-50 focus:border-red-500 focus:bg-white outline-none transition-all font-bold text-stone-700 appearance-none shadow-sm"
              >
                <option value="agua">Água / Líquidos</option>
                <option value="leite">Leite Integral</option>
                <option value="oleo">Óleo Vegetal</option>
                <option value="farinha">Farinha de Trigo</option>
                <option value="acucar">Açúcar Refinado</option>
                <option value="manteiga">Manteiga / Margarina</option>
                <option value="arroz">Arroz Branco</option>
                <option value="cacau">Cacau em Pó</option>
                <option value="aveia">Aveia em Flocos</option>
                <option value="sal">Sal Refinado</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                <i className="fa-solid fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>
        </div>

        {results ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-500">
            <h4 className="text-center text-xs font-black text-stone-300 uppercase tracking-widest mb-6">Valores Convertidos</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Card Gramas */}
              <div className="group relative bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all text-center">
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">Gramas (g)</p>
                <p className="text-4xl font-black text-stone-800 mb-6">{results.grams}g</p>
                <button 
                  onClick={() => handleCopy(`${results.grams}g`, 'grams')}
                  className={`w-full py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${copiedKey === 'grams' ? 'bg-green-500 text-white' : 'bg-stone-900 text-white hover:bg-red-600'}`}
                >
                  <i className={`fa-solid ${copiedKey === 'grams' ? 'fa-check' : 'fa-copy'}`}></i>
                  {copiedKey === 'grams' ? 'Copiado!' : 'Copiar'}
                </button>
              </div>

              {/* Card Quilogramas */}
              <div className="group relative bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all text-center">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Quilos (kg)</p>
                <p className="text-4xl font-black text-stone-800 mb-6">{results.kg}kg</p>
                <button 
                  onClick={() => handleCopy(`${results.kg}kg`, 'kg')}
                  className={`w-full py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${copiedKey === 'kg' ? 'bg-green-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                >
                  <i className={`fa-solid ${copiedKey === 'kg' ? 'fa-check' : 'fa-copy'}`}></i>
                  {copiedKey === 'kg' ? 'Copiado!' : 'Copiar'}
                </button>
              </div>

              {/* Card Mililitros */}
              <div className="group relative bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all text-center">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Volume (ml)</p>
                <p className="text-4xl font-black text-stone-800 mb-6">{results.ml}ml</p>
                <button 
                  onClick={() => handleCopy(`${results.ml}ml`, 'ml')}
                  className={`w-full py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${copiedKey === 'ml' ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  <i className={`fa-solid ${copiedKey === 'ml' ? 'fa-check' : 'fa-copy'}`}></i>
                  {copiedKey === 'ml' ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-stone-100 rounded-[3rem] bg-stone-50/30">
            <i className="fa-solid fa-wand-magic-sparkles text-5xl text-stone-200 mb-6 block animate-pulse"></i>
            <p className="font-bold text-stone-400">Insira os dados acima para converter automaticamente.</p>
          </div>
        )}

        {/* Dica do Chef Refinada */}
        <div className="mt-16 p-10 bg-gradient-to-br from-stone-50 to-white rounded-[2.5rem] border border-stone-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
            👨‍🍳
          </div>
          <div className="space-y-2">
            <h4 className="font-black text-stone-800 flex items-center gap-2 text-lg">
              Dica Pro do Saúde com Sabor
            </h4>
            <p className="text-stone-500 leading-relaxed font-medium">
              Sabia que a forma como você enche a xícara de farinha pode alterar o peso em até 20g? Para resultados perfeitos, use sempre uma balança digital. Nossa calculadora usa densidades médias ideais para receitas domésticas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightConverter;
