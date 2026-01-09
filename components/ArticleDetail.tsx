
import React from 'react';
import { Article } from '../types';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [article.image],
    "datePublished": "2024-06-10T08:00:00+08:00",
    "author": [{
      "@type": "Person",
      "name": article.author
    }]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <nav className="mb-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-stone-400">
        <button onClick={onBack} className="hover:text-emerald-600 transition-colors">Início</button>
        <i className="fa-solid fa-chevron-right text-[8px]"></i>
        <button onClick={onBack} className="hover:text-emerald-600 transition-colors">Saúde</button>
        <i className="fa-solid fa-chevron-right text-[8px]"></i>
        <span className="text-stone-300 truncate max-w-[150px]">{article.title}</span>
      </nav>

      <article className="bg-white rounded-[4rem] border border-stone-100 shadow-2xl overflow-hidden" itemScope itemType="https://schema.org/Article">
        <header className="h-[500px] relative">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" itemProp="image" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent flex items-end p-16">
            <div className="max-w-3xl">
              <span className="bg-emerald-600 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block shadow-xl">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter" itemProp="headline">
                {article.title}
              </h1>
            </div>
          </div>
        </header>

        <div className="p-16">
          <div className="flex flex-wrap items-center gap-8 mb-16 pb-12 border-b border-stone-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-stone-900 text-white flex items-center justify-center text-xl shadow-xl">
                <i className="fa-solid fa-user-ninja"></i>
              </div>
              <div>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Especialista</p>
                <p className="text-stone-800 font-black text-lg" itemProp="author">{article.author}</p>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-stone-100 hidden md:block"></div>
            <div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Postado em</p>
              <p className="text-stone-800 font-black" itemProp="datePublished">{article.date}</p>
            </div>
            <div className="h-10 w-[1px] bg-stone-100 hidden md:block"></div>
            <div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Tempo de Estudo</p>
              <p className="text-stone-800 font-black">{article.readTime}</p>
            </div>
          </div>

          <div className="prose prose-stone max-w-none" itemProp="articleBody">
            {article.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.trim().startsWith('##')) {
                return <h2 key={idx} className="text-3xl font-black text-stone-800 mt-16 mb-8 tracking-tight border-l-4 border-emerald-500 pl-6">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.trim().startsWith('###')) {
                return <h3 key={idx} className="text-2xl font-black text-stone-700 mt-10 mb-6">{paragraph.replace('### ', '')}</h3>;
              }
              return <p key={idx} className="text-stone-600 text-xl leading-relaxed mb-8 font-medium">{paragraph}</p>;
            })}
          </div>

          {/* AdSense Interno simulado */}
          <div className="my-16 p-12 bg-emerald-50/50 border-2 border-dashed border-emerald-100 rounded-[3rem] text-center">
            <p className="text-emerald-800/40 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Espaço para AdSense</p>
            <p className="text-emerald-800/20 text-xs">Publicidade relevante para sua saúde</p>
          </div>

          <footer className="mt-24 pt-16 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex gap-4">
              <span className="text-xs font-black text-stone-400 uppercase tracking-widest mr-2 flex items-center">Compartilhar:</span>
              <button className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm hover:shadow-xl active:scale-90">
                <i className="fa-brands fa-facebook-f text-xl"></i>
              </button>
              <button className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm hover:shadow-xl active:scale-90">
                <i className="fa-brands fa-whatsapp text-xl"></i>
              </button>
              <button className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm hover:shadow-xl active:scale-90">
                <i className="fa-brands fa-pinterest-p text-xl"></i>
              </button>
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-emerald-600 font-black flex items-center gap-3 hover:gap-5 transition-all uppercase tracking-widest text-[10px]"
            >
              Subir ao Topo <i className="fa-solid fa-arrow-up"></i>
            </button>
          </footer>
        </div>
      </article>

      <section className="mt-24">
        <h4 className="text-2xl font-black text-stone-800 mb-8 tracking-tight">Continue Aprendendo</h4>
        <div className="bg-white p-10 rounded-[3rem] border border-stone-100 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
            <i className="fa-solid fa-envelope-open-text"></i>
          </div>
          <h5 className="text-xl font-bold mb-4">Newsletter Saúde com Sabor</h5>
          <p className="text-stone-500 mb-8 max-w-md">Inscreva-se para receber novos artigos e receitas exclusivas diretamente no seu e-mail.</p>
          <div className="w-full max-w-md flex gap-2">
            <input type="email" placeholder="Seu e-mail principal" className="flex-grow bg-stone-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none font-medium" />
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg active:scale-95">Ok</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;
