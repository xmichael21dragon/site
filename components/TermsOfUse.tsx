
import React from 'react';
import AdBanner from './AdBanner';

interface TermsOfUseProps {
  onBack: () => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <button 
        onClick={onBack} 
        className="mb-8 flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-all font-black text-xs uppercase tracking-widest"
      >
        <i className="fa-solid fa-arrow-left"></i> Voltar ao Início
      </button>

      <div className="bg-white rounded-[3rem] p-8 md:p-20 shadow-2xl border border-stone-100 mb-12">
        <header className="mb-16 text-center">
          <span className="text-red-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Jurídico & Transparência</span>
          <h1 className="text-5xl md:text-6xl font-black text-stone-800 tracking-tighter leading-none mb-6">Termos de Uso</h1>
          <p className="text-stone-400 font-medium italic">Leia com atenção os princípios e condutas legais do Saúde com Sabor.</p>
        </header>

        <div className="space-y-12">
          {/* Introdução */}
          <section className="prose prose-stone prose-lg max-w-none">
            <p className="text-stone-600 leading-relaxed text-xl">
              O <strong>Saúde com Sabor</strong> disponibiliza informações de caráter educativo sobre saúde, nutrição e bem-estar em uma linguagem acessível e simples, destinada ao público leigo.
            </p>
            <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 my-8">
              <h3 className="text-red-800 font-black text-lg mb-2 flex items-center gap-2">
                <i className="fa-solid fa-triangle-exclamation"></i> Aviso Importante
              </h3>
              <p className="text-red-900 font-medium leading-relaxed m-0">
                O conteúdo deste site não substitui, em qualquer momento, o diagnóstico, tratamento ou aconselhamento médico profissional.
              </p>
            </div>
          </section>

          {/* Autoridade */}
          <section>
            <h2 className="text-2xl font-black text-stone-800 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-green-600 rounded-full"></span>
              Autoridade
            </h2>
            <p className="text-stone-600 leading-relaxed">
              As informações publicadas no site são elaboradas e revisadas exclusivamente por profissionais de saúde qualificados. Nos comprometemos a publicar informações baseadas em fontes seguras e evidências científicas atualizadas.
            </p>
          </section>

          <AdBanner />

          {/* Propósito */}
          <section>
            <h2 className="text-2xl font-black text-stone-800 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-red-600 rounded-full"></span>
              Propósito do Website
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Nosso principal objetivo é informar o público sobre nutrição funcional, terapias convencionais, tratamentos alternativos e hábitos de vida saudáveis. Buscamos democratizar o conhecimento técnico para que nossos leitores possam ter mais autonomia sobre sua saúde.
            </p>
          </section>

          {/* Confidencialidade */}
          <section>
            <h2 className="text-2xl font-black text-stone-800 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-stone-800 rounded-full"></span>
              Confidencialidade
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Qualquer informação recolhida pelo Saúde com Sabor, como endereços de e-mail em newsletters, nunca será repassada, cedida ou vendida a terceiros, exceto quando requerido por lei. A privacidade dos nossos usuários é uma prioridade absoluta.
            </p>
          </section>

          <AdBanner />

          {/* Fonte de Financiamento */}
          <section className="bg-stone-50 p-10 rounded-[2.5rem] border border-stone-100">
            <h2 className="text-2xl font-black text-stone-800 mb-4">Fonte de Financiamento</h2>
            <p className="text-stone-600 leading-relaxed mb-0">
              Este website é exclusivamente financiado pela renda proveniente da publicidade online. Esses anúncios permitem que mantenhamos uma equipe editorial qualificada, atualizações técnicas constantes e o acesso totalmente gratuito para todos os nossos leitores.
            </p>
          </section>

          {/* Honestidade Publicitária */}
          <section>
            <h2 className="text-2xl font-black text-stone-800 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-600 rounded-full"></span>
              Política Publicitária e Editorial
            </h2>
            <p className="text-stone-600 leading-relaxed">
              O Saúde com Sabor exibe anúncios identificados claramente como "Publicidade" ou "Anúncios Google". É fundamental destacar que nosso <strong>conteúdo editorial é livre de qualquer influência comercial</strong>. Não toleramos nenhuma relação tendenciosa entre a informação técnica e a publicidade exibida.
            </p>
          </section>
        </div>

        <footer className="mt-20 pt-12 border-t border-stone-100 text-center">
          <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">
            Última atualização: Junho de 2024
          </p>
        </footer>
      </div>

      <AdBanner />
    </div>
  );
};

export default TermsOfUse;
