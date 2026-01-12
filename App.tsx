
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

type View = 'home' | 'recipe' | 'planner' | 'imc' | 'receitas' | 'sobre' | 'conversor' | 'saude' | 'article' | 'editor';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const filteredRecipes = useMemo(() => {
    return MOCK_RECIPES.filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredArticles = useMemo(() => {
    return MOCK_ARTICLES.filter(a => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const recentPosts = useMemo(() => {
    const recipes = searchQuery ? filteredRecipes : MOCK_RECIPES.slice(0, 3);
    const articles = searchQuery ? filteredArticles : MOCK_ARTICLES.slice(0, 3);
    
    const combined = [
      ...recipes.map(r => ({ ...r, type: 'recipe' })),
      ...articles.map(a => ({ ...a, type: 'article' }))
    ];
    return searchQuery ? combined : combined.sort(() => Math.random() - 0.5);
  }, [searchQuery, filteredRecipes, filteredArticles]);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe');
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'recipe': return selectedRecipe ? <RecipeDetail recipe={selectedRecipe} onBack={() => setCurrentView('receitas')} /> : null;
      case 'article': return selectedArticle ? <ArticleDetail article={selectedArticle} onBack={() => setCurrentView('saude')} /> : null;
      case 'planner': return <MealPlanner recipes={MOCK_RECIPES} onRecipeClick={handleRecipeClick} />;
      case 'imc': return <BMICalculator />;
      case 'conversor': return <WeightConverter />;
      case 'sobre': return <SobreNos />;
      case 'editor': return <ContentEditor onBack={() => setCurrentView('home')} />;
      case 'receitas':
        return (
          <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
            <h1 className="text-5xl font-black text-stone-800 mb-12 tracking-tighter">Explorar Receitas</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredRecipes.map(r => <RecipeCard key={r.id} recipe={r} onClick={() => handleRecipeClick(r)} />)}
            </div>
          </div>
        );
      case 'saude':
        return (
          <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
            <h1 className="text-5xl font-black text-stone-800 mb-12 tracking-tighter">Bem-estar</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles.map(a => (
                <div key={a.id} onClick={() => handleArticleClick(a)} className="bg-white p-8 rounded-[2rem] border border-stone-100 flex gap-6 cursor-pointer hover:shadow-xl transition-all">
                  <img src={a.image} className="w-40 h-40 rounded-2xl object-cover" alt={a.title} />
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">{a.category}</span>
                    <h3 className="text-xl font-bold mb-3">{a.title}</h3>
                    <p className="text-sm text-stone-500 line-clamp-2">{a.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'home':
      default:
        return (
          <div className="space-y-32 pb-24 animate-fade-in">
            {/* 1. Hero Section */}
            {!searchQuery && (
              <section className="max-w-7xl mx-auto px-4 pt-12">
                 <div className="relative rounded-[3.5rem] overflow-hidden bg-stone-900 text-white min-h-[550px] flex items-center px-12 shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Gourmet Food" />
                    <div className="relative z-10 max-w-2xl">
                      <h2 className="text-6xl lg:text-8xl font-black mb-8 leading-none tracking-tighter">Saúde com Sabor.</h2>
                      <p className="text-xl text-stone-300 mb-12 font-medium italic">A arte de nutrir o corpo com elegância e consciência.</p>
                      <div className="flex gap-5">
                        <button onClick={() => setCurrentView('receitas')} className="bg-red-600 px-10 py-5 rounded-2xl font-black hover:bg-red-700 transition-all text-lg active:scale-95">Descobrir Receitas</button>
                        <button onClick={() => setCurrentView('planner')} className="bg-white text-stone-900 px-10 py-5 rounded-2xl font-black hover:bg-stone-100 transition-all text-lg active:scale-95">Plano Semanal</button>
                      </div>
                    </div>
                 </div>
              </section>
            )}

            {/* 2. Recent Posts Section */}
            <section className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-16">
                <div className="h-[1px] flex-grow bg-stone-200"></div>
                <h3 className="px-8 text-xs font-black text-stone-400 uppercase tracking-[0.4em]">
                  {searchQuery ? `Resultados para "${searchQuery}"` : 'Recém Saídos da Cozinha'}
                </h3>
                <div className="h-[1px] flex-grow bg-stone-200"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {recentPosts.map((post: any) => (
                  <div 
                    key={post.id} 
                    onClick={() => post.type === 'recipe' ? handleRecipeClick(post) : handleArticleClick(post)}
                    className="minimal-card group cursor-pointer"
                  >
                    <div className="relative h-64 overflow-hidden rounded-3xl mb-6">
                      <img src={post.image} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt={post.title} />
                      <div className="absolute top-4 left-4">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase text-white ${post.type === 'recipe' ? 'bg-red-600' : 'bg-emerald-600'}`}>
                          {post.type === 'recipe' ? 'Receita' : 'Artigo'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-2 block">{post.category}</span>
                      <h4 className="text-2xl font-bold text-stone-800 leading-tight group-hover:text-red-600 transition-colors">{post.title}</h4>
                      <p className="mt-4 text-sm text-stone-400 font-medium">{post.readTime || post.prepTime + ' MIN'}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {!searchQuery && (
                <div className="mt-16 text-center">
                  <button 
                    onClick={() => setCurrentView('receitas')}
                    className="text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-800 transition-colors border-b border-stone-200 pb-2"
                  >
                    Ver todo o histórico <i className="fa-solid fa-arrow-right ml-2"></i>
                  </button>
                </div>
              )}
            </section>

            {/* 3. Featured Carousel Section */}
            {!searchQuery && (
              <section className="bg-white py-32 border-y border-stone-100">
                <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
                  <h3 className="text-3xl font-black text-stone-800 tracking-tighter uppercase">Destaques da Temporada</h3>
                </div>
                <PostCarousel items={MOCK_RECIPES.slice(0, 5)} onItemClick={handleRecipeClick} />
              </section>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      <Header currentView={currentView} setView={setCurrentView} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer onEditorClick={() => setCurrentView('editor')} />
    </div>
  );
};

export default App;
