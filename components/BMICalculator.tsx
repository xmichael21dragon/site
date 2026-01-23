
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
        description = 'Seu índice indica que você está abaixo do peso ideal. É recomendada uma avaliação nutricional para descartar carências de micronutrientes ou problemas de absorção intestinal.';
        position = 15;
      } else if (bmi < 24.9) {
        category = 'Peso normal';
        color = 'text-emerald-600';
        bg = 'bg-emerald-600';
        description = 'Resultado excelente! Você está na faixa de peso considerada saudável pela Organização Mundial da Saúde (OMS). Mantenha seus hábitos de alimentação funcional.';
        position = 40;
      } else if (bmi < 29.9) {
        category = 'Sobrepeso';
        color = 'text-orange-600';
        bg = 'bg-orange-600';
        description = 'Atenção. O sobrepeso pode ser o prelúdio de uma síndrome metabólica. Pequenos ajustes na ingestão de açúcares refinados podem fazer grande diferença a longo prazo.';
        position = 65;
      } else {
        category = 'Obesidade';
        color = 'text-red-600';
        bg = 'bg-red-600';
        description = 'Este quadro requer acompanhamento multidisciplinar. A obesidade é uma doença inflamatória crônica que aumenta significativamente riscos cardiovasculares e diabetes.';
        position = 90;
      }

      setResult({ bmi, category, color, bg, description, position });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 animate-fade-in">
      <div className="text-center mb-16">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-4 block">Educação e Ciência Antropométrica</span>
        <h1 className="text-5xl md:text-7xl font-black text-stone-900 tracking-tighter mb-8 uppercase">Guia de Composição <span className="text-[#3b82f6]">Corporal e IMC</span></h1>
        <p className="text-stone-500 max-w-2xl mx-auto font-medium text-xl italic leading-relaxed">A avaliação do seu peso é o primeiro passo para um planejamento nutricional assertivo. Entenda os parâmetros globais de saúde metabólica abaixo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
        <div className="bg-white p-10 md:p-16 rounded-[4rem] border-2 border-stone-50 shadow-2xl sticky top-32">
          <div className="space-y-10">
            <div>
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-4 mb-3 block">Peso Corporal Atual (KG)</label>
              <input type="number" placeholder="Ex: 75.5" className="w-full p-6 rounded-[2rem] bg-stone-50 border-2 border-transparent focus:border-blue-500 outline-none text-3xl font-black transition-all" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-4 mb-3 block">Sua Altura Exata (CM)</label>
              <input type="number" placeholder="Ex: 175" className="w-full p-6 rounded-[2rem] bg-stone-50 border-2 border-transparent focus:border-blue-500 outline-none text-3xl font-black transition-all" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <button onClick={calculateBMI} className="w-full py-8 bg-stone-900 text-white rounded-[2.5rem] font-black uppercase tracking-widest text-sm hover:bg-blue-600 transition-all shadow-xl active:scale-95">Gerar Diagnóstico Nutricional</button>
          </div>
        </div>

        <div className="lg:pt-10">
          {result ? (
            <div className="animate-fade-in space-y-8">
              <div className="flex flex-col">
                <span className="text-stone-400 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Seu Índice de Massa Corporal</span>
                <h3 className="text-[10rem] md:text-[14rem] font-black text-stone-900 leading-none tracking-tighter">{result.bmi}</h3>
              </div>
              <div className={`inline-flex items-center gap-4 px-8 py-4 ${result.bg} text-white rounded-2xl shadow-xl`}>
                <i className="fa-solid fa-circle-check"></i>
                <span className="text-[12px] font-black uppercase tracking-widest">{result.category}</span>
              </div>
              <div className="bg-stone-50 p-10 rounded-[3rem] border border-stone-100">
                <p className="text-stone-700 text-2xl font-medium leading-relaxed italic">
                  "{result.description}"
                </p>
              </div>
            </div>
          ) : (
            <div className="p-16 border-4 border-dashed border-stone-100 rounded-[5rem] text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center text-stone-200 text-4xl mb-8">
                <i className="fa-solid fa-calculator"></i>
              </div>
              <h4 className="text-stone-300 font-black uppercase tracking-[0.2em] text-sm">Aguardando dados de entrada...</h4>
              <p className="text-stone-200 mt-4 max-w-xs text-sm italic font-medium leading-relaxed">Insira seus dados antropométricos para que nossa equipe editorial possa fornecer o contexto adequado ao seu resultado.</p>
            </div>
          )}
        </div>
      </div>

      <AdBanner />

      <section className="max-w-5xl mx-auto py-24 border-t border-stone-100">
        <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-12 tracking-tight uppercase">Entenda a Importância do IMC</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-stone-600 leading-relaxed text-lg font-medium">
          <div className="space-y-8">
            <p>
              O <strong>Índice de Massa Corporal (IMC)</strong> é um padrão internacional reconhecido pela Organização Mundial da Saúde (OMS). Ele é utilizado como uma ferramenta primária de triagem para identificar riscos à saúde relacionados ao peso corporal em adultos.
            </p>
            <h3 className="text-2xl font-black text-stone-800 uppercase tracking-tighter border-b-4 border-blue-100 pb-2 inline-block">As Classes de Diagnóstico</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4"><i className="fa-solid fa-check text-blue-500 mt-1"></i> <strong>Abaixo de 18.5:</strong> Pode indicar carências nutricionais ou problemas de imunidade.</li>
              <li className="flex items-start gap-4"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> <strong>18.5 a 24.9:</strong> O intervalo de peso saudável com menor incidência de doenças.</li>
              <li className="flex items-start gap-4"><i className="fa-solid fa-check text-orange-500 mt-1"></i> <strong>25.0 a 29.9:</strong> Pré-obesidade ou sobrepeso, sinal de alerta cardiovascular.</li>
              <li className="flex items-start gap-4"><i className="fa-solid fa-check text-red-500 mt-1"></i> <strong>Acima de 30.0:</strong> Diferentes níveis de obesidade, requerem intervenção clínica.</li>
            </ul>
          </div>
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-stone-800 uppercase tracking-tighter border-b-4 border-blue-100 pb-2 inline-block">Limitações Necessárias</h3>
            <p>
              Embora o IMC seja um excelente guia populacional, ele não diferencia <strong>massa magra (músculos)</strong> de <strong>massa gorda (gordura)</strong>. Indivíduos muito ativos fisicamente podem ter um IMC elevado sem possuírem excesso de gordura corporal perigosa.
            </p>
            <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
               <h4 className="text-blue-900 font-black mb-4 uppercase text-xs tracking-widest">Revisão Editorial</h4>
               <p className="text-blue-800/70 text-base leading-relaxed italic">
                 "O IMC é apenas um dos pilares. Para uma visão completa da sua saúde metabólica, você deve medir também sua circunferência abdominal. Em homens, acima de 102cm e em mulheres acima de 88cm, o risco de infarto aumenta consideravelmente."
               </p>
            </div>
            <p>
              Lembre-se: nenhum algoritmo substitui a consulta presencial com um nutricionista ou médico nutrólogo para a realização de dobras cutâneas ou bioimpedância.
            </p>
          </div>
        </div>
      </section>

      <AdBanner />
    </div>
  );
};

export default BMICalculator;
