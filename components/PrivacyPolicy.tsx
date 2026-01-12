
import React from 'react';
import AdBanner from './AdBanner';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <button 
        onClick={onBack} 
        className="mb-8 flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-all font-black text-xs uppercase tracking-widest"
      >
        <i className="fa-solid fa-arrow-left"></i> Voltar ao Início
      </button>

      <div className="bg-white rounded-[3rem] p-8 md:p-20 shadow-2xl border border-stone-100 mb-12">
        <header className="mb-16 text-center">
          <span className="text-[#2e7d32] font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Segurança & Privacidade</span>
          <h1 className="text-5xl md:text-6xl font-black text-stone-800 tracking-tighter leading-none mb-6">Política de Privacidade</h1>
          <p className="text-stone-400 font-medium italic">Como cuidamos dos seus dados e garantimos sua navegação segura no Saúde com Sabor.</p>
        </header>

        <div className="space-y-12">
          {/* Introdução */}
          <section className="prose prose-stone prose-lg max-w-none">
            <p className="text-stone-600 leading-relaxed text-xl">
              No <strong>Saúde com Sabor</strong>, a privacidade de nossos visitantes é de extrema importância para nós. Este documento de política de privacidade descreve os tipos de informações pessoais que são recebidas e coletadas e como elas são usadas.
            </p>
          </section>

          {/* Coleta de Dados */}
          <section>
            <h2 className="text-2xl font-black text-stone-800 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-green-600 rounded-full"></span>
              Coleta de Informações
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Coletamos informações de identificação pessoal apenas quando voluntariamente enviadas pelos nossos visitantes, como em formulários de contato ou inscrições em newsletters. Essas informações são usadas apenas para atender ao seu pedido específico, a menos que você nos dê permissão para usá-las de outra maneira.
            </p>
          </section>

          <AdBanner />

          {/* Cookies e Web Beacons */}
          <section>
            <h2 className="text-2xl font-black text-stone-800 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-red-600 rounded-full"></span>
              Cookies e AdSense
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Utilizamos cookies para armazenar informações sobre as preferências dos visitantes e registrar informações específicas sobre quais páginas o usuário acessa ou visita.
            </p>
            <div className="bg-stone-50 p-8 rounded-[2rem] border border-stone-100">
              <h4 className="font-bold text-stone-800 mb-2">Google AdSense e Cookie DART:</h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                O Google, como fornecedor terceirizado, utiliza cookies para exibir anúncios em nosso site. O uso do cookie DART permite ao Google exibir anúncios para os usuários com base em suas visitas a este e outros sites na Internet. Os usuários podem desativar o uso do cookie DART visitando a política de privacidade da rede de anúncios e conteúdo do Google.
              </p>
            </div>
          </section>

          {/* Segurança */}
          <section>
            <h2 className="text-2xl font-black text-stone-800 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-stone-800 rounded-full"></span>
              Segurança dos Dados
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Suas informações de identificação pessoal são mantidas seguras. Somente funcionários autorizados (que concordaram em manter as informações seguras e confidenciais) têm acesso a essas informações.
            </p>
          </section>

          <AdBanner />

          {/* Seus Direitos */}
          <section className="bg-[#f1f8e9] p-10 rounded-[2.5rem] border border-[#c8e6c9]">
            <h2 className="text-2xl font-black text-[#2e7d32] mb-4">Seus Direitos (LGPD)</h2>
            <p className="text-[#2e7d32]/80 leading-relaxed mb-4">
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-stone-700">
              <li className="flex items-center gap-2"><i className="fa-solid fa-check text-green-600"></i> Acessar seus dados</li>
              <li className="flex items-center gap-2"><i className="fa-solid fa-check text-green-600"></i> Corrigir dados incompletos</li>
              <li className="flex items-center gap-2"><i className="fa-solid fa-check text-green-600"></i> Solicitar a exclusão de dados</li>
              <li className="flex items-center gap-2"><i className="fa-solid fa-check text-green-600"></i> Revogar consentimento</li>
            </ul>
          </section>
        </div>

        <footer className="mt-20 pt-12 border-t border-stone-100 text-center">
          <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">
            Última atualização: Junho de 2024
          </p>
        </footer>
      </div>

      <AdBanner />
    </div>
  );
};

export default PrivacyPolicy;
