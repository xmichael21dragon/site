
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_RECIPES, MOCK_ARTICLES } from './constants';
import { Recipe, Article } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import ArticleDetail from './components/ArticleDetail';
import MealPlanner from './components/MealPlanner';
import BMICalculator from './components/BMICalculator';
import WeightConverter from './components/WeightConverter';
import PostCarousel from './components/PostCarousel';
import SobreNos from './components/SobreNos';
import ContentEditor from './components/ContentEditor';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import AdBanner from './components/AdBanner';
import SearchInput from './components/SearchInput'; 
import Logo from './components/Logo';
import Contact from './components/Contact';
import CookieBanner from './components/CookieBanner';
import { supabase } from './lib/supabase';

type View = 'home' | 'recipe' | 'planner' | 'imc' | 'receitas' | 'sobre' | 'conversor' | 'saude' | 'article' | 'editor' | 'termos' | 'privacidade' | 'contato';

const ITEMS_PER_PAGE_RECIPES = 8;
const ITEMS_PER_PAGE_ARTICLES = 6;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [recipesRes, articlesRes] = await Promise.all([
        supabase.from('recipes').select('*').order('created_at', { ascending: false }),
        supabase.from('articles').select('*').order('created_at', { ascending: false })
      ]);
      const recipesData = (recipesRes.data && recipesRes.data.length > 0) ? recipesRes.data : MOCK_RECIPES;
      const articlesData = (articlesRes.data && articlesRes.data.length > 0) ? articlesRes.data : MOCK_ARTICLES;
      setAllRecipes(recipesData as Recipe[]);
      setAllArticles(articlesData as Article[]);
    } catch (error) {
      setAllRecipes(MOCK_RECIPES);
      setAllArticles(MOCK_ARTICLES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allRecipes]);

  const filteredArticles = useMemo(() => {
    return allArticles.filter(a => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allArticles]);

  const recentPosts = useMemo(() => {
    const combined = [
      ...allRecipes.map(r => ({ ...r, x_type: 'recipe' })),
      ...allArticles.map(a => ({ ...a, x_type: 'article' }))
    ].sort((a, b) => (b.id > a.id ? 1 : -1));
    return combined.slice(0, 9);
  }, [allRecipes, allArticles]);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe');
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article');
  };

  const renderContent = () => {
    if (isLoading && (currentView === 'home' || currentView === 'receitas' || currentView === 'saude')) {
      return (
        <div className="flex flex-col items-center justify-center py-40 animate-pulse">
          <div className="w-16 h-16 border-4 border-[#ef4444] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-stone-400 font-black uppercase tracking-widest text-xs">Sincronizando Banco de Dados Editorial...</p>
        </div>
      );
    }

    switch (currentView) {
      case 'recipe': return selectedRecipe ? <RecipeDetail recipe={selectedRecipe} onBack={() => setCurrentView('receitas')} /> : null;
      case 'article': return selectedArticle ? <ArticleDetail article={selectedArticle} onBack={() => setCurrentView('saude')} /> : null;
      case 'planner': return <MealPlanner recipes={allRecipes} onRecipeClick={handleRecipeClick} />;
      case 'imc': return <BMICalculator />;
      case 'conversor': return <WeightConverter />;
      case 'sobre': return <SobreNos />;
      case 'contato': return <Contact onBack={() => setCurrentView('home')} />;
      case 'editor': return <ContentEditor onBack={() => setCurrentView('home')} />;
      case 'termos': return <TermsOfUse onBack={() => setCurrentView('home')} />;
      case 'privacidade': return <PrivacyPolicy onBack={() => setCurrentView('home')} />;
      case 'receitas':
        return (
          <div className="animate-fade-in bg-[#fafaf9]">
            <section className="bg-stone-900 py-32 text-center text-white">
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Acervo de <span className="text-[#ef4444]">Gastronomia</span></h1>
              <p className="text-stone-400 text-xl italic mt-6 max-w-2xl mx-auto px-4">Todas as receitas publicadas neste acervo foram rigorosamente testadas para garantir o equilíbrio perfeito entre sabor gourmet e benefícios funcionais.</p>
            </section>
            <div className="max-w-7xl mx-auto px-4 py-20">
              <div className="mb-20 prose prose-stone max-w-none text-center">
                <p className="text-stone-500 font-medium text-lg italic">"Navegue por nossas categorias e descubra como ingredientes naturais podem ser transformados em experiências culinárias inesquecíveis. Priorizamos alimentos integrais, sem açúcares refinados e ricos em densidade nutricional."</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredRecipes.map(r => <RecipeCard key={r.id} recipe={r} onClick={() => handleRecipeClick(r)} />)}
              </div>
            </div>
          </div>
        );
      case 'saude':
        return (
          <div className="animate-fade-in bg-[#fafaf9]">
            <section className="bg-stone-900 py-32 text-center text-white">
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Guias de <span className="text-[#3b82f6]">Performance</span></h1>
              <p className="text-stone-400 text-xl italic mt-6 max-w-2xl mx-auto px-4">Nossa equipe editorial traduz os artigos científicos mais recentes em guias práticos para sua longevidade e vitalidade cerebral.</p>
            </section>
            <div className="max-w-7xl mx-auto px-4 py-20">
              <div className="mb-20 bg-blue-50 p-12 rounded-[4rem] border border-blue-100 text-center">
                <h3 className="text-2xl font-black text-[#3b82f6] mb-4 uppercase tracking-tighter">O Método Editorial</h3>
                <p className="text-blue-900/70 font-medium text-lg leading-relaxed max-w-4xl mx-auto italic">Cada artigo abaixo passa por um processo de revisão técnica para garantir que você receba informações precisas sobre metabolismo, sono, neuroplasticidade e nutrição ortomolecular. Acreditamos na ciência como base para o bem-estar duradouro.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filteredArticles.map(a => (
                  <div key={a.id} onClick={() => handleArticleClick(a)} className="bg-white p-8 rounded-[3rem] border border-stone-100 flex flex-col md:flex-row gap-8 cursor-pointer hover:shadow-2xl transition-all group">
                    <img src={a.image} className="w-full md:w-48 h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform" />
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-black text-[#3b82f6] uppercase tracking-[0.3em] mb-2">{a.category}</span>
                      <h3 className="text-2xl font-black mb-4 group-hover:text-[#3b82f6] transition-colors uppercase tracking-tight">{a.title}</h3>
                      <p className="text-stone-500 line-clamp-2 italic leading-relaxed">{a.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'home':
      default:
        return (
          <div className="space-y-24 pb-32 animate-fade-in bg-white">
            <section className="max-w-7xl mx-auto px-4 pt-16">
               <div className="relative rounded-[3.5rem] overflow-hidden bg-stone-900 text-white min-h-[600px] flex items-center px-10 md:px-20 shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Gourmet" />
                  <div className="relative z-10 w-full flex flex-col items-center text-center">
                    <div className="w-20 h-20 mb-8 bg-white/10 backdrop-blur rounded-3xl p-4 border border-white/20 shadow-2xl"><Logo /></div>
                    <h2 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">
                      NUTRIÇÃO <span className="text-[#ef4444]">CIÊNCIA</span> <br/> <span className="text-[#3b82f6] italic font-serif">Sabor</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-stone-300 mb-12 font-medium italic max-w-2xl">Sua fonte de autoridade editorial em saúde e bem-estar.</p>
                    <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Busque por receitas, nutrientes ou temas de saúde..." transparent />
                  </div>
               </div>
            </section>
            
            <section className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col items-center mb-20">
                <span className="text-[10px] font-black text-[#ef4444] uppercase tracking-[0.5em] mb-4">Em Destaque Hoje</span>
                <h2 className="text-4xl md:text-7xl font-black text-stone-900 tracking-tighter uppercase text-center leading-none">Mural de <span className="text-[#ef4444]">Conhecimento</span></h2>
                <div className="w-24 h-1.5 bg-stone-100 rounded-full mt-10"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {recentPosts.map((post: any) => (
                  <div key={post.id} onClick={() => post.x_type === 'article' ? handleArticleClick(post) : handleRecipeClick(post)} className="group cursor-pointer bg-white rounded-[3.5rem] border border-stone-50 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                    <div className="relative h-72 overflow-hidden">
                      <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={post.title} />
                      <div className="absolute top-6 left-6">
                        <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md ${post.x_type === 'article' ? 'bg-blue-600/90 text-white' : 'bg-red-600/90 text-white'}`}>
                          {post.x_type === 'article' ? 'Guia de Saúde' : 'Receita Gourmet'}
                        </span>
                      </div>
                    </div>
                    <div className="p-10">
                      <h4 className="text-2xl font-black text-stone-800 leading-tight group-hover:text-[#ef4444] transition-colors mb-4 line-clamp-2 uppercase tracking-tighter">
                        {post.title}
                      </h4>
                      <p className="text-stone-500 text-sm line-clamp-3 mb-8 italic leading-relaxed">{post.description || post.excerpt}</p>
                      <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                        <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Equipe Editorial</span>
                        <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-300 group-hover:bg-red-50 group-hover:text-red-500 transition-all">
                          <i className="fa-solid fa-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <AdBanner />

            {/* SEÇÃO DE AUTORIDADE PARA O ADSENSE */}
            <section className="bg-stone-50 py-32">
               <div className="max-w-5xl mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div>
                      <h3 className="text-4xl font-black text-stone-900 mb-8 uppercase tracking-tighter">O Compromisso <br/> <span className="text-[#3b82f6]">Saúde com Sabor</span></h3>
                      <p className="text-stone-600 text-xl leading-relaxed font-medium italic mb-8">"Nosso portal não é apenas uma coleção de receitas. É um manifesto por uma vida mais longa e vibrante."</p>
                      <div className="space-y-6">
                        <div className="flex gap-6">
                          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-red-500 flex-shrink-0"><i className="fa-solid fa-flask"></i></div>
                          <p className="text-stone-500 text-sm">Todas as receitas são revisadas por nutricionistas certificados para garantir o balanço calórico e vitamínico.</p>
                        </div>
                        <div className="flex gap-6">
                          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-500 flex-shrink-0"><i className="fa-solid fa-graduation-cap"></i></div>
                          <p className="text-stone-500 text-sm">Nossos guias de saúde utilizam linguagem acessível para traduzir estudos científicos complexos.</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                       <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-red-500/10 blur-3xl"></div>
                       <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1200" className="relative z-10 rounded-[4rem] shadow-2xl border-8 border-white" alt="Equipe" />
                    </div>
                  </div>
               </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer onEditorClick={() => setCurrentView('editor')} onTermsClick={() => setCurrentView('termos')} onViewChange={setCurrentView} />
      <CookieBanner onViewPrivacy={() => setCurrentView('privacidade')} />
    </div>
  );
};

export default App;
