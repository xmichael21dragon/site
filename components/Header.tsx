
import React from 'react';

interface HeaderProps {
  currentView: string;
  setView: (view: any) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, searchQuery, setSearchQuery }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-100 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-[#2e7d32] to-[#df2a2a] rounded-xl flex items-center justify-center text-white shadow-md transform -rotate-3 group-hover:rotate-0 transition-transform">
              <i className="fa-solid fa-leaf text-xl"></i>
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className="text-sm font-black tracking-tighter leading-none text-stone-800">SAÚDE <span className="text-red-600">COM</span></h1>
              <span className="text-md font-black tracking-[0.2em] leading-none text-green-700 uppercase">SABOR</span>
            </div>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={() => setView('home')}
              className={`px-3 py-2 rounded-lg text-lg font-bold transition-all ${currentView === 'home' ? 'bg-stone-100 text-stone-900' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              Início
            </button>
            <button 
              onClick={() => setView('conversor')}
              className={`px-3 py-2 rounded-lg text-lg font-bold transition-all ${currentView === 'conversor' ? 'bg-blue-50 text-blue-600' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              Conversor
            </button>
            <button 
              onClick={() => setView('imc')}
              className={`px-3 py-2 rounded-lg text-lg font-bold transition-all ${currentView === 'imc' ? 'bg-green-50 text-green-700' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              IMC
            </button>
            <button 
              onClick={() => setView('planner')}
              className={`px-3 py-2 rounded-lg text-lg font-bold transition-all ${currentView === 'planner' ? 'bg-orange-50 text-orange-600' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              Planejador
            </button>
            <button 
              onClick={() => setView('receitas')}
              className={`px-3 py-2 rounded-lg text-lg font-bold transition-all ${currentView === 'receitas' || currentView === 'recipe' ? 'bg-red-50 text-red-600' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              Receitas
            </button>
            <button 
              onClick={() => setView('saude')}
              className={`px-3 py-2 rounded-lg text-lg font-bold transition-all ${currentView === 'saude' ? 'bg-emerald-50 text-emerald-600' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              Saúde
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
