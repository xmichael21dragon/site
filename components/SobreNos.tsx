
import React from 'react';
import AdBanner from './AdBanner';

const SobreNos: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Section - Identidade Visual Limpa */}
      <section className="bg-stone-900 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-[#2e7d32] to-[#df2a2a] rounded-lg shadow-lg"></div>
            <span className="text-stone-400 text-xs font-black uppercase tracking-[0.4em]">Institucional</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-none">
            Saúde com Sabor: <br/> <span className="text-stone-500 font-serif italic">Quem Somos</span>
          </h1>
          <p className="text-xl text-stone-400 leading-relaxed font-medium max-w-2xl mx-auto italic">
            "Nossa missão é transformar a complexidade da nutrição em hábitos simples, saborosos e acessíveis para todos."
          </p>
        </div>
      </section>

      {/* Primeiro Anúncio - Monetização Estratégica */}
      <AdBanner />

      {/* Conteúdo Principal - Transparência e Verdade */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-stone prose-lg max-w-none space-y-16">
          
          {/* Missão */}
          <div>
            <h2 className="text-3xl font-black text-stone-800 mb-6 flex items-center gap-4">
              <span className="w-1 h-12 bg-green-600 rounded-full"></span>
              Nossa Missão
            </h2>
            <p className="text-stone-600 leading-relaxed text-xl">
              O <strong>Saúde com Sabor</strong> é um portal independente dedicado à divulgação de informações sobre saúde, nutrição e bem-estar. Acreditamos que o conhecimento é a ferramenta mais poderosa para que cada pessoa possa assumir o controle de sua própria qualidade de vida.
            </p>
            <p className="text-stone-600 leading-relaxed text-xl">
              Trabalhamos para desmistificar conceitos de dietas restritivas e apresentar uma visão equilibrada da alimentação funcional, onde a saúde e o prazer de comer caminham juntos.
            </p>
          </div>

          {/* Processo Editorial */}
          <div className="bg-stone-50 p-12 rounded-[3rem] border border-stone-100">
            <h2 className="text-3xl font-black text-stone-800 mb-6">Compromisso com a Verdade</h2>
            <p className="text-stone-600 leading-relaxed font-medium mb-8">
              Para garantir que você receba apenas informações seguras, seguimos um processo rigoroso na criação do nosso conteúdo:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-red-600">
                  <i className="fa-solid fa-check-double"></i>
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 mb-1">Fontes Confiáveis</h4>
                  <p className="text-stone-500 text-sm">Baseamos nossos artigos e receitas em evidências científicas e diretrizes de órgãos de saúde reconhecidos.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-green-600">
                  <i className="fa-solid fa-user-shield"></i>
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 mb-1">Revisão Técnica</h4>
                  <p className="text-stone-500 text-sm">O conteúdo passa por uma curadoria técnica para garantir que a linguagem seja simples, mas tecnicamente correta.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Segundo Anúncio */}
          <AdBanner className="my-16" />

          {/* Independência e Financiamento */}
          <div>
            <h2 className="text-3xl font-black text-stone-800 mb-6 flex items-center gap-4">
              <span className="w-1 h-12 bg-red-600 rounded-full"></span>
              Transparência e Independência
            </h2>
            <p className="text-stone-600 leading-relaxed text-xl">
              O Saúde com Sabor é uma plataforma financiada exclusivamente pela publicidade online. Isso nos permite manter uma estrutura técnica de ponta e uma equipe dedicada sem cobrar assinaturas de nossos leitores.
            </p>
            <p className="text-stone-600 leading-relaxed text-xl">
              Nossa linha editorial é <strong>completamente independente</strong>. A presença de anúncios não influencia o rigor, a imparcialidade ou a escolha dos temas abordados em nossos artigos e guias.
            </p>
          </div>

          {/* Avisos Legais */}
          <div className="pt-16 border-t border-stone-100">
            <div className="bg-red-50 p-10 rounded-[2.5rem] border border-red-100">
              <h2 className="text-xl font-black text-red-800 mb-4 uppercase tracking-wider">Aviso Médico</h2>
              <p className="text-red-900/70 text-sm leading-relaxed mb-0">
                As informações contidas neste site têm caráter meramente informativo e educativo. Elas não substituem o diagnóstico, o tratamento ou o aconselhamento médico individualizado. Cada organismo é único, e recomendações de saúde devem sempre ser validadas por um profissional de saúde presencialmente.
              </p>
            </div>
          </div>

          {/* Nossas Redes Sociais */}
          <div className="text-center pt-10">
            <h3 className="text-xs font-black text-stone-400 uppercase tracking-[0.4em] mb-8">Nossa Comunidade</h3>
            <div className="flex justify-center gap-12">
              {[
                { icon: 'fa-facebook', url: 'https://www.facebook.com/403726932816864' },
                { icon: 'fa-instagram', url: 'https://www.instagram.com/saudecomsaborr1/' },
                { icon: 'fa-pinterest', url: 'https://pin.it/46YdLvZow' }
              ].map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="text-3xl text-stone-300 hover:text-red-600 transition-all transform hover:scale-125">
                  <i className={`fa-brands ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Terceiro Anúncio */}
      <AdBanner />

      {/* Contato Final */}
      <section className="py-24 max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-black text-stone-800 mb-6">Fale Conosco</h2>
        <p className="text-stone-500 mb-10 font-medium">
          Dúvidas, sugestões ou feedbacks sobre nosso conteúdo? Nossa equipe está aberta para ouvir você e melhorar nossa plataforma a cada dia.
        </p>
        <button className="bg-stone-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl active:scale-95">
          Enviar Mensagem
        </button>
      </section>
    </div>
  );
};

export default SobreNos;
