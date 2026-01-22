
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
    <div className="max-w-7xl mx-auto px-4 py-24 animate-fade-in">
      <div className="text-center mb-20">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-4 block">Educação Gastronômica</span>
        <h2 className="text-6xl md:text-8xl font-black text-stone-900 tracking-tighter mb-8 uppercase">Precisão na <span className="text-[#ef4444]">Cozinha</span></h2>
        <p className="text-stone-500 max-w-2xl mx-auto font-medium text-xl italic">Aprenda a converter medidas caseiras com rigor técnico para resultados profissionais.</p>
      </div>

      <div className="bg-stone-900 p-10 md:p-20 rounded-[4rem] text-white mb-24 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div>
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3 block">Quantidade</label>
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ex: 1" className="w-full bg-white/10 border border-white/20 p-6 rounded-2xl text-3xl font-black outline-none focus:bg-white focus:text-stone-900 transition-all" />
          </div>
          <div>
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3 block">Medida Original</label>
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full bg-white/10 border border-white/20 p-6 rounded-2xl text-xl font-bold outline-none cursor-pointer">
              <option value="xicara">Xícaras</option>
              <option value="colher_sopa">Colheres de Sopa</option>
              <option value="colher_cha">Colheres de Chá</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3 block">Ingrediente</label>
            <select value={ingredient} onChange={(e) => setIngredient(e.target.value)} className="w-full bg-white/10 border border-white/20 p-6 rounded-2xl text-xl font-bold outline-none cursor-pointer">
              <option value="agua">Água / Líquidos</option>
              <option value="farinha">Farinha de Trigo</option>
              <option value="acucar">Açúcar</option>
              <option value="manteiga">Manteiga</option>
              <option value="arroz">Arroz</option>
            </select>
          </div>
        </div>

        {results && (
          <div className="mt-16 pt-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            <div className="text-center">
              <span className="text-stone-500 text-[10px] font-black uppercase tracking-widest">Grams (g)</span>
              <p className="text-6xl font-black text-[#ef4444] mt-2">{results.grams}</p>
            </div>
            <div className="text-center">
              <span className="text-stone-500 text-[10px] font-black uppercase tracking-widest">Kilograms (kg)</span>
              <p className="text-6xl font-black text-white mt-2">{results.kg}</p>
            </div>
            <div className="text-center">
              <span className="text-stone-500 text-[10px] font-black uppercase tracking-widest">Volume (ml)</span>
              <p className="text-6xl font-black text-white mt-2">{results.ml}</p>
            </div>
          </div>
        )}
      </div>

      <AdBanner />

      {/* CONTEÚDO EDITORIAL PARA O ADSENSE */}
      <section className="max-w-4xl mx-auto prose prose-stone prose-lg py-20">
        <h2 className="text-4xl font-black text-stone-900 mb-10 tracking-tight uppercase">A Ciência da Precisão na Confeitaria e Gastronomia</h2>
        <p className="text-stone-600 text-xl leading-relaxed mb-8">
          Muitos iniciantes na cozinha negligenciam a importância da pesagem correta dos ingredientes. Na gastronomia funcional, onde substituições de farinhas (como farinha de amêndoas por psyllium) são comuns, um erro de 10 gramas pode comprometer a estrutura e a absorção de nutrientes de uma receita.
        </p>
        <h3 className="text-2xl font-black text-stone-800 mb-6">Por que xícaras nem sempre funcionam?</h3>
        <p className="text-stone-600 leading-relaxed mb-8">
          O volume de uma xícara de farinha pode variar dependendo de quão compactada ela está. Uma xícara de farinha "peneirada" pesa menos do que uma xícara "pressionada". Por isso, grandes chefs e nutricionistas utilizam balanças de precisão. Nosso conversor utiliza médias de densidade aceitas internacionalmente para ajudar você a transitar entre essas medidas.
        </p>
        <div className="bg-red-50 p-10 rounded-[3rem] border border-red-100 mb-12">
          <h4 className="text-red-900 font-black mb-4 uppercase text-sm">Dica de Conservação Nutricional</h4>
          <p className="text-red-800/80 mb-0">Ao medir líquidos como azeite extra virgem, lembre-se que 1 colher de sopa equivale a aproximadamente 13g. A precisão ajuda a manter o controle calórico do seu plano alimentar diário sem sacrificar o sabor.</p>
        </div>
      </section>

      <AdBanner />
    </div>
  );
};

export default WeightConverter;
