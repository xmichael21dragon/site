
import React from 'react';
import { Article } from '../types';
import AdBanner from './AdBanner';
import CommentSection from './CommentSection';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <nav className="mb-16 flex items-center gap-5 text-xs font-black uppercase tracking-[0.3em] text-stone-400">
        <button onClick={onBack} className="hover:text-emerald-600 transition-colors">Início</button>
        <i className="fa-solid fa-chevron-right text-[10px] opacity-30"></i>
        <button onClick={onBack} className="hover:text-emerald-600 transition-colors">Saúde</button>
        <i className="fa-solid fa-chevron-right text-[10px] opacity-30"></i>
        <span className="text-stone-300 truncate max-w-[200px]">{article.title}</span>
      </nav>

      <article className="bg-white rounded-[5rem] border border-stone-100 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.1)] overflow-hidden mb-20">
        <header className="h-[650px] relative">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/10 to-transparent flex items-end p-20">
            <div className="max-w-4xl">
              <span className="bg-emerald-600 text-white px-7 py-2.5 rounded-2xl text-xs font-black uppercase tracking-[0.3em] mb-10 inline-block shadow-2xl">
                {article.category}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-xl">
                {article.title}
              </h1>
            </div>
          </div>
        </header>

        <div className="p-10 md:p-24">
          <div className="flex flex-wrap items-center gap-10 mb-20 pb-16 border-b border-stone-100">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-stone-900 text-white flex items-center justify-center text-2xl shadow-xl">
                <i className="fa-solid fa-user-doctor"></i>
              </div>
              <div>
                <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1">Especialista</p>
                <p className="text-stone-800 font-black text-2xl">{article.author}</p>
              </div>
            </div>
            <div className="h-12 w-[2px] bg-stone-50 hidden md:block"></div>
            <div>
              <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1">Publicado em</p>
              <p className="text-stone-800 font-black text-xl">{article.date}</p>
            </div>
          </div>

          <AdBanner className="my-0 mb-20" />

          <div className="prose prose-stone max-w-none">
            {article.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.trim().startsWith('##')) {
                return <h2 key={idx} className="text-4xl md:text-5xl font-black text-stone-800 mt-24 mb-12 tracking-tight border-l-8 border-emerald-500 pl-10 leading-none">{paragraph.replace('## ', '')}</h2>;
              }
              return <p key={idx} className="text-stone-600 text-2xl leading-relaxed mb-12 font-medium">{paragraph}</p>;
            })}
          </div>

          <CommentSection contentId={article.id} type="article" />

          <AdBanner className="my-20" />

          <footer className="mt-20 pt-16 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-6">
              <span className="text-sm font-black text-stone-400 uppercase tracking-[0.3em] flex items-center">Compartilhar:</span>
              <button className="w-16 h-16 rounded-[1.5rem] bg-stone-50 text-stone-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                <i className="fa-brands fa-whatsapp text-2xl"></i>
              </button>
            </div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-emerald-600 font-black flex items-center gap-4 hover:gap-8 transition-all uppercase tracking-[0.4em] text-xs">
              Voltar ao Topo <i className="fa-solid fa-arrow-up text-lg"></i>
            </button>
          </footer>
        </div>
      </article>
      <AdBanner />
    </div>
  );
};

export default ArticleDetail;
