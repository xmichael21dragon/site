
import React, { useState } from 'react';
import { Difficulty, DietType } from '../types';

interface ContentEditorProps {
  onBack: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ onBack }) => {
  const [type, setType] = useState<'recipe' | 'article'>('recipe');
  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    image: '',
    difficulty: Difficulty.EASY,
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    diet: DietType.NONE,
    category: 'Almoço',
    ingredients: '',
    instructions: '',
    nutrition: { calories: 300, protein: 20, carbs: 30, fat: 10, fiber: 5 },
    author: 'Chef Saudável'
  });

  const [generatedCode, setGeneratedCode] = useState('');

  const generateJSON = () => {
    const id = Math.random().toString(36).substr(2, 9);
    let output = '';
    
    if (type === 'recipe') {
      const recipeObj = {
        ...formData,
        id,
        ingredients: formData.ingredients.split('\n').filter((i: string) => i.trim() !== ''),
        instructions: formData.instructions.split('\n').filter((i: string) => i.trim() !== ''),
        reviews: [],
        rating: 5.0
      };
      output = JSON.stringify(recipeObj, null, 2);
    } else {
      const articleObj = {
        id: 'a' + id,
        title: formData.title,
        excerpt: formData.description,
        content: formData.instructions,
        image: formData.image,
        category: 'Saúde Geral',
        date: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
        readTime: '7 min',
        author: formData.author
      };
      output = JSON.stringify(articleObj, null, 2);
    }
    
    setGeneratedCode(output + ',');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('Código copiado! Agora cole no final da lista no arquivo constants.ts');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <button onClick={onBack} className="mb-8 text-xs font-black uppercase tracking-widest text-stone-400 hover:text-red-600 transition-all">
        <i className="fa-solid fa-arrow-left mr-2"></i> Voltar ao site
      </button>

      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-stone-100">
        <h2 className="text-4xl font-black text-stone-800 mb-8 tracking-tighter">Gerador de Novas Postagens</h2>
        
        <div className="flex gap-4 mb-12 bg-stone-50 p-2 rounded-2xl">
          <button 
            onClick={() => setType('recipe')}
            className={`flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${type === 'recipe' ? 'bg-red-600 text-white shadow-lg' : 'text-stone-400 hover:bg-white'}`}
          >
            Nova Receita
          </button>
          <button 
            onClick={() => setType('article')}
            className={`flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${type === 'article' ? 'bg-emerald-600 text-white shadow-lg' : 'text-stone-400 hover:bg-white'}`}
          >
            Novo Artigo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-stone-400 uppercase mb-2">Título do Post</label>
              <input 
                type="text" 
                className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-red-100 outline-none"
                placeholder="Ex: Torta de Maçã Fit"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-stone-400 uppercase mb-2">URL da Imagem (Unsplash)</label>
              <input 
                type="text" 
                className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-red-100 outline-none"
                placeholder="Cole o link da foto aqui..."
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
            </div>

            {type === 'recipe' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase mb-2">Dificuldade</label>
                  <select 
                    className="w-full bg-stone-50 border-none rounded-xl p-4 outline-none"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  >
                    <option value={Difficulty.EASY}>Fácil</option>
                    <option value={Difficulty.MEDIUM}>Médio</option>
                    <option value={Difficulty.HARD}>Difícil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase mb-2">Dieta</label>
                  <select 
                    className="w-full bg-stone-50 border-none rounded-xl p-4 outline-none"
                    value={formData.diet}
                    onChange={(e) => setFormData({...formData, diet: e.target.value})}
                  >
                    <option value={DietType.NONE}>Padrão</option>
                    <option value={DietType.VEGAN}>Vegano</option>
                    <option value={DietType.VEGETARIAN}>Vegetariano</option>
                    <option value={DietType.LOW_CARB}>Low Carb</option>
                    <option value={DietType.GLUTEN_FREE}>Sem Glúten</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-stone-400 uppercase mb-2">Descrição Curta</label>
              <textarea 
                className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-red-100 outline-none h-24"
                placeholder="Um breve resumo sobre este post..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-stone-400 uppercase mb-2">Conteúdo / Passo a Passo (Um por linha)</label>
              <textarea 
                className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-red-100 outline-none h-48"
                placeholder="Digite cada instrução ou parágrafo em uma linha nova..."
                value={formData.instructions}
                onChange={(e) => setFormData({...formData, instructions: e.target.value})}
              />
            </div>
          </div>
        </div>

        {type === 'recipe' && (
          <div className="mt-8">
            <label className="block text-[10px] font-black text-stone-400 uppercase mb-2">Ingredientes (Um por linha)</label>
            <textarea 
              className="w-full bg-stone-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-red-100 outline-none h-32"
              placeholder="Ex: 2 ovos&#10;1 xícara de aveia..."
              value={formData.ingredients}
              onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
            />
          </div>
        )}

        <div className="mt-12 flex flex-col items-center">
          <button 
            onClick={generateJSON}
            className="bg-stone-900 text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl active:scale-95"
          >
            Gerar Código do Post
          </button>

          {generatedCode && (
            <div className="mt-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Código pronto para o GitHub!</span>
                <button 
                  onClick={copyToClipboard}
                  className="text-xs font-bold text-stone-600 hover:text-emerald-600"
                >
                  <i className="fa-solid fa-copy mr-1"></i> Copiar Código
                </button>
              </div>
              <pre className="bg-stone-50 p-8 rounded-3xl border border-stone-100 text-[11px] font-mono text-stone-400 overflow-x-auto h-64 shadow-inner">
                {generatedCode}
              </pre>
              <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 flex items-start gap-4">
                 <i className="fa-solid fa-circle-info mt-1"></i>
                 <p><strong>Como publicar:</strong> Copie este código, vá no seu arquivo <code>constants.ts</code> no GitHub, procure por <code>MOCK_RECIPES</code> (se for receita) ou <code>MOCK_ARTICLES</code> (se for artigo) e cole logo abaixo do último colchete.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
