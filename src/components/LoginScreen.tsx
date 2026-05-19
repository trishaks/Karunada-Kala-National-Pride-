import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, UserPlus } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate inputs
    if (email && password) {
      onLogin();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with the "mood" of the image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1541052391670-29621da74a81?auto=format&fit=crop&q=80&w=1600")',
          filter: 'brightness(0.3) contrast(1.2)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-theme-primary mb-2 tracking-tighter"
          >
            Karunada Kala
          </motion.h1>
          <p className="text-slate-600 font-serif italic text-lg uppercase tracking-widest opacity-80">
            Source of National Pride
          </p>
        </div>

        <div className="glass-card p-8 shadow-2xl border-slate-100 bg-white/90">
          <h2 className="text-2xl font-serif text-slate-900 mb-6">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-theme-primary/50 text-slate-900 transition-colors"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-theme-primary/50 text-slate-900 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full purple-gradient text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg group"
            >
              {isSignUp ? 'Sign Up' : 'Continue'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-theme-primary hover:text-theme-secondary transition-colors flex items-center gap-2 group font-medium"
            >
              <UserPlus className="w-4 h-4" />
              {isSignUp ? 'Already have an account? Log in' : 'New here? Create an account'}
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400 uppercase tracking-[0.2em] font-medium">
          Preserving the Heart of Karnataka
        </p>
      </motion.div>
    </div>
  );
}
