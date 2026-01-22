
import React from 'react';
import AdBanner from './AdBanner';
import Logo from './Logo';

const SobreNos: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-24">
      <section className="bg-stone-900 pt-32 pb-24 px-4 text-center text-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-3xl p-4 mb-10 shadow-2xl">
            <Logo />
          </div>
          <span className="text-stone-400 text-xs font-black uppercase tracking-[0.5em] mb-6 block">Nossa Instituição</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-none uppercase">
            Saúde <span className="text-[#3b82f6]">com</span> <span className="text-[#ef4444]">Sabor</span>
          </h1>
          <p className="text-2xl text-stone-400 leading-relaxed font-medium max-w-2xl italic">
            "Sua fonte de autoridade em nutrição funcional e gastronomia baseada em evidências."
          </p>
        </div>
      </section>

      <AdBanner />

      <section className="max-w-5xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-16">
            <div className="prose prose-stone prose-xl max-w-none">
              <h2 className="text-4xl font-black text-stone-800 mb-8 border-l-8 border-[#ef4444] pl-8 uppercase tracking-tighter">Nossa Missão</h2>
              <p className="text-stone-600 leading-relaxed">
                O portal <strong>Saúde com Sabor</strong> foi fundado em 2024 com um propósito claro: democratizar o acesso à nutrição de qualidade. Entendemos que o excesso de informações contraditórias na internet gera confusão no consumidor. Nosso papel é filtrar o que há de mais recente na ciência e transformar em guias práticos e receitas deliciosas.
              </p>
              <p className="text-stone-600 leading-relaxed mt-6">
                Diferente de blogs amadores, cada conteúdo publicado aqui passa por um crivo técnico rigoroso. Nossas receitas não são apenas "gostosas", elas são funcionais, projetadas para otimizar sua saúde celular e metabólica.
              </p>
            </div>

            <div className="bg-stone-50 p-12 rounded-[4rem] border border-stone-100">
              <h3 className="text-3xl font-black text-stone-900 mb-8 uppercase tracking-tighter">Princípios Editoriais (E-E-A-T)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-black text-red-600 uppercase text-xs tracking-widest">Experiência</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">Conteúdo escrito por quem vive a gastronomia e a nutrição no dia a dia.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-blue-600 uppercase text-xs tracking-widest">Autoridade</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">Fontes baseadas em estudos científicos publicados e referenciados.</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-10">
            <div className="bg-stone-900 text-white p-10 rounded-[3rem] shadow-2xl">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter text-[#3b82f6]">Transparência Financeira</h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-0">
                Este portal é mantido através de publicidade contextual (Google AdSense). Esta receita nos permite manter uma equipe técnica qualificada e oferecer acesso gratuito a ferramentas de saúde para milhares de pessoas mensalmente.
              </p>
            </div>
            <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
              <h3 className="text-2xl font-black text-emerald-900 mb-4 uppercase tracking-tighter">Revisão Médica</h3>
              <p className="text-emerald-800/70 text-sm leading-relaxed mb-0 font-medium">
                Todo o conteúdo de caráter medicinal ou nutricional é revisado para garantir que não haja promessas falsas de cura ou informações perigosas.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <AdBanner />
    </div>
  );
};

export default SobreNos;
