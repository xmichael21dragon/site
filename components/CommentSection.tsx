
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Comment } from '../types';

interface CommentSectionProps {
  contentId: string;
  type: 'recipe' | 'article';
}

const CommentSection: React.FC<CommentSectionProps> = ({ contentId, type }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [contentId]);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('content_id', contentId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error('Erro ao buscar comentários:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    setIsSubmitting(true);
    try {
      const newComment = {
        content_id: contentId,
        user_name: name.trim(),
        comment: text.trim(),
        rating: type === 'recipe' ? rating : null,
        type: type,
        created_at: new Date().toISOString()
      };

      const { error } = await supabase.from('comments').insert([newComment]);
      if (error) throw error;

      setName('');
      setText('');
      setRating(5);
      fetchComments();
    } catch (err) {
      alert('Erro ao enviar comentário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <section className="mt-20 border-t border-stone-100 pt-20">
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-3xl font-black text-stone-800 tracking-tighter">
          {type === 'recipe' ? 'Opiniões e Avaliações' : 'Comentários e Perguntas'}
        </h3>
        <span className="bg-stone-100 px-4 py-2 rounded-xl text-xs font-black text-stone-500 uppercase tracking-widest">
          {comments.length} interações
        </span>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3rem] border border-stone-100 shadow-xl mb-16 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-2">Seu Nome</label>
            <input 
              type="text" 
              placeholder="Como quer ser chamado?"
              className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-stone-900 outline-none transition-all font-bold text-stone-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {type === 'recipe' && (
            <div className="space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-2">Sua Nota</label>
              <div className="flex gap-2 h-[60px] items-center px-4 bg-stone-50 rounded-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-xl transition-all ${star <= rating ? 'text-yellow-400 scale-110' : 'text-stone-200 hover:text-yellow-200'}`}
                  >
                    <i className="fa-solid fa-star"></i>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-2 mb-8">
          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-2">Sua Mensagem</label>
          <textarea 
            placeholder={type === 'recipe' ? "O que achou do sabor? Fez alguma substituição?" : "Tire sua dúvida ou compartilhe sua opinião..."}
            className="w-full px-6 py-4 rounded-3xl bg-stone-50 border-2 border-transparent focus:border-stone-900 outline-none transition-all font-medium text-stone-800 h-32 resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full md:w-auto px-12 py-4 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-stone-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Publicar Agora'}
        </button>
      </form>

      <div className="space-y-8">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-6 group animate-fade-in">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 font-black text-sm group-hover:bg-stone-900 group-hover:text-white transition-all shadow-sm">
                  {getInitials(comment.user_name)}
                </div>
              </div>
              <div className="flex-grow bg-white p-8 rounded-[2.5rem] border border-stone-50 shadow-sm group-hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-black text-stone-800 text-lg leading-none">{comment.user_name}</h4>
                    <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest mt-2 block">
                      {new Date(comment.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  {comment.rating && (
                    <div className="flex gap-1 text-yellow-400 text-xs">
                      {Array.from({ length: comment.rating }).map((_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-stone-600 leading-relaxed font-medium">{comment.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-stone-50/50 rounded-[3rem] border-2 border-dashed border-stone-100">
            <i className="fa-regular fa-comments text-5xl text-stone-200 mb-6"></i>
            <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Seja o primeiro a comentar!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentSection;
