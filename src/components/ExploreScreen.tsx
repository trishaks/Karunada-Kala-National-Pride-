import Layout from './Layout';
import { ART_FORMS } from '../constants';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  
  const filteredArts = ART_FORMS.filter(art => 
    art.title.toLowerCase().includes(search.toLowerCase()) || 
    art.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Art Explorer">
      <div className="space-y-12">
        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search for art forms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-theme-primary/50 text-slate-900 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArts.map((art, index) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/explore/${art.id}`} className="block group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 h-full">
                <div className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-theme-primary transition-colors">{art.title}</h3>
                    <div className="text-theme-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-slate-500 leading-relaxed line-clamp-4">
                    {art.description}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-theme-primary text-xs uppercase tracking-[0.2em] font-bold">
                    View Details
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
