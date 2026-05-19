import { useParams, Link } from 'react-router-dom';
import Layout from './Layout';
import { ART_FORMS } from '../constants';
import { motion } from 'motion/react';
import { ArrowLeft, Play, History, Info } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { useEffect } from 'react';

export default function ArtDetailScreen() {
  const { id } = useParams();
  const art = ART_FORMS.find(a => a.id === id);
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (art) {
      addNotification(`Explored ${art.title} heritage`, 'info');
    }
  }, [id, art]);

  if (!art) return <div className="flex items-center justify-center h-screen">Art not found</div>;

  return (
    <Layout>
      <div className="space-y-12 pb-20">
        <Link to="/explore" className="inline-flex items-center gap-2 text-slate-400 hover:text-theme-primary transition-colors mb-4 group uppercase tracking-widest text-xs font-bold">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Explorer
        </Link>

        {/* Hero Section - Text Only */}
        <div className="py-20 border-b border-slate-100 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-theme-secondary">
              <span className="w-8 h-[1px] bg-theme-secondary/50" />
              <span className="text-xs uppercase tracking-[0.3em] font-medium">Karnataka Heritage</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-serif font-bold text-slate-900 tracking-tight">
              {art.title}
            </h1>
          </motion.div>
        </div>

        {/* Content Tabs/Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-theme-secondary">
                <div className="w-12 h-12 rounded-full bg-theme-secondary/10 flex items-center justify-center">
                  <Info className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">About</h2>
              </div>
              <p className="text-xl text-slate-700 leading-relaxed font-serif">
                {art.description}
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 text-theme-primary">
                <div className="w-12 h-12 rounded-full bg-theme-primary/10 flex items-center justify-center">
                  <History className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">History & Origins</h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed">
                {art.history}
              </p>
            </section>
          </div>

          {/* Sidebar / Quick Actions */}
          <div className="space-y-8">
            <div className="glass-card p-8 shadow-xl bg-white sticky top-32 border-slate-100">
              <h3 className="text-xl font-serif font-bold mb-6 text-theme-primary">Experience This</h3>
              <div className="space-y-4">
                <Link 
                  to={`/workshops?art=${art.id}`} 
                  className="w-full purple-gradient text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg"
                >
                  Book a Workshop
                </Link>
                <Link to="/map" className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                  Find Artisans
                </Link>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Categories</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-xs text-theme-secondary font-bold">Dance</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-xs text-theme-secondary font-bold">Drama</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-xs text-theme-secondary font-bold">Mythology</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
