
import React from 'react';
import AdBanner from './AdBanner';

const SobreNos: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-24">
      <section className="bg-stone-900 pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-stone-400 text-xs font-black uppercase tracking-[0.4em] mb-6 block">Nossa Instituição</span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-none uppercase">
            Saúde com Sabor: <br/> <span className="text-[#ef4444] font-serif italic">Integridade Editorial</span>
          </h1>
          <p className="text-xl text-stone-400 leading-relaxed font-medium max-w-2xl mx-auto italic">
            "Comprometidos com a ciência da nutrição e a arte da gastronomia consciente."
          </p>
        </div>
      </section>

      <AdBanner />

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-16">
          <div className="prose prose-stone prose-lg max-w-none">
            <h2 className="text-3xl font-black text-stone-800 mb-6 border-l-4 border-[#ef4444] pl-6 uppercase">Quem Somos</h2>
            <p className="text-stone-600 leading-relaxed text-xl">
              O portal <strong>Saúde com Sabor</strong> surgiu da necessidade de um espaço digital que unisse rigor científico com o prazer sensorial de comer. Somos uma equipe multidisciplinar formada por nutricionistas, médicos, chefs de cozinha e jornalistas especializados em saúde.
            </p>
            <p className="text-stone-600 leading-relaxed text-lg mt-4">
              Nossa missão é combater a desinformação alimentar, fornecendo guias práticos e receitas testadas que promovem longevidade e vitalidade. Acreditamos que a saúde começa na escolha consciente de cada ingrediente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-stone-50 p-10 rounded-[3rem] border border-stone-100">
              <h3 className="text-2xl font-black text-stone-800 mb-4 uppercase tracking-tighter">Nossos Valores</h3>
              <ul className="space-y-4 text-stone-500 font-bold text-sm">
                <li className="flex items-center gap-3"><i className="fa-solid fa-check text-emerald-500"></i> Isenção e Ética Editorial</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-check text-emerald-500"></i> Embasamento em Evidências</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-check text-emerald-500"></i> Acessibilidade da Informação</li>
              </ul>
            </div>
            <div className="bg-stone-900 p-10 rounded-[3rem] text-white">
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter text-[#3b82f6]">Transparência</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Este site é mantido através de publicidade contextual. No entanto, mantemos uma separação rigorosa entre nosso conteúdo editorial e as parcerias comerciais. Anúncios não influenciam nossas recomendações de saúde.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SobreNos;
