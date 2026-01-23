
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
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-4 block">Precisão Técnica e Autoridade Gastronômica</span>
        <h1 className="text-5xl md:text-7xl font-black text-stone-900 tracking-tighter mb-8 uppercase">Conversão de <span className="text-[#ef4444]">Medidas Culinárias</span></h1>
        <p className="text-stone-500 max-w-2xl mx-auto font-medium text-xl italic leading-relaxed">Na gastronomia funcional, a diferença entre o sucesso e a falha de uma receita reside no rigor das medidas. Utilize nossa tabela de densidade molecular abaixo.</p>
      </div>

      <div className="bg-stone-900 p-10 md:p-20 rounded-[4rem] text-white mb-24 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div>
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3 block">Volume Medido</label>
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ex: 1.5" className="w-full bg-white/10 border border-white/20 p-6 rounded-2xl text-3xl font-black outline-none focus:bg-white focus:text-stone-900 transition-all" />
          </div>
          <div>
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3 block">Unidade Original</label>
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full bg-white/10 border border-white/20 p-6 rounded-2xl text-xl font-bold outline-none cursor-pointer">
              <option value="xicara">Xícaras (Cup)</option>
              <option value="colher_sopa">Colheres de Sopa</option>
              <option value="colher_cha">Colheres de Chá</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3 block">Ingrediente Base</label>
            <select value={ingredient} onChange={(e) => setIngredient(e.target.value)} className="w-full bg-white/10 border border-white/20 p-6 rounded-2xl text-xl font-bold outline-none cursor-pointer">
              <option value="agua">Água / Leite / Sucos</option>
              <option value="farinha">Farinha de Trigo / Aveia</option>
              <option value="acucar">Açúcar Mascavo / Cristal</option>
              <option value="manteiga">Manteiga / Ghee (Líquida)</option>
              <option value="arroz">Arroz Integral (Cru)</option>
              <option value="oleo">Azeite de Oliva / Óleo</option>
            </select>
          </div>
        </div>

        {results ? (
          <div className="mt-16 pt-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            <div className="text-center bg-white/5 p-8 rounded-3xl border border-white/5">
              <span className="text-stone-500 text-[10px] font-black uppercase tracking-widest">Massa em Gramas (g)</span>
              <p className="text-6xl font-black text-[#ef4444] mt-2">{results.grams}</p>
            </div>
            <div className="text-center bg-white/5 p-8 rounded-3xl border border-white/5">
              <span className="text-stone-500 text-[10px] font-black uppercase tracking-widest">Peso em Quilos (kg)</span>
              <p className="text-6xl font-black text-white mt-2">{results.kg}</p>
            </div>
            <div className="text-center bg-white/5 p-8 rounded-3xl border border-white/5">
              <span className="text-stone-500 text-[10px] font-black uppercase tracking-widest">Volume Estimado (ml)</span>
              <p className="text-6xl font-black text-white mt-2">{results.ml}</p>
            </div>
          </div>
        ) : (
          <div className="mt-16 text-center text-stone-500 italic font-medium leading-relaxed">
             Insira os valores acima para visualizar o cálculo de massa baseado na densidade específica do ingrediente.
          </div>
        )}
      </div>

      <AdBanner />

      <section className="max-w-5xl mx-auto py-24 border-t border-stone-100">
        <h2 className="text-4xl font-black text-stone-900 mb-12 tracking-tight uppercase text-center md:text-left">Por que Pesar Ingredientes é Vital?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-stone-600 leading-relaxed text-lg font-medium">
          <div className="space-y-8">
            <p>
              Nas receitas do <strong>Saúde com Sabor</strong>, buscamos o equilíbrio nutricional exato. Uma "xícara" de farinha de coco pode pesar de 100g a 140g dependendo de quão compactada ela está no utensílio. Essa variação de 40% altera completamente a textura do prato e a contagem calórica.
            </p>
            <h3 className="text-2xl font-black text-stone-800 uppercase tracking-tighter border-b-4 border-red-100 pb-2 inline-block">História das Medidas</h3>
            <p>
              Tradicionalmente, os países de língua inglesa (EUA e Reino Unido) adotaram sistemas de volume (cups) pela praticidade doméstica do século XIX. No entanto, a alta gastronomia europeia e a confeitaria técnica sempre priorizaram a massa (gramas) por ser uma medida invariável pela pressão atmosférica ou compactação manual.
            </p>
          </div>
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-stone-800 uppercase tracking-tighter border-b-4 border-red-100 pb-2 inline-block">A Ciência da Densidade</h3>
            <p>
              Cada ingrediente possui uma <strong>gravidade específica</strong>. O óleo de coco, por exemplo, é menos denso que o leite de amêndoas. Nosso conversor utiliza tabelas de densidade atualizadas para garantir que você tenha a experiência culinária mais próxima do planejado pelo nosso Chef.
            </p>
            <div className="bg-red-50 p-10 rounded-[3rem] border border-red-100">
               <h4 className="text-red-900 font-black mb-4 uppercase text-xs tracking-widest">Dica Editorial</h4>
               <p className="text-red-800/70 text-base leading-relaxed italic">
                 "Se você não possui uma balança digital, utilize sempre o mesmo conjunto de medidores padrão. Nunca 'soque' a farinha na xícara; encha-a com uma colher e nivele o topo com o lado cego de uma faca para obter o volume correto."
               </p>
            </div>
          </div>
        </div>
      </section>

      <AdBanner />
    </div>
  );
};

export default WeightConverter;
