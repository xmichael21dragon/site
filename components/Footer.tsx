
import React from 'react';

interface FooterProps {
  onEditorClick?: () => void;
  onTermsClick?: () => void;
  onViewChange?: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onEditorClick, onTermsClick, onViewChange }) => {
  return (
    <footer className="bg-white border-t border-stone-100 pt-16 pb-8 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2e7d32] to-[#df2a2a] rounded-xl flex items-center justify-center text-white shadow-md">
                <i className="fa-solid fa-leaf text-xl"></i>
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-black tracking-tighter leading-none text-stone-800 uppercase">
                  Saúde <span className="text-[#df2a2a]">Com</span>
                </h2>
                <span className="text-md font-black tracking-[0.2em] leading-none text-[#2e7d32]">SABOR</span>
              </div>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">
              Sua plataforma completa para uma vida mais saudável e saborosa através da culinária consciente e informação de qualidade.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/saudecomsaborr1/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-[#df2a2a] hover:text-white transition-all shadow-sm"
              >
                <i className="fa-brands fa-instagram text-lg"></i>
              </a>
              <a 
                href="https://www.facebook.com/403726932816864?ref=_xav_ig_profile_page_web" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-[#2e7d32] hover:text-white transition-all shadow-sm"
              >
                <i className="fa-brands fa-facebook-f text-lg"></i>
              </a>
              <a 
                href="https://pin.it/46YdLvZow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-[#df2a2a] hover:text-white transition-all shadow-sm"
              >
                <i className="fa-brands fa-pinterest-p text-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 mb-6 uppercase tracking-wider text-xs">Conteúdo</h4>
            <ul className="space-y-3 text-sm text-stone-500 font-medium">
              <li><button onClick={() => onViewChange?.('receitas')} className="hover:text-[#df2a2a] transition-colors">Receitas Saudáveis</button></li>
              <li><button onClick={() => onViewChange?.('saude')} className="hover:text-[#2e7d32] transition-colors">Artigos de Saúde</button></li>
              <li><button onClick={() => onViewChange?.('sobre')} className="hover:text-stone-800 transition-colors">Sobre Nós</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 mb-6 uppercase tracking-wider text-xs">Ferramentas</h4>
            <ul className="space-y-3 text-sm text-stone-500 font-medium">
              <li><button onClick={() => onViewChange?.('conversor')} className="hover:text-blue-600 transition-colors">Conversor de Medidas</button></li>
              <li><button onClick={() => onViewChange?.('imc')} className="hover:text-green-700 transition-colors">Calculadora IMC</button></li>
              <li><button onClick={() => onViewChange?.('planner')} className="hover:text-orange-600 transition-colors">Plano Semanal</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-100">
          <div className="bg-[#f1f8e9] p-6 rounded-3xl mb-8 border border-[#c8e6c9]">
            <p className="text-[10px] text-[#2e7d32] text-center uppercase font-bold tracking-[0.2em] mb-2">Aviso de Saúde</p>
            <p className="text-xs text-stone-600 text-center leading-relaxed font-medium">
              As informações contidas neste site são para fins educativos e não substituem o aconselhamento médico profissional. 
              Siga nosso trabalho no <a href="https://www.facebook.com/403726932816864" target="_blank" className="text-blue-700 font-bold">Facebook</a>, <a href="https://www.instagram.com/saudecomsaborr1/" target="_blank" className="text-[#df2a2a] font-bold">Instagram</a> e <a href="https://pin.it/46YdLvZow" target="_blank" className="text-red-800 font-bold">Pinterest</a>.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-semibold">
            <p>© 2024 SAÚDE COM SABOR. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6">
              <button onClick={onTermsClick} className="hover:text-stone-600 transition-colors">Termos de Uso</button>
              <button onClick={() => onViewChange?.('privacidade')} className="hover:text-stone-600 transition-colors">Privacidade</button>
              <button 
                onClick={onEditorClick}
                title="Área do Autor"
                className="text-stone-300 hover:text-stone-500 transition-colors ml-2"
              >
                <i className="fa-solid fa-gear text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
