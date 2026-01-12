
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Difficulty, DietType, Recipe, Article } from '../types';

interface ContentEditorProps {
  onBack: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [adminTab, setAdminTab] = useState<'create' | 'manage'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  useEffect(() => {
    const r = JSON.parse(localStorage.getItem('ss_custom_recipes') || '[]');
    const a = JSON.parse(localStorage.getItem('ss_custom_articles') || '[]');
    setAllRecipes(r);
    setAllArticles(a);
  }, [adminTab, showSuccess, editingId]);

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

  // Efeito para sincronizar categorias travadas por tipo de post
  useEffect(() => {
    if (type === 'article') {
      setFormData((prev: any) => ({ ...prev, category: 'Saúde', subcategory: '' }));
    } else {
      setFormData((prev: any) => ({ ...prev, category: 'Receitas' }));
    }
  }, [type]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'image' | 'image2') => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("A imagem é muito grande! Tente uma com menos de 2MB.");
      return;
    }
    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev: any) => ({ ...prev, [target]: reader.result as string }));
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 3000);
    }
  };

  const deletePost = (id: string, postType: 'recipe' | 'article') => {
    if (!confirm("Tem certeza que deseja excluir permanentemente este post?")) return;
    const storageKey = postType === 'recipe' ? 'ss_custom_recipes' : 'ss_custom_articles';
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const filtered = existing.filter((item: any) => item.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(filtered));
    setShowSuccess("Post removido com sucesso!");
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const startEdit = (post: any, postType: 'recipe' | 'article') => {
    setType(postType);
    setEditingId(post.id);
    setFormData({
      ...post,
      ingredients: Array.isArray(post.ingredients) ? post.ingredients.join('\n') : post.ingredients || '',
      instructions: Array.isArray(post.instructions) ? post.instructions.join('\n') : post.content || ''
    });
    setAdminTab('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const publishToLocal = () => {
    if (!formData.title || !formData.image) {
      alert("Por favor, preencha o título e a imagem.");
      return;
    }

    if (type === 'recipe' && !formData.subcategory) {
      alert("Por favor, informe uma subcategoria (ex: Massas, Fitness).");
      return;
    }

    const storageKey = type === 'recipe' ? 'ss_custom_recipes' : 'ss_custom_articles';
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const id = editingId || Math.random().toString(36).substr(2, 9);
    
    let newData;
    if (type === 'recipe') {
      newData = {
        ...formData,
        id,
        category: 'Receitas',
        ingredients: typeof formData.ingredients === 'string' ? formData.ingredients.split('\n').filter((i: string) => i.trim() !== '') : formData.ingredients,
        instructions: typeof formData.instructions === 'string' ? formData.instructions.split('\n').filter((i: string) => i.trim() !== '') : formData.instructions,
      };
    } else {
      newData = {
        id: id.startsWith('a') ? id : 'a' + id,
        title: formData.title,
        excerpt: formData.description,
        content: formData.instructions,
        image: formData.image,
        image2: formData.image2,
        category: 'Saúde',
        date: formData.date || new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
        readTime: formData.readTime || '7 min',
        author: formData.author
      };
    }

    if (editingId) {
      const updatedList = existing.map((item: any) => item.id === editingId ? newData : item);
      localStorage.setItem(storageKey, JSON.stringify(updatedList));
      setShowSuccess("Post atualizado!");
    } else {
      localStorage.setItem(storageKey, JSON.stringify([...existing, newData]));
      setShowSuccess("Post publicado!");
    }

    setTimeout(() => setShowSuccess(null), 3000);
    setFormData(initialFormState);
    setEditingId(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 animate-fade-in">
        <div className="max-w-md w-full">
          <button onClick={onBack} className="mb-8 text-xs font-black uppercase tracking-widest text-stone-400 hover:text-stone-800 transition-all flex items-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> Voltar ao site
          </button>
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-stone-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-green-600"></div>
            <h2 className="text-3xl font-black text-stone-800 mb-8 tracking-tighter">Portal do Autor</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <input type="password" placeholder="Senha administrativa" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full px-6 py-4 rounded-2xl bg-stone-50 border-2 outline-none transition-all font-bold ${loginError ? 'border-red-200 bg-red-50' : 'border-transparent focus:border-stone-200 focus:bg-white'}`} required />
              <button type="submit" className="w-full py-4 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-stone-800 transition-all">Entrar no Painel</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in">
      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[2000] bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce">
          <i className="fa-solid fa-circle-check text-2xl"></i>
          <div><p className="font-black uppercase tracking-widest text-xs">Sucesso!</p><p className="text-xs opacity-80">{showSuccess}</p></div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-xs font-black uppercase tracking-widest text-stone-400 hover:text-red-600 transition-all flex items-center gap-2"><i className="fa-solid fa-arrow-left"></i> Sair do Painel</button>
        <div className="flex bg-stone-100 p-1 rounded-2xl shadow-inner">
          <button onClick={() => { setAdminTab('create'); setEditingId(null); setFormData(initialFormState); }} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${adminTab === 'create' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400'}`}>{editingId ? 'Editando Post' : 'Novo Post'}</button>
          <button onClick={() => setAdminTab('manage')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${adminTab === 'manage' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400'}`}>Gerenciar Conteúdo</button>
        </div>
      </div>

      {adminTab === 'create' ? (
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-stone-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-black text-stone-800 tracking-tighter">{editingId ? 'Editar Publicação' : 'Criador de Conteúdo'}</h2>
              <p className="text-stone-500 font-medium italic">Transforme {type === 'recipe' ? 'receitas' : 'saúde'} em informação visual.</p>
            </div>
            {!editingId && (
              <div className="flex p-1.5 bg-stone-100 rounded-2xl">
                <button onClick={() => setType('recipe')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === 'recipe' ? 'bg-red-600 text-white shadow-lg' : 'text-stone-400'}`}>Receita</button>
                <button onClick={() => setType('article')} className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === 'article' ? 'bg-emerald-600 text-white shadow-lg' : 'text-stone-400'}`}>Artigo</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Título do Post</label>
                <input type="text" className="w-full p-4 rounded-xl bg-stone-50 border-2 border-transparent focus:border-stone-200 outline-none transition-all font-bold" placeholder="Ex: Torta de Limão Fit" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>

              <div className="space-y-6 p-6 bg-stone-50/50 rounded-3xl border border-stone-100">
                <div className={`grid grid-cols-1 gap-4 ${type === 'recipe' ? 'md:grid-cols-2' : ''}`}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Categoria (Automática)</label>
                    <input 
                      type="text" 
                      className="w-full p-4 rounded-xl border-2 border-transparent bg-stone-100 text-stone-400 cursor-not-allowed outline-none font-bold" 
                      value={formData.category} 
                      readOnly
                    />
                  </div>
                  {type === 'recipe' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Subcategoria (Define o grupo)</label>
                      <input 
                        type="text" 
                        className="w-full p-4 rounded-xl bg-white border-2 border-emerald-100 focus:border-emerald-500 outline-none transition-all font-bold" 
                        placeholder="Ex: Fitness, Massas, Bolos" 
                        value={formData.subcategory} 
                        onChange={(e) => setFormData({...formData, subcategory: e.target.value})} 
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Foto Principal</label>
                  <div onClick={() => fileInputRef1.current?.click()} className="aspect-square rounded-2xl bg-stone-50 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all overflow-hidden relative group">
                    {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : <i className="fa-solid fa-camera text-2xl text-stone-300"></i>}
                    <input type="file" ref={fileInputRef1} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Foto 2 (Opcional)</label>
                  <div onClick={() => fileInputRef2.current?.click()} className="aspect-square rounded-2xl bg-stone-50 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all overflow-hidden relative group">
                    {formData.image2 ? <img src={formData.image2} className="w-full h-full object-cover" /> : <i className="fa-solid fa-plus text-2xl text-stone-300"></i>}
                    <input type="file" ref={fileInputRef2} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'image2')} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">{type === 'recipe' ? 'Resumo' : 'Introdução'}</label>
                <textarea className="w-full p-4 rounded-xl bg-stone-50 border-2 border-transparent focus:border-stone-200 outline-none transition-all font-medium h-28" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">{type === 'recipe' ? 'Modo de Preparo' : 'Conteúdo do Artigo'}</label>
                <textarea className="w-full p-4 rounded-xl bg-stone-50 border-2 border-transparent focus:border-stone-200 outline-none transition-all font-medium h-48" placeholder="Um parágrafo ou item por linha..." value={formData.instructions} onChange={(e) => setFormData({...formData, instructions: e.target.value})} />
              </div>
            </div>
          </div>

          {type === 'recipe' && (
            <div className="mt-8 space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Ingredientes (Um por linha)</label>
              <textarea className="w-full p-4 rounded-xl bg-stone-50 border-2 border-transparent focus:border-stone-200 outline-none transition-all font-medium h-32" value={formData.ingredients} onChange={(e) => setFormData({...formData, ingredients: e.target.value})} />
            </div>
          )}

          <div className="mt-12 flex flex-col items-center border-t border-stone-100 pt-10">
            <button onClick={publishToLocal} disabled={isUploading} className={`bg-emerald-600 text-white px-20 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-stone-900 transition-all shadow-2xl active:scale-95 mb-6 ${isUploading ? 'opacity-50' : ''}`}>
              {isUploading ? 'Carregando Fotos...' : (editingId ? 'Salvar Alterações' : 'Publicar Agora')}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          <section>
            <h3 className="text-xl font-black text-stone-800 mb-6 flex items-center justify-between"><span className="flex items-center gap-3"><i className="fa-solid fa-utensils text-red-500"></i> Receitas ({allRecipes.length})</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allRecipes.map(r => (
                <div key={r.id} className="bg-white p-6 rounded-3xl border border-stone-100 flex gap-4 items-center group shadow-sm hover:shadow-md transition-all">
                  <img src={r.image} className="w-20 h-20 rounded-2xl object-cover" />
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-stone-800 truncate">{r.title}</h4>
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{r.subcategory}</p>
                    <div className="flex gap-4 mt-3">
                      <button onClick={() => startEdit(r, 'recipe')} className="text-[11px] font-black uppercase text-blue-600 flex items-center gap-1"><i className="fa-solid fa-pen"></i> Editar</button>
                      <button onClick={() => deletePost(r.id, 'recipe')} className="text-[11px] font-black uppercase text-red-500 flex items-center gap-1"><i className="fa-solid fa-trash"></i> Excluir</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-xl font-black text-stone-800 mb-6 flex items-center justify-between"><span className="flex items-center gap-3"><i className="fa-solid fa-book-medical text-emerald-600"></i> Artigos ({allArticles.length})</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allArticles.map(a => (
                <div key={a.id} className="bg-white p-6 rounded-3xl border border-stone-100 flex gap-4 items-center group shadow-sm hover:shadow-md transition-all">
                  <img src={a.image} className="w-20 h-20 rounded-2xl object-cover" />
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-stone-800 truncate">{a.title}</h4>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{a.category}</p>
                    <div className="flex gap-4 mt-3">
                      <button onClick={() => startEdit(a, 'article')} className="text-[11px] font-black uppercase text-blue-600 flex items-center gap-1"><i className="fa-solid fa-pen"></i> Editar</button>
                      <button onClick={() => deletePost(a.id, 'article')} className="text-[11px] font-black uppercase text-red-500 flex items-center gap-1"><i className="fa-solid fa-trash"></i> Excluir</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
