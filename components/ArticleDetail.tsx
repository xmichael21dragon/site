
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
    <div className="max-w-5xl mx-auto px-4 py-16 animate-fade-in">
      <nav className="mb-16 flex items-center gap-5 text-xs font-black uppercase tracking-[0.3em] text-stone-400">
        <button onClick={onBack} className="hover:text-[#3b82f6] transition-colors">Voltar para Saúde</button>
        <i className="fa-solid fa-chevron-right text-[10px] opacity-30"></i>
        <span className="text-stone-300 truncate max-w-[200px]">{article.title}</span>
      </nav>

      <article className="bg-white rounded-[5rem] border border-stone-100 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.1)] overflow-hidden mb-20">
        <header className="h-[550px] relative">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/10 to-transparent flex items-end p-20">
            <div className="max-w-4xl">
              <span className="bg-[#3b82f6] text-white px-7 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-10 inline-block shadow-2xl">
                Guia de Saúde
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
                <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1">Especialista Responsável</p>
                <p className="text-stone-800 font-black text-2xl">{article.author}</p>
              </div>
            </div>
            <div className="h-12 w-[2px] bg-stone-50 hidden md:block"></div>
            <div>
              <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1">Data de Revisão</p>
              <p className="text-stone-800 font-black text-xl">{article.date}</p>
            </div>
          </div>

          <AdBanner className="my-0 mb-20" />

          <div className="prose prose-stone max-w-none">
            {article.content.split('##').map((section, idx) => {
              if (idx === 0) return <p key={idx} className="text-stone-600 text-2xl leading-relaxed mb-12 font-medium">{section}</p>;
              const [title, ...content] = section.split('.');
              return (
                <div key={idx} className="mt-16">
                  <h2 className="text-4xl font-black text-stone-800 mb-8 tracking-tight border-l-8 border-[#3b82f6] pl-10 leading-none uppercase">{title}</h2>
                  <p className="text-stone-600 text-xl leading-relaxed mb-12 font-medium italic">{content.join('.')}</p>
                </div>
              );
            })}
          </div>

          <AdBanner className="my-20" />

          {/* BIO DO AUTOR - CRUCIAL PARA EEAT */}
          <section className="bg-stone-50 p-12 rounded-[4rem] border border-stone-100 flex flex-col md:flex-row gap-12 items-center mb-24">
             <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-4xl text-stone-300 shadow-xl flex-shrink-0 border-4 border-white">
                <i className="fa-solid fa-signature"></i>
             </div>
             <div>
                <h4 className="text-2xl font-black text-stone-800 mb-4 uppercase tracking-tighter">Sobre o Autor: {article.author}</h4>
                <p className="text-stone-500 font-medium italic leading-relaxed">Este conteúdo foi redigido e revisado tecnicamente por um especialista em nutrição ou saúde integrativa. Nosso objetivo é fornecer informações baseadas em evidências científicas para auxiliar sua jornada de bem-estar. Lembre-se: este guia não substitui uma consulta médica presencial.</p>
             </div>
          </section>

          <CommentSection contentId={article.id} type="article" />
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
