import React, { useEffect } from 'react';
import Layout from './Layout';
import { motion, AnimatePresence } from 'motion/react';
import { ART_FORMS } from '../constants';
import { User, Phone, BookOpen, Send, Sparkles, CheckCircle2, X } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';

export default function WorkshopScreen() {
  const location = useLocation();
  const { addNotification } = useNotifications();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    artForm: ART_FORMS[0].id,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const artId = params.get('art');
    if (artId && ART_FORMS.some(a => a.id === artId)) {
      setFormData(prev => ({ ...prev, artForm: artId }));
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const artFormTitle = ART_FORMS.find(a => a.id === formData.artForm)?.title || formData.artForm;
    addNotification(`Requested registration for ${artFormTitle} workshop`, 'workshop');
    setIsSubmitted(true);
    // Don't auto-close, let user close it
  };

  return (
    <Layout title="Workshop Signup">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Visual Content - Text Based Decorative Box */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-theme-primary/20 blur-3xl rounded-full -z-10" />
            <div className="rounded-[3rem] bg-slate-900 p-12 md:p-16 shadow-2xl flex flex-col justify-center items-center text-center aspect-[4/3]">
              <Sparkles className="w-16 h-16 text-theme-secondary mb-8" />
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Master Class Series</h2>
              <p className="text-white/60 text-xl font-serif leading-relaxed max-w-sm">
                Authentic learning experiences directly from heritage practitioners.
              </p>
            </div>
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-3xl font-serif font-bold text-theme-primary">Why join a workshop?</h2>
            <ul className="space-y-4">
              <BenefitItem text="Hands-on training by National Award winning artisans." />
              <BenefitItem text="All materials provided for the course duration." />
              <BenefitItem text="Certified course supporting cultural preservation." />
              <BenefitItem text="Direct interaction with local craft communities." />
            </ul>
          </div>
        </div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-12 shadow-2xl border-slate-100 bg-white"
        >
          <div className="mb-10">
            <h3 className="text-2xl font-serif font-bold mb-2 text-slate-900">Request Enrollment</h3>
            <p className="text-slate-500">Select your interest and we'll notify you of the next available batch.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-theme-primary/50 text-slate-900"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-theme-primary/50 text-slate-900"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Selected Art Form</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <select 
                  value={formData.artForm}
                  onChange={(e) => setFormData({...formData, artForm: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-theme-primary/50 appearance-none text-slate-900"
                >
                  {ART_FORMS.map(art => (
                    <option key={art.id} value={art.id} className="bg-white">{art.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full purple-gradient text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg hover:scale-[1.01] transition-transform active:scale-[0.99]"
            >
              Confirm Registration Request <Send className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitted(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[2.5rem] p-12 max-w-lg w-full shadow-2xl text-center space-y-8"
            >
              <button 
                onClick={() => setIsSubmitted(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-serif font-bold text-slate-900">Registration Complete!</h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Thank you for your interest in preserving Karnataka's heritage. Our master artisan coordinator will reach out to you within 24 hours to confirm your batch timings.
                </p>
              </div>

              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-theme-primary transition-colors duration-300 shadow-xl"
              >
                Got it, thank you!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-4 text-slate-600">
      <div className="mt-1.5 w-2 h-2 rounded-full bg-theme-primary shadow-[0_0_10px_#7c3aed]" />
      <span className="text-lg leading-relaxed">{text}</span>
    </li>
  );
}
