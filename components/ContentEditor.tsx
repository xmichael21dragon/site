
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Difficulty, DietType, Recipe, Article } from '../types';
import { supabase } from '../lib/supabase';

interface ContentEditorProps {
  onBack: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ onBack }) => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [adminTab, setAdminTab] = useState<'create' | 'manage' | 'seo'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [generatedSitemap, setGeneratedSitemap] = useState('');

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
      } catch (err) {
        console.error("Erro ao verificar sessão:", err);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadAdminData = async () => {
    try {
      const [r, a] = await Promise.all([
        supabase.from('recipes').select('*').order('created_at', { ascending: false }),
        supabase.from('articles').select('*').order('created_at', { ascending: false })
      ]);
      setAllRecipes((r.data || []) as Recipe[]);
      setAllArticles((a.data || []) as Article[]);
    } catch (err) {
      console.error("Erro ao carregar dados administrativos:", err);
    }
  };

  useEffect(() => {
    if (session) loadAdminData();
  }, [session, adminTab, showSuccess, editingId]);

  const [type, setType] = useState<'recipe' | 'article'>('recipe');

  const initialFormState = {
    title: '',
    description: '',
    image: '',
    image2: '',
    difficulty: Difficulty.EASY,
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    diet: DietType.NONE,
    category: 'Receitas', 
    subcategory: '', 
    ingredients: '',
    instructions: '',
    nutrition: { calories: 300, protein: 20, carbs: 30, fat: 10, fiber: 5 },
    author: 'Equipe Saúde com Sabor'
  };

  const [formData, setFormData] = useState<any>(initialFormState);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });
      if (error) {
        setLoginError("E-mail ou senha incorretos.");
        setLoading(false);
      } else {
        setSession(data.session);
        setLoading(false);
      }
    } catch (err) {
      setLoginError("Erro inesperado ao fazer login.");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const generateSitemapXML = () => {
    const baseUrl = 'https://saudecomsabor.com.br';
    const date = new Date().toISOString().split('T')[0];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    // Páginas Estáticas
    const staticPages = ['', '/?view=receitas', '/?view=saude', '/?view=imc', '/?view=conversor', '/?view=sobre'];
    staticPages.forEach(page => {
      xml += `  <url>\n    <loc>${baseUrl}${page}</loc>\n    <lastmod>${date}</lastmod>\n    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
    });

    // Receitas Dinâmicas
    allRecipes.forEach(recipe => {
      xml += `  <url>\n    <loc>${baseUrl}/?view=recipe&amp;id=${recipe.id}</loc>\n    <lastmod>${date}</lastmod>\n    <priority>0.7</priority>\n  </url>\n`;
    });

    // Artigos Dinâmicos
    allArticles.forEach(article => {
      xml += `  <url>\n    <loc>${baseUrl}/?view=article&amp;id=${article.id}</loc>\n    <lastmod>${date}</lastmod>\n    <priority>0.7</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;
    setGeneratedSitemap(xml);
    setShowSuccess("Sitemap XML gerado com sucesso!");
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const copySitemapToClipboard = () => {
    navigator.clipboard.writeText(generatedSitemap);
    alert("Sitemap copiado para a área de transferência!");
  };

  const publishToSupabase = async () => {
    if (!formData.title || !formData.image) {
      alert("Título e Imagem são obrigatórios.");
      return;
    }
    setIsUploading(true);
    const table = type === 'recipe' ? 'recipes' : 'articles';
    const payload = type === 'recipe' ? {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      image2: formData.image2,
      difficulty: formData.difficulty,
      prepTime: formData.prepTime,
      cookTime: formData.cookTime,
      servings: formData.servings,
      diet: formData.diet,
      category: 'Receitas',
      subcategory: formData.subcategory,
      ingredients: typeof formData.ingredients === 'string' ? formData.ingredients.split('\n').filter((i: string) => i.trim() !== '') : formData.ingredients,
      instructions: typeof formData.instructions === 'string' ? formData.instructions.split('\n').filter((i: string) => i.trim() !== '') : formData.instructions,
      nutrition: formData.nutrition,
      author: formData.author
    } : {
      title: formData.title,
      excerpt: formData.description,
      content: formData.instructions,
      image: formData.image,
      image2: formData.image2,
      category: 'Saúde',
      date: new Date().toLocaleDateString('pt-BR'),
      readTime: '7 min',
      author: formData.author
    };

    try {
      let error;
      if (editingId) {
        ({ error } = await supabase.from(table).update(payload).eq('id', editingId));
      } else {
        ({ error } = await supabase.from(table).insert([payload]));
      }
      if (error) throw error;
      setShowSuccess(editingId ? "Atualizado com sucesso!" : "Publicado com sucesso!");
      setFormData(initialFormState);
      setEditingId(null);
      setAdminTab('manage');
    } catch (err) {
      alert("Erro ao salvar.");
    } finally {
      setIsUploading(false);
      setTimeout(() => setShowSuccess(null), 3000);
    }
  };

  const inputStyles = "w-full px-6 py-4 rounded-2xl bg-stone-100 border-2 border-stone-200 focus:border-stone-900 focus:bg-white outline-none transition-all font-bold text-stone-800 placeholder:text-stone-400";
  const labelStyles = "text-[10px] font-black text-stone-500 uppercase tracking-widest ml-1 mb-1 block";

  if (!session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 animate-fade-in bg-stone-50">
        <div className="max-w-md w-full">
          <button onClick={onBack} className="mb-8 text-xs font-black uppercase tracking-widest text-stone-400 hover:text-stone-800 transition-all flex items-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> Voltar ao site
          </button>
          <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-stone-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-green-600"></div>
            <div className="text-center mb-10">
               <div className="w-16 h-16 bg-stone-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                 <i className="fa-solid fa-lock text-2xl"></i>
               </div>
               <h2 className="text-3xl font-black text-stone-800 tracking-tighter leading-none">Acesso Autor</h2>
               <p className="text-stone-400 text-sm font-medium mt-3 italic">Entre para gerenciar seu conteúdo.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className={inputStyles} required />
              <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className={inputStyles} required />
              {loginError && <div className="text-red-600 text-xs font-bold text-center">{loginError}</div>}
              <button type="submit" disabled={loading} className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-widest">
                {loading ? 'Entrando...' : 'Acessar Painel'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-xs font-black uppercase tracking-widest text-stone-400 hover:text-red-600 transition-all flex items-center gap-2"><i className="fa-solid fa-arrow-left"></i> Sair</button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-stone-100 p-1 rounded-2xl border border-stone-200">
            <button onClick={() => setAdminTab('create')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${adminTab === 'create' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400'}`}>Novo Post</button>
            <button onClick={() => setAdminTab('manage')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${adminTab === 'manage' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400'}`}>Gerenciar</button>
            <button onClick={() => setAdminTab('seo')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${adminTab === 'seo' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400'}`}>SEO & Sitemap</button>
          </div>
        </div>
      </div>

      {adminTab === 'seo' && (
        <div className="bg-white rounded-[3rem] p-12 shadow-2xl border-2 border-stone-100 animate-fade-in">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl">
              <i className="fa-solid fa-globe"></i>
            </div>
            <div>
              <h2 className="text-3xl font-black text-stone-800 tracking-tighter">Otimização de Indexação</h2>
              <p className="text-stone-400 text-sm font-medium uppercase tracking-widest">Sitemap XML e Ferramentas Google</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-stone-50 p-8 rounded-3xl border border-stone-100">
                <h3 className="text-xl font-black text-stone-800 mb-4">Gerador de Sitemap</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-8">
                  O sitemap XML ajuda o Google a descobrir todas as suas receitas e artigos. 
                  Clique abaixo para gerar uma versão atualizada baseada em todos os posts do seu banco de dados.
                </p>
                <button 
                  onClick={generateSitemapXML}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
                >
                  <i className="fa-solid fa-arrows-rotate mr-2"></i> Gerar Sitemap Dinâmico
                </button>
              </div>

              <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                <h3 className="text-xl font-black text-stone-800 mb-2">Dica de SEO</h3>
                <p className="text-blue-700/70 text-sm font-medium">
                  Após gerar o XML, copie o código e atualize o arquivo <code className="bg-white/50 px-1 rounded">sitemap.xml</code> na raiz do seu servidor ou envie diretamente via Google Search Console.
                </p>
              </div>
            </div>

            <div className="flex flex-col h-full">
              <label className={labelStyles}>Resultado do XML Gerado</label>
              <div className="relative flex-grow">
                <textarea 
                  readOnly
                  value={generatedSitemap}
                  className="w-full h-[300px] p-6 rounded-3xl bg-stone-900 text-emerald-400 font-mono text-xs resize-none border-2 border-stone-800 shadow-inner"
                  placeholder="O XML aparecerá aqui após a geração..."
                />
                {generatedSitemap && (
                  <button 
                    onClick={copySitemapToClipboard}
                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    <i className="fa-solid fa-copy mr-1"></i> Copiar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {adminTab === 'create' && (
        <div className="bg-white rounded-[3rem] p-12 shadow-2xl border-2 border-stone-100">
           <h2 className="text-4xl font-black text-stone-800 tracking-tighter mb-8">{editingId ? 'Editar Conteúdo' : 'Nova Publicação'}</h2>
           <div className="flex gap-4 mb-8">
              <button onClick={() => setType('recipe')} className={`px-4 py-2 rounded-lg text-xs font-bold ${type === 'recipe' ? 'bg-red-600 text-white' : 'bg-stone-100 text-stone-400'}`}>Receita</button>
              <button onClick={() => setType('article')} className={`px-4 py-2 rounded-lg text-xs font-bold ${type === 'article' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-400'}`}>Artigo</button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <input type="text" className={inputStyles} placeholder="Título" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                <input type="text" className={inputStyles} placeholder="URL da Imagem" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
                <input type="text" className={inputStyles} placeholder="Subcategoria" value={formData.subcategory} onChange={(e) => setFormData({...formData, subcategory: e.target.value})} />
              </div>
              <div className="space-y-6">
                <textarea className={`${inputStyles} h-40`} placeholder="Instruções / Conteúdo" value={formData.instructions} onChange={(e) => setFormData({...formData, instructions: e.target.value})} />
              </div>
           </div>
           <button onClick={publishToSupabase} disabled={isUploading} className="mt-10 px-10 py-4 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-widest">
              {isUploading ? 'Salvando...' : 'Salvar Publicação'}
           </button>
        </div>
      )}

      {adminTab === 'manage' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...allRecipes, ...allArticles].map(r => (
            <div key={r.id} className="bg-white p-6 rounded-[2.5rem] border-2 border-stone-100 flex items-center gap-4">
              <img src={r.image} className="w-16 h-16 rounded-xl object-cover" />
              <div className="min-w-0">
                <h4 className="font-bold truncate text-stone-800">{r.title}</h4>
                <div className="flex gap-2 mt-2">
                   <button onClick={() => { setEditingId(r.id); setFormData(r); setAdminTab('create'); }} className="text-[10px] font-black text-blue-600">EDITAR</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
