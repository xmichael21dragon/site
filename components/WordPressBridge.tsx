
import React, { useState } from 'react';

const WordPressBridge: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wp' | 'vercel' | 'code'>('wp');

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-stone-100">
        
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="w-20 h-20 bg-[#217196] rounded-3xl flex items-center justify-center text-white text-4xl shadow-lg">
            <i className="fa-brands fa-wordpress"></i>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-stone-800">Manual de Integração</h1>
            <p className="text-stone-500">Siga este guia para conectar seu conteúdo real.</p>
          </div>
        </div>

        {/* Tabs de Navegação */}
        <div className="flex flex-wrap gap-2 mb-12 bg-stone-100 p-2 rounded-2xl">
          <button 
            onClick={() => setActiveTab('wp')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all ${activeTab === 'wp' ? 'bg-white text-[#217196] shadow-sm' : 'text-stone-500 hover:bg-stone-50'}`}
          >
            1. WordPress (ACF)
          </button>
          <button 
            onClick={() => setActiveTab('vercel')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all ${activeTab === 'vercel' ? 'bg-white text-black shadow-sm' : 'text-stone-500 hover:bg-stone-50'}`}
          >
            2. Vercel (Hospedagem)
          </button>
          <button 
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all ${activeTab === 'code' ? 'bg-white text-green-600 shadow-sm' : 'text-stone-500 hover:bg-stone-50'}`}
          >
            3. Ativação no Código
          </button>
        </div>

        {activeTab === 'wp' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <i className="fa-solid fa-gears text-[#217196]"></i> Configuração ACF
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  No seu painel WordPress, instale o plugin <strong>Advanced Custom Fields</strong>. Crie um novo grupo de campos chamado "Atributos da Receita" e adicione os seguintes <strong>Slug</strong> (Nomes de campo):
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="font-mono text-sm font-bold text-blue-700">tempo_preparo</span>
                    <span className="text-[10px] uppercase font-black text-blue-400">Número</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="font-mono text-sm font-bold text-blue-700">calorias</span>
                    <span className="text-[10px] uppercase font-black text-blue-400">Número</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="font-mono text-sm font-bold text-blue-700">tipo_dieta</span>
                    <span className="text-[10px] uppercase font-black text-blue-400">Select</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="font-mono text-sm font-bold text-blue-700">ingredientes</span>
                    <span className="text-[10px] uppercase font-black text-blue-400">Repeater/Textarea</span>
                  </div>
                </div>
              </div>
              <div className="bg-stone-900 rounded-[2rem] p-8 text-white">
                <h4 className="font-bold text-xl mb-6 flex items-center gap-3">
                  <i className="fa-solid fa-lightbulb text-yellow-400"></i> Por que isso?
                </h4>
                <p className="text-stone-400 text-sm leading-relaxed mb-6">
                  O WordPress nativo só oferece título e conteúdo. Usando ACF, transformamos o WP em uma base de dados estruturada para o seu front-end React.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-sm">
                    <i className="fa-solid fa-check text-green-500"></i> Melhora o SEO
                  </li>
                  <li className="flex gap-3 text-sm">
                    <i className="fa-solid fa-check text-green-500"></i> Facilita a Filtragem
                  </li>
                  <li className="flex gap-3 text-sm">
                    <i className="fa-solid fa-check text-green-500"></i> Dashboard limpo para o autor
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vercel' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="bg-black text-white p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-12">
               <div className="flex-1">
                 <h3 className="text-3xl font-bold mb-6">Deploy Instantâneo</h3>
                 <p className="text-stone-400 mb-8">
                   O Vercel reconhece seu projeto React automaticamente. Basta subir seu código para o GitHub e conectar o repositório.
                 </p>
                 <div className="space-y-4">
                   <div className="flex items-center gap-4 text-sm font-bold">
                     <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center">1</div>
                     Crie conta no vercel.com
                   </div>
                   <div className="flex items-center gap-4 text-sm font-bold">
                     <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center">2</div>
                     Importe seu repositório GitHub
                   </div>
                   <div className="flex items-center gap-4 text-sm font-bold">
                     <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center">3</div>
                     Pronto! Link .vercel.app gerado.
                   </div>
                 </div>
               </div>
               <div className="w-full md:w-64 aspect-square bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10">
                 <i className="fa-solid fa-cloud-arrow-up text-6xl text-white"></i>
               </div>
             </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="animate-in fade-in duration-500">
             <div className="bg-green-50 p-8 rounded-3xl border border-green-100 mb-8">
               <h3 className="text-xl font-bold text-green-800 mb-4">Último Passo</h3>
               <p className="text-green-700 text-sm">
                 Após configurar o WordPress e os campos ACF, altere o arquivo <strong>constants.ts</strong> para começar a consumir os dados reais.
               </p>
             </div>
             <pre className="bg-stone-900 p-8 rounded-2xl text-blue-300 font-mono text-sm overflow-x-auto shadow-xl">
{`export const WP_CONFIG = {
  baseUrl: 'https://SEU-DOMINIO.com/wp-json/wp/v2',
  useExternalAPI: true // <--- Mude para TRUE aqui!
};`}
             </pre>
          </div>
        )}

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between p-8 bg-stone-50 rounded-3xl gap-6">
          <p className="text-stone-500 text-sm font-medium">Dúvidas sobre a estrutura JSON da API?</p>
          <div className="flex gap-4">
            <button className="bg-white px-6 py-3 rounded-xl text-stone-700 font-bold border border-stone-200 hover:bg-stone-100 transition-all text-sm">
              Ver Documentação WP
            </button>
            <button className="bg-[#217196] px-6 py-3 rounded-xl text-white font-bold hover:bg-[#1b5e20] transition-all text-sm shadow-lg shadow-blue-100">
              Testar Conexão Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordPressBridge;
