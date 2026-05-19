import { useParams, Link } from 'react-router-dom';
import Layout from './Layout';
import { ARTISANS } from '../constants';
import { Phone, MapPin, Award, Star, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export default function ArtisanProfileScreen() {
  const { id } = useParams();
  const artisan = ARTISANS.find(a => a.id === id);

  if (!artisan) return <div className="flex items-center justify-center min-h-screen">Artisan not found</div>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12 pb-20">
        <Link to="/map" className="text-slate-400 hover:text-theme-primary flex items-center gap-2 uppercase tracking-widest text-xs font-bold transition-colors">
          Back to Map
        </Link>

        {/* Profile Header */}
        <div className="glass-card p-12 shadow-2xl flex flex-col md:flex-row items-center gap-12 border-slate-100 bg-white">
          <div className="relative">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-100">
               <div className="w-full h-full bg-gradient-to-br from-theme-secondary to-theme-primary flex items-center justify-center text-6xl font-serif text-white uppercase">
                 {artisan.name.charAt(0)}
               </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-theme-primary text-white p-3 rounded-full shadow-lg">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
              <h1 className="text-4xl font-serif font-bold text-slate-900">{artisan.name}</h1>
              <span className="px-4 py-1 bg-purple-50 text-theme-primary border border-purple-100 rounded-full text-xs font-bold uppercase tracking-widest">
                Master Artist
              </span>
            </div>
            <p className="text-xl text-theme-secondary mb-6 font-medium">{artisan.artType}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-theme-primary" /> {artisan.location}
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-theme-secondary fill-theme-secondary" /> 4.9 (120+ Students)
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Bio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Contact Information</h2>
            <div className="glass-card p-8 space-y-4 bg-white border-slate-100 shadow-xl">
              <div className="flex items-center gap-4 text-slate-700 p-4 bg-slate-50 rounded-2xl">
                <Phone className="w-6 h-6 text-theme-primary" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Phone</p>
                  <p className="text-lg font-bold">{artisan.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-700 p-4 bg-slate-50 rounded-2xl">
                <Mail className="w-6 h-6 text-theme-primary" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Email</p>
                  <p className="text-lg font-bold">{artisan.name.toLowerCase().replace(' ', '.')}@craft.in</p>
                </div>
              </div>
              <a 
                href={`tel:${artisan.phone}`}
                className="w-full purple-gradient text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg mt-2 transition-transform hover:scale-[1.02]"
              >
                <Phone className="w-5 h-5" /> Call to Consult
              </a>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">About the Craft</h2>
            <div className="text-lg text-slate-600 leading-relaxed space-y-4">
              <p>
                A third-generation practitioner of {artisan.artType}, dedicated to preserving the ancient techniques passed down through centuries.
              </p>
              <p>
                Specializes in using natural dyes and traditional wood-carving methods that define the authentic soul of Karnataka's handicraft heritage.
              </p>
              <div className="flex gap-2 pt-4">
                 {[1,2,3].map(i => (
                   <div key={i} className="flex-1 aspect-square bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-tr from-slate-200 to-transparent opacity-50" />
                   </div>
                 ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
