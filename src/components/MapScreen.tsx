import Layout from './Layout';
import { ARTISANS } from '../constants';
import { motion } from 'motion/react';
import { MapPin, Phone, Search, Users, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function MapScreen() {
  const [selectedArtisan, setSelectedArtisan] = useState(ARTISANS[0]);
  const [search, setSearch] = useState('');
  const [artFilter, setArtFilter] = useState('All');

  const artTypes = ['All', ...new Set(ARTISANS.map(a => a.artType))];

  const filteredArtisans = ARTISANS.filter(artisan => {
    const matchesSearch = artisan.name.toLowerCase().includes(search.toLowerCase()) || 
                         artisan.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = artFilter === 'All' || artisan.artType === artFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout title="Artisan Map">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-250px)]">
        {/* Sidebar: Artisan List */}
        <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-3 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search artisans or locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-theme-primary/50 text-slate-900"
              />
            </div>
            
            <select 
              value={artFilter}
              onChange={(e) => setArtFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-theme-primary/50 text-slate-900"
            >
              {artTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {filteredArtisans.map((artisan) => (
              <motion.button
                key={artisan.id}
                onClick={() => setSelectedArtisan(artisan)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                  selectedArtisan.id === artisan.id 
                    ? 'bg-theme-primary border-theme-primary text-white shadow-lg' 
                    : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-serif font-bold text-lg ${selectedArtisan.id === artisan.id ? 'text-white' : 'text-slate-900'}`}>{artisan.name}</h3>
                  <div className={`p-1.5 rounded-lg ${selectedArtisan.id === artisan.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
                <p className={`text-sm mb-4 ${selectedArtisan.id === artisan.id ? 'text-white/80' : 'text-slate-400'}`}>
                  {artisan.artType} • {artisan.location}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  View Profile <ExternalLink className="w-3 h-3" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Map View Placeholder */}
        <div className="lg:col-span-2 relative glass-card overflow-hidden min-h-[400px]">
          {/* Stylized Map Backdrop */}
          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
            <div className="w-full h-full opacity-50 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i10!2i742!3i476!2m3!1e0!2sm!3i668045618!3m8!2sen!3sin!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2!23i1301875')] bg-cover" />
            
            {/* Markers */}
            {filteredArtisans.map((artisan) => (
              <motion.div
                key={artisan.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setSelectedArtisan(artisan)}
                className={`absolute cursor-pointer transition-transform duration-300 ${
                  selectedArtisan.id === artisan.id ? 'z-20' : 'z-10'
                }`}
                style={{ 
                  left: `${(artisan.lng - 74) / 4.5 * 80 + 10}%`, 
                  top: `${(18.5 - artisan.lat) / 7 * 80 + 10}%` 
                }}
              >
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-xl transition-colors ${
                    selectedArtisan.id === artisan.id ? 'bg-theme-primary' : 'bg-theme-secondary'
                  }`}>
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  {selectedArtisan.id === artisan.id && (
                    <motion.div 
                      layoutId="pulse"
                      className="absolute inset-0 bg-theme-primary rounded-full animate-ping opacity-40 -z-10" 
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map Overlay: Selected Artisan Info */}
          <motion.div
            key={selectedArtisan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xl border border-slate-200 p-6 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-6 text-center md:text-left">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center font-bold text-2xl text-theme-primary shadow-inner">
                {selectedArtisan.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">{selectedArtisan.name}</h2>
                <p className="text-slate-600 font-medium">{selectedArtisan.artType}</p>
                <p className="text-slate-400 text-sm flex items-center justify-center md:justify-start gap-1">
                  <MapPin className="w-3 h-3" /> {selectedArtisan.location}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href={`tel:${selectedArtisan.phone}`}
                className="bg-theme-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-theme-secondary transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" /> Call Now
              </a>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedArtisan.lat},${selectedArtisan.lng}`}
                target="_blank"
                rel="noreferrer"
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center"
              >
                Directions
              </a>
            </div>
          </motion.div>

          <div className="absolute top-8 right-8 flex flex-col gap-2">
             <div className="bg-white/80 p-3 rounded-full border border-slate-200 text-slate-400 hover:text-theme-primary cursor-pointer shadow-sm"><Users className="w-5 h-5" /></div>
             <div className="bg-white/80 p-3 rounded-full border border-slate-200 text-slate-400 hover:text-theme-primary cursor-pointer shadow-sm"><MapPin className="w-5 h-5" /></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
