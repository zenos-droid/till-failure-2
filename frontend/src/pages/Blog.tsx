import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, User, Clock, ChevronRight, X, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { blogPostsData } from '../data';
import { BlogPost } from '../types';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Training' | 'Nutrition' | 'Mindset'>('All');
  const [expandedBlog, setExpandedBlog] = useState<BlogPost | null>(null);

  const filteredBlogs = blogPostsData.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Training', 'Nutrition', 'Mindset'] as const;

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      
      {/* 1. TYPOGRAPHIC MAGAZINE HERO */}
      <section className="bg-linear-to-b from-zinc-900 via-zinc-950 to-zinc-950 px-4 py-20 border-b border-zinc-900 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 h-52 w-92 rounded-full bg-amber-500/5 blur-[120px]" />
        
        <div className="relative max-w-3xl mx-auto z-10 space-y-4">
          <span className="font-mono text-xs font-black tracking-[0.3em] text-amber-500 uppercase">
            // RIGOROUS STRENGTH JOURNAL
          </span>
          <h1 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-tight">
            THE TILL FAILURE DIARIES
          </h1>
          <p className="font-sans text-xs sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            No lifestyle fluff. Master extreme progressive overload mechanics, study Calcutta lipid nutrition profiles, and program with tactical clarity.
          </p>

          {/* Search controls + Categori bar */}
          <div className="pt-8 max-w-md mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search lifting parameters (e.g. sattu)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3.5 pl-11 pr-4 font-sans text-xs text-white placeholder-zinc-650 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-1.5 pt-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-1.5 px-3.5 rounded mt-0.5 font-mono text-[9px] uppercase font-black tracking-widest transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-black font-extrabold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHRONOLOGY FEED */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                onClick={() => setExpandedBlog(blog)}
                className="group cursor-pointer rounded-2xl border border-zinc-900 bg-zinc-950 overflow-hidden shadow-xl hover:border-amber-500/30 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-zinc-900">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    
                    <span className="absolute bottom-4 left-5 bg-amber-500 text-black font-mono text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                      {blog.category}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 space-y-3">
                    
                    {/* Meta indices */}
                    <div className="flex items-center gap-4 font-mono text-[9px] text-zinc-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    <h3 className="font-sans text-lg sm:text-xl font-black text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors leading-snug">
                      {blog.title}
                    </h3>

                    <p className="font-sans text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>

                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0 border-t border-zinc-905 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400">
                    <User className="h-3.5 w-3.5 text-amber-500" />
                    <span>By {blog.author}</span>
                  </div>
                  
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] font-black tracking-widest text-[#FFE259] uppercase">
                    READ ARTICLE
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950 py-16 text-center max-w-sm mx-auto space-y-3">
            <BookOpen className="h-10 w-10 text-zinc-650 mx-auto animate-pulse" />
            <h3 className="font-sans font-black text-zinc-400 uppercase tracking-widest">
              Zero Matches Found
            </h3>
            <p className="font-sans text-xs text-zinc-500 leading-relaxed">
              We haven't compiled logs on that parameter yet. Try standard query streams like 'Macros'.
            </p>
          </div>
        )}

      </section>

      {/* 3. EXPAND READER MODAL */}
      <AnimatePresence>
        {expandedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedBlog(null)}
              className="absolute inset-x-0 inset-y-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-850 rounded-2xl overflow-y-auto max-h-[85vh] p-6 sm:p-10 shadow-2xl z-10"
            >
              <button
                onClick={() => setExpandedBlog(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="h-5.5 w-5.5" />
              </button>

              <div className="space-y-6">
                
                {/* Meta block */}
                <div className="pt-2">
                  <span className="bg-amber-500 text-black font-mono text-[9px] font-black px-2.5 py-1 rounded uppercase tracking-wider inline-block">
                    {expandedBlog.category}
                  </span>
                  <div className="flex flex-wrap gap-4 items-center mt-3 font-mono text-[10px] text-zinc-500">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {expandedBlog.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {expandedBlog.readTime}</span>
                    <span className="flex items-center gap-1 text-white font-bold"><User className="h-3.5 w-3.5 text-amber-500" /> By {expandedBlog.author}</span>
                  </div>
                </div>

                <h2 className="font-sans text-xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                  {expandedBlog.title}
                </h2>

                <div className="relative rounded-xl overflow-hidden h-48 sm:h-72 border border-zinc-900">
                  <img
                    src={expandedBlog.imageUrl}
                    alt={expandedBlog.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                </div>

                <div className="font-sans text-xs sm:text-sm text-zinc-300 space-y-4 leading-relaxed pr-1">
                  {expandedBlog.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="border-t border-zinc-900 pt-5 mt-8 flex flex-wrap gap-1.5 items-center">
                  <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest font-black block mr-2">
                    Lifting Indices Tagged:
                  </span>
                  {expandedBlog.tags.map(tag => (
                    <span key={tag} className="font-sans text-[10px] text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-zinc-910 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="font-sans text-[11px] text-zinc-500">
                    Need customized nutritional math? Consult Coach Suman Ghosh.
                  </span>
                  <button
                    onClick={() => setExpandedBlog(null)}
                    className="w-full sm:w-auto rounded-lg bg-zinc-900 text-white font-mono text-[10px] uppercase font-bold py-2.5 px-4 text-center border border-zinc-800"
                  >
                    Finish reading
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
