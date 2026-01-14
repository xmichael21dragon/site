
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

  const inputStyles = "w-full p-6 rounded-3xl bg-white border-2 border-stone-100 focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/5 outline-none transition-all text-2xl font-black text-stone-800 placeholder:text-stone-200 shadow-sm";
  const labelStyles = "text-[12px] font-black text-stone-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2 mb-3";

  return (
    <div className="max-w-5xl mx-auto px-4 py-20 animate-fade-in">
      {/* Cabeçalho de Luxo */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-stone-100 rounded-full mb-6">
          <i className="fa-solid fa-wand-magic-sparkles text-[#df2a2a] text-sm"></i>
          <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">Ferramenta Interativa</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-stone-900 mb-6 tracking-tighter leading-none">
          Conversor de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2e7d32] to-[#1b5e20]">Medidas</span>
        </h2>
        <p className="text-stone-400 max-w-2xl mx-auto font-medium text-xl md:text-2xl leading-relaxed italic">
          Transforme medidas caseiras em gramas e mililitros com precisão culinária profissional.
        </p>
      </div>

      <AdBanner className="mb-16" />

      {/* Container de Manipulação */}
      <div className="relative group">
        {/* Efeito de fundo decorativo */}
        <div className="absolute -inset-4 bg-gradient-to-br from-[#2e7d32]/5 to-[#df2a2a]/5 rounded-[5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="relative bg-white/80 backdrop-blur-xl rounded-[4rem] p-10 md:p-16 border border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            
            {/* Quantidade */}
            <div className="flex flex-col">
              <label className={labelStyles}>
                <i className="fa-solid fa-hashtag text-[#df2a2a]"></i> Quanto?
              </label>
              <input 
                type="number" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                placeholder="Ex: 2.5"
                className={inputStyles} 
              />
            </div>

            {/* Medida de Origem */}
            <div className="flex flex-col">
              <label className={labelStyles}>
                <i className="fa-solid fa-utensils text-stone-400"></i> Medida Original
              </label>
              <div className="relative">
                <select 
                  value={fromUnit} 
                  onChange={(e) => setFromUnit(e.target.value)} 
                  className={`${inputStyles} appearance-none cursor-pointer pr-16`}
                >
                  <option value="xicara">Xícaras</option>
                  <option value="colher_sopa">Colheres de Sopa</option>
                  <option value="colher_cha">Colheres de Chá</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center pointer-events-none">
                  <i className="fa-solid fa-chevron-down text-stone-300 text-xs"></i>
                </div>
              </div>
            </div>

            {/* Ingrediente */}
            <div className="flex flex-col">
              <label className={labelStyles}>
                <i className="fa-solid fa-seedling text-[#2e7d32]"></i> Qual Ingrediente?
              </label>
              <div className="relative">
                <select 
                  value={ingredient} 
                  onChange={(e) => setIngredient(e.target.value)} 
                  className={`${inputStyles} appearance-none cursor-pointer pr-16`}
                >
                  <option value="agua">Água / Líquidos</option>
                  <option value="leite">Leite Integral</option>
                  <option value="farinha">Farinha de Trigo</option>
                  <option value="acucar">Açúcar Refinado</option>
                  <option value="manteiga">Manteiga / Margarina</option>
                  <option value="arroz">Arroz Branco</option>
                  <option value="aveia">Aveia em Flocos</option>
                  <option value="cacau">Cacau em Pó</option>
                  <option value="oleo">Óleo Vegetal</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center pointer-events-none">
                  <i className="fa-solid fa-chevron-down text-stone-300 text-xs"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados com Design de Aplicativo */}
          {results ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in">
              {/* Card Gramas */}
              <div className="relative overflow-hidden bg-gradient-to-br from-stone-900 to-black p-10 rounded-[3rem] shadow-2xl group/card hover:-translate-y-2 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <p className="text-[11px] font-black text-stone-500 uppercase tracking-[0.3em] mb-4">Massa (Grama)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white tracking-tighter">{results.grams}</span>
                  <span className="text-2xl font-bold text-[#2e7d32]">g</span>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <i className="fa-solid fa-weight-hanging text-white text-xs"></i>
                  </div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Peso Líquido</span>
                </div>
              </div>

              {/* Card KG */}
              <div className="relative overflow-hidden bg-stone-50 p-10 rounded-[3rem] border border-stone-100 shadow-sm group/card hover:border-[#2e7d32] transition-all">
                <p className="text-[11px] font-black text-stone-400 uppercase tracking-[0.3em] mb-4">Quilos (Kg)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-stone-900 tracking-tighter">{results.kg}</span>
                  <span className="text-2xl font-bold text-stone-300">kg</span>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-200 flex items-center justify-center">
                    <i className="fa-solid fa-scale-balanced text-stone-500 text-xs"></i>
                  </div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Unidade Decimal</span>
                </div>
              </div>

              {/* Card Volume */}
              <div className="relative overflow-hidden bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100 shadow-sm group/card hover:bg-emerald-100 transition-all">
                <p className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-4">Volume (Ml)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-[#1b5e20] tracking-tighter">{results.ml}</span>
                  <span className="text-2xl font-bold text-emerald-300">ml</span>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <i className="fa-solid fa-droplet text-xs"></i>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800/50 uppercase tracking-widest">Capacidade</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-stone-50/50 rounded-[3rem] border-2 border-dashed border-stone-100">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-stone-200 text-4xl mb-6 shadow-sm">
                <i className="fa-solid fa-calculator animate-bounce"></i>
              </div>
              <p className="font-black uppercase tracking-[0.3em] text-xs text-stone-300">Insira um valor para converter</p>
            </div>
          )}
        </div>
      </div>

      {/* Dicas e Informações Adicionais */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex gap-6 p-8 bg-white rounded-[2.5rem] border border-stone-100 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-[#df2a2a]/10 flex items-center justify-center text-[#df2a2a] flex-shrink-0 text-xl">
            <i className="fa-solid fa-circle-info"></i>
          </div>
          <div>
            <h4 className="font-black text-stone-900 uppercase tracking-widest text-xs mb-2">Por que gramas?</h4>
            <p className="text-stone-500 text-sm leading-relaxed">
              Xícaras e colheres podem variar de tamanho. Usar peso em gramas garante que sua receita tenha sempre o mesmo resultado perfeito, especialmente em confeitaria.
            </p>
          </div>
        </div>

        <div className="flex gap-6 p-8 bg-stone-900 rounded-[2.5rem] shadow-xl text-white">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#2e7d32] flex-shrink-0 text-xl">
            <i className="fa-solid fa-kitchen-set"></i>
          </div>
          <div>
            <h4 className="font-black text-white uppercase tracking-widest text-xs mb-2">Dica de Chef</h4>
            <p className="text-stone-400 text-sm leading-relaxed">
              Ao medir farinha em xícaras, não a compacte. "Colherada por colherada" na xícara e nivelar com uma faca é o método mais próximo do peso ideal.
            </p>
          </div>
        </div>
      </div>

      <AdBanner className="mt-20" />
    </div>
  );
};

export default WeightConverter;
