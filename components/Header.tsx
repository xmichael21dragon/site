
import React from 'react';

interface HeaderProps {
  currentView: string;
  setView: (view: any) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'conversor', label: 'Conversor' },
    { id: 'imc', label: 'IMC' },
    { id: 'planner', label: 'Plano Semanal' },
    { id: 'receitas', label: 'Receitas' },
    { id: 'saude', label: 'Saúde' },
  ];

  const handleNavigate = (view: string) => {
    setView(view);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-100 shadow-sm print:hidden">
      {/* CABEÇALHO PRINCIPAL - Otimizado para largura máxima */}
      <div className="max-w-[1440px] mx-auto px-3 md:px-6 lg:px-10">
        <div className="flex items-center h-16 md:h-20 lg:h-24 justify-between gap-2">
          
          {/* LOGO - Tamanho adaptável para economizar espaço */}
          <div 
            className="flex items-center gap-2 md:gap-3 cursor-pointer group flex-shrink-0" 
            onClick={() => handleNavigate('home')}
          >
            <div className="w-9 h-9 md:w-11 lg:w-14 bg-gradient-to-br from-[#2e7d32] to-[#df2a2a] rounded-[12px] md:rounded-[15px] lg:rounded-[20px] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <i className="fa-solid fa-leaf text-base md:text-xl lg:text-2xl"></i>
            </div>
            
            <div className="hidden lg:flex flex-col justify-center select-none">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-[11px] font-[900] text-black tracking-tighter uppercase font-sans">
                  SAÚDE
                </span>
                <span className="text-[11px] font-[900] text-[#df2a2a] tracking-tighter uppercase font-sans">
                  COM
                </span>
              </div>
              <span className="text-[22px] font-[900] tracking-[0.15em] leading-none text-[#2e7d32] font-sans -mt-0.5">
                SABOR
              </span>
            </div>
          </div>

          {/* MENU DE NAVEGAÇÃO - Fonte e Gaps Ajustados para caber tudo */}
          <nav className="flex items-center overflow-x-auto no-scrollbar py-1 gap-1 md:gap-1.5 lg:gap-2 flex-grow justify-center px-2">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-3 md:px-4 lg:px-5 py-2 lg:py-2.5 rounded-xl md:rounded-2xl text-[13px] md:text-[15px] lg:text-[16px] transition-all duration-200 whitespace-nowrap tracking-tight
                  ${currentView === item.id 
                    ? 'text-black bg-[#f4f4f3] font-[800]' 
                    : 'text-[#8c8c8a] font-[700] hover:text-black hover:bg-stone-50'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* BOTÃO SOBRE NÓS - Estilo Cápsula do Print */}
          <div className="flex-shrink-0 ml-1 md:ml-2">
            <button 
              onClick={() => handleNavigate('sobre')}
              className={`px-4 md:px-7 lg:px-9 py-2 md:py-3 lg:py-3.5 rounded-full text-[13px] md:text-[15px] lg:text-[16px] font-[900] tracking-tight transition-all duration-300 whitespace-nowrap
                ${currentView === 'sobre' 
                  ? 'bg-stone-700 text-white' 
                  : 'bg-[#1c1c1c] text-white hover:bg-black hover:shadow-lg shadow-sm'}`}
            >
              Sobre Nós
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
