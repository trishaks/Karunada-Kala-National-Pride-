import Layout from './Layout';
import { motion } from 'motion/react';
import { Compass, Map, Calendar, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';

export default function HomeScreen() {
  const userName = "Art Enthusiast"; // Placeholder
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Only add a welcome notification once per session conceptually, 
    // but for demo purposes, we'll add it on mount.
    // In a real app we might check a session storage flag.
    const hasWelcomed = sessionStorage.getItem('hasWelcomed');
    if (!hasWelcomed) {
      addNotification(`Welcome to Karunada Kala, ${userName}!`, 'info');
      sessionStorage.setItem('hasWelcomed', 'true');
    }
  }, []);

  return (
    <Layout>
      <div className="space-y-12">
        <header className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-theme-secondary"
          >
            <span className="w-8 h-[1px] bg-theme-secondary/50" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">Welcome Back</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-7xl font-serif font-bold tracking-tight text-slate-900"
          >
            Welcome, <br />
            <span className="text-theme-primary">{userName}</span>
          </motion.h1>
          <p className="text-slate-500 max-w-xl text-lg mt-4">
            Step into the vibrant world of Karnataka's heritage. Explore ancient art forms, find master artisans, and witness the magic of our cultural roots.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard 
            to="/explore"
            icon={<Compass className="w-8 h-8" />}
            title="Art Explorer"
            description="Discover 30+ traditional art forms of Karnataka."
            color="bg-theme-primary"
            delay={0.2}
          />
          <DashboardCard 
            to="/map"
            icon={<Map className="w-8 h-8" />}
            title="Artisan Map"
            description="Find workshops and craft communities near you."
            color="bg-theme-secondary"
            delay={0.3}
          />
          <DashboardCard 
            to="/events"
            icon={<Calendar className="w-8 h-8" />}
            title="Live Events"
            description="Don't miss the next Yakshagana performance."
            color="bg-theme-primary/20"
            delay={0.4}
          />
          <DashboardCard 
            to="/workshops"
            icon={<Info className="w-8 h-8" />}
            title="Workshops"
            description="Learn from the masters. Sign up for a class."
            color="bg-white/5"
            delay={0.5}
          />
        </div>

        {/* Featured Section - Text Overlay Card Removed */}
        <section className="pt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-slate-900">Featured Discovery</h2>
            <Link to="/explore" className="text-theme-secondary hover:text-theme-primary transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <Link to="/explore/yakshagana" className="block group">
            <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 transition-all duration-500 hover:shadow-2xl hover:shadow-theme-primary/20">
              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-2 text-theme-secondary/80">
                  <span className="text-xs uppercase tracking-[0.4em] font-bold">Highlight of the Week</span>
                </div>
                <h3 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight group-hover:text-theme-primary transition-colors">Yakshagana</h3>
                <p className="text-white/60 text-xl max-w-2xl font-serif leading-relaxed">
                  The "Celestial Song"—a brilliant blend of dance, music, and divine stories that has captivated audiences for centuries.
                </p>
              </div>
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center group-hover:bg-theme-primary transition-colors">
                <ArrowRight className="w-8 h-8 text-slate-900 group-hover:text-white" />
              </div>
            </div>
          </Link>
        </section>
      </div>
    </Layout>
  );
}

function DashboardCard({ to, icon, title, description, color, delay }: { to: string; icon: any; title: string; description: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
    >
      <Link to={to} className="glass-card p-8 flex flex-col h-full group transition-all duration-300 hover:border-theme-primary/20 hover:shadow-xl">
        <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-theme-primary transition-colors">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">{description}</p>
        <div className="flex items-center gap-2 text-theme-secondary text-xs uppercase tracking-widest font-bold group-hover:gap-4 transition-all">
          Explore <ArrowRight className="w-4 h-4" />
        </div>
      </Link>
    </motion.div>
  );
}
