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
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group flex-shrink-0" onClick={() => { setView('home'); setSearchQuery(''); }}>
            <div className="w-10 h-10 bg-gradient-to-br from-[#2e7d32] to-[#df2a2a] rounded-xl flex items-center justify-center text-white shadow-md transform -rotate-3 group-hover:rotate-0 transition-transform">
              <i className="fa-solid fa-leaf text-xl"></i>
            </div>
            <div className="hidden lg:flex flex-col">
              <h1 className="text-sm font-black tracking-tighter leading-none text-stone-800">SAÚDE <span className="text-red-600">COM</span></h1>
              <span className="text-md font-black tracking-[0.2em] leading-none text-green-700 uppercase">SABOR</span>
            </div>
          </div>

          {/* Barra de Busca Minimalista (Desktop/Tablet) */}
          <div className="flex-grow max-w-md relative group hidden md:block">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-red-500 transition-colors pointer-events-none">
              <i className="fa-solid fa-magnifying-glass text-sm"></i>
            </div>
            <input 
              type="text"
              placeholder="Pesquisar receitas, artigos..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // Forçar volta para home ou categorias de conteúdo para ver os resultados
                if (currentView !== 'home' && currentView !== 'receitas' && currentView !== 'saude') {
                  setView('home');
                }
              }}
              className="w-full bg-stone-50 border-none rounded-2xl py-2.5 pl-11 pr-10 text-sm font-medium text-stone-700 placeholder:text-stone-300 focus:ring-2 focus:ring-red-100 focus:bg-white transition-all outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-red-500 transition-colors"
                title="Limpar busca"
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            )}
          </div>

          {/* Navegação */}
          <nav className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => { setView('home'); setSearchQuery(''); }}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${currentView === 'home' && !searchQuery ? 'bg-stone-100 text-stone-900' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              Início
            </button>
            <button 
              onClick={() => setView('conversor')}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${currentView === 'conversor' ? 'bg-blue-50 text-blue-600' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              Conversor
            </button>
            <button 
              onClick={() => setView('imc')}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${currentView === 'imc' ? 'bg-green-50 text-green-700' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              IMC
            </button>
            <button 
              onClick={() => setView('planner')}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${currentView === 'planner' ? 'bg-orange-50 text-orange-600' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              Plano Semanal
            </button>
            <button 
              onClick={() => setView('receitas')}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${currentView === 'receitas' || currentView === 'recipe' ? 'bg-red-50 text-red-600' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              Receitas
            </button>
            <button 
              onClick={() => setView('saude')}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${currentView === 'saude' || currentView === 'article' ? 'bg-emerald-50 text-emerald-600' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              Saúde
            </button>
          </nav>
        </div>

        {/* Barra de Busca Mobile (Aparece apenas em telas pequenas) */}
        <div className="pb-4 md:hidden">
          <div className="relative group">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-stone-300"></i>
            <input 
              type="text"
              placeholder="Buscar receitas..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'home' && currentView !== 'receitas' && currentView !== 'saude') {
                  setView('home');
                }
              }}
              className="w-full bg-stone-50 border-none rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-red-100 outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;