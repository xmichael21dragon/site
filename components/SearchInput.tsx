
import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  transparent?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder, transparent = false }) => {
  return (
    <div className="relative w-full max-w-3xl group mx-auto perspective-1000">
      {/* Efeito de Brilho de Fundo ao focar */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#2e7d32]/20 via-[#df2a2a]/10 to-[#2e7d32]/20 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative flex items-center">
        <div className="absolute left-7 flex items-center justify-center pointer-events-none">
          <i className={`fa-solid fa-magnifying-glass text-xl transition-all duration-300 ${value ? 'text-[#2e7d32] scale-110' : 'text-stone-300 group-focus-within:text-[#2e7d32]'}`}></i>
        </div>

        <input 
          type="text" 
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full py-7 pl-16 pr-16 text-xl font-bold rounded-[2.2rem] outline-none transition-all duration-500
            ${transparent 
              ? 'bg-white/90 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.15)] focus:bg-white focus:shadow-[0_25px_60px_rgba(0,0,0,0.25)]' 
              : 'bg-white border-2 border-stone-100 shadow-sm focus:border-[#2e7d32]/30 focus:shadow-2xl'
            }
            placeholder:text-stone-300 text-stone-800 tracking-tight
          `}
        />

        {/* Botão de Limpar (Clear) */}
        {value && (
          <button 
            onClick={() => onChange('')}
            className="absolute right-6 w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 text-stone-400 hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      {/* Tag Indicadora de Pesquisa Ativa */}
      <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 transition-all duration-500 pointer-events-none ${value ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#2e7d32] bg-[#2e7d32]/10 px-4 py-1.5 rounded-full border border-[#2e7d32]/20">
          Filtrando resultados...
        </span>
      </div>
    </div>
  );
};

export default SearchInput;
