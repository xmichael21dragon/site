
import React, { useState } from 'react';
import AdBanner from './AdBanner';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
    bg: string;
    description: string;
    position: number;
  } | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let category = '';
      let color = '';
      let bg = '';
      let description = '';
      let position = 0;

      if (bmi < 18.5) {
        category = 'Abaixo do peso';
        color = 'text-blue-600';
        bg = 'bg-blue-600';
        description = 'Seu índice indica que você está abaixo do peso ideal para sua estatura. Isso pode estar associado a carências nutricionais ou outros fatores metabólicos.';
        position = 15;
      } else if (bmi < 24.9) {
        category = 'Peso normal';
        color = 'text-emerald-600';
        bg = 'bg-emerald-600';
        description = 'Parabéns! Você está na faixa de peso considerada saudável. Manter esse índice reduz significativamente o risco de doenças crônicas.';
        position = 40;
      } else if (bmi < 29.9) {
        category = 'Sobrepeso';
        color = 'text-orange-600';
        bg = 'bg-orange-600';
        description = 'Atenção. O sobrepeso é um estágio inicial de alerta. Pequenos ajustes na dieta e aumento da atividade física podem reverter esse quadro.';
        position = 65;
      } else {
        category = 'Obesidade';
        color = 'text-red-600';
        bg = 'bg-red-600';
        description = 'O resultado indica obesidade. Este quadro requer atenção especializada para evitar complicações como diabetes tipo 2 e problemas cardíacos.';
        position = 90;
      }

      setResult({ bmi, category, color, bg, description, position });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 animate-fade-in">
      <div className="text-center mb-16">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-4 block">Ferramentas de Diagnóstico</span>
        <h2 className="text-6xl md:text-8xl font-black text-stone-900 tracking-tighter mb-8 uppercase">Guia de <span className="text-[#3b82f6]">IMC</span></h2>
        <p className="text-stone-500 max-w-2xl mx-auto font-medium text-xl italic">Entenda sua composição física e saiba como interpretar os resultados para uma vida mais equilibrada.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <div className="bg-white p-10 md:p-16 rounded-[4rem] border-2 border-stone-50 shadow-2xl">
          <div className="space-y-10">
            <div>
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-4 mb-3 block">Peso Atual (KG)</label>
              <input type="number" placeholder="00.0" className="w-full p-6 rounded-[2rem] bg-stone-50 border-2 border-transparent focus:border-blue-500 outline-none text-3xl font-black transition-all" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-4 mb-3 block">Sua Altura (CM)</label>
              <input type="number" placeholder="000" className="w-full p-6 rounded-[2rem] bg-stone-50 border-2 border-transparent focus:border-blue-500 outline-none text-3xl font-black transition-all" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <button onClick={calculateBMI} className="w-full py-8 bg-stone-900 text-white rounded-[2.5rem] font-black uppercase tracking-widest text-sm hover:bg-blue-600 transition-all shadow-xl">Calcular Diagnóstico</button>
          </div>
        </div>

        <div>
          {result ? (
            <div className="animate-fade-in">
              <h3 className="text-[12rem] font-black text-stone-900 leading-none tracking-tighter mb-6">{result.bmi}</h3>
              <div className={`inline-flex items-center gap-4 px-8 py-3 ${result.bg} text-white rounded-2xl mb-8`}>
                <span className="text-[11px] font-black uppercase tracking-widest">{result.category}</span>
              </div>
              <p className="text-stone-600 text-2xl font-medium leading-relaxed italic border-l-4 border-stone-200 pl-8">"{result.description}"</p>
            </div>
          ) : (
            <div className="p-12 border-2 border-dashed border-stone-200 rounded-[4rem] text-center text-stone-300">
              <i className="fa-solid fa-calculator text-6xl mb-6 opacity-20"></i>
              <p className="font-bold uppercase tracking-widest text-xs">Aguardando dados para análise...</p>
            </div>
          )}
        </div>
      </div>

      <AdBanner />

      {/* CONTEÚDO EDITORIAL PARA O ADSENSE */}
      <section className="max-w-4xl mx-auto prose prose-stone prose-lg py-20">
        <h2 className="text-4xl font-black text-stone-900 mb-10 tracking-tight uppercase">O que o IMC realmente diz sobre você?</h2>
        <p className="text-stone-600 text-xl leading-relaxed mb-8">
          O Índice de Massa Corporal (IMC) é um padrão internacional reconhecido pela Organização Mundial da Saúde (OMS). Criado pelo matemático Lambert Quételet no século XIX, ele continua sendo a ferramenta de triagem mais acessível para identificar riscos à saúde relacionados ao peso.
        </p>
        <h3 className="text-2xl font-black text-stone-800 mb-6">Como o cálculo é realizado?</h3>
        <p className="text-stone-600 leading-relaxed mb-8">
          A fórmula é simples: dividimos o seu peso em quilogramas pela sua altura ao quadrado. O resultado nos dá um valor que nos permite classificar o indivíduo em categorias que vão desde a desnutrição até a obesidade mórbida. No entanto, é fundamental entender que o IMC não mede gordura corporal diretamente.
        </p>
        <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100 mb-12">
          <h4 className="text-blue-900 font-black mb-4 uppercase text-sm">Limitações Importantes</h4>
          <p className="text-blue-800/80 mb-0">Atletas, idosos e gestantes podem ter resultados que não refletem sua real condição de saúde. Músculos pesam mais que gordura, o que pode elevar o IMC de uma pessoa extremamente saudável. Por isso, este portal recomenda que este cálculo seja o ponto de partida para uma consulta com um nutricionista ou médico nutrólogo.</p>
        </div>
        <h3 className="text-2xl font-black text-stone-800 mb-6">Consequências do IMC fora da faixa ideal</h3>
        <p className="text-stone-600 leading-relaxed">
          Estudos mostram que indivíduos com IMC acima de 30 têm maior probabilidade de desenvolver resistência à insulina, apneia do sono e desgastes articulares. Por outro lado, um IMC muito baixo pode indicar fragilidade óssea e baixa imunidade. Use esta ferramenta como um guia de autoconhecimento.
        </p>
      </section>

      <AdBanner />
    </div>
  );
};

export default BMICalculator;
