
import React, { useState, useEffect } from 'react';

interface CookieBannerProps {
  onViewPrivacy: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onViewPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[9999] animate-fade-in">
      <div className="max-w-5xl mx-auto bg-stone-900/98 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6 text-center md:text-left">
          <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center text-[#3b82f6] text-3xl flex-shrink-0">
            <i className="fa-solid fa-shield-check"></i>
          </div>
          <div>
            <h4 className="text-white font-black text-lg uppercase tracking-widest mb-2">Sua Privacidade é Nossa Prioridade</h4>
            <p className="text-stone-400 text-sm leading-relaxed max-w-2xl font-medium">
              Utilizamos tecnologias como cookies para armazenar informações e processar dados de navegação para fins de publicidade personalizada. Para saber mais sobre como nosso parceiro Google processa seus dados, acesse: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-white font-black underline hover:text-[#3b82f6]">Como o Google utiliza dados</a>. Ao continuar, você aceita nossa <button onClick={onViewPrivacy} className="text-white underline font-black">Política de Privacidade</button>.
            </p>
          </div>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={acceptCookies}
            className="flex-1 md:flex-none px-12 py-5 bg-white text-stone-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#3b82f6] hover:text-white transition-all shadow-xl active:scale-95"
          >
            Aceitar e Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
