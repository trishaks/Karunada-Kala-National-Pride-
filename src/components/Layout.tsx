import { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Map, Calendar, LogOut, Info, Bell, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNotifications } from '../context/NotificationContext';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const { notifications, clearNotifications } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white pb-20 md:pb-0">
      {/* Desktop Sidebar Navigation */}
      <nav className="hidden md:flex md:w-20 lg:w-64 bg-slate-50 border-r border-slate-200 flex-col items-center lg:items-stretch h-screen sticky top-0 z-50">
        <div className="p-6 flex items-center justify-center lg:justify-start gap-3">
          <div className="w-10 h-10 bg-theme-primary rounded-xl flex items-center justify-center font-bold text-white text-2xl shadow-lg ring-4 ring-purple-50">
            K
          </div>
          <span className="hidden lg:block font-serif font-bold text-xl text-slate-900 tracking-tighter">
            Karunada Kala
          </span>
        </div>

        <div className="flex-1 px-4 py-8 space-y-6">
          <NavItem to="/" icon={<Home />} label="Home" />
          <NavItem to="/explore" icon={<Compass />} label="Art Explorer" />
          <NavItem to="/map" icon={<Map />} label="Artisan Map" />
          <NavItem to="/events" icon={<Calendar />} label="Events" />
          <NavItem to="/workshops" icon={<Info />} label="Workshops" />
          
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-full flex items-center justify-center lg:justify-start gap-4 p-4 rounded-2xl transition-all duration-300 group text-slate-400 hover:bg-purple-50 hover:text-theme-primary relative"
          >
            <span className="w-6 h-6"><Bell /></span>
            <span className="hidden lg:block font-medium tracking-wide">Notifications</span>
            {notifications.length > 0 && (
              <span className="absolute top-3 right-3 lg:static lg:ml-auto w-2 h-2 rounded-full bg-theme-primary ring-2 ring-white" />
            )}
          </button>
        </div>

        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={() => window.location.href = '/login'} 
            className="w-full flex items-center justify-center lg:justify-start gap-4 p-4 text-slate-400 hover:text-theme-primary transition-colors rounded-xl font-medium"
          >
            <LogOut className="w-6 h-6" />
            <span className="hidden lg:block">Logout</span>
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 px-6 py-3 flex justify-between items-center z-[50]">
        <MobileNavItem to="/" icon={<Home />} label="Home" />
        <MobileNavItem to="/explore" icon={<Compass />} label="Explore" />
        <MobileNavItem to="/map" icon={<Map />} label="Map" />
        <MobileNavItem to="/events" icon={<Calendar />} label="Events" />
        <button 
          onClick={() => setShowNotifications(true)}
          className="flex flex-col items-center gap-1 text-slate-400 relative"
        >
          <Bell className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Alerts</span>
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-theme-primary border-2 border-white" />
          )}
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-theme-secondary/5 rounded-full blur-[80px] -z-10 -translate-x-1/2 translate-y-1/2" />

        <div className="p-8 md:p-12 max-w-7xl mx-auto w-full">
          {title && (
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-serif font-bold mb-12"
            >
              {title}
            </motion.h1>
          )}
          {children}
        </div>
      </main>

      {/* Notifications Sidebar */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifications(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-[70] border-l border-slate-200 flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-serif font-bold text-slate-900">Activity</h2>
                  <span className="px-2 py-0.5 bg-theme-primary/10 text-theme-primary text-xs font-bold rounded-full">
                    {notifications.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {notifications.length > 0 && (
                    <button 
                      onClick={clearNotifications}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      title="Clear all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {notifications.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <Bell className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">No activity yet</h3>
                    <p className="text-slate-500 text-sm">Activities like event interests and workshop bookings will show up here.</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <motion.div 
                      key={notif.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex gap-4"
                    >
                      <div className={`mt-1 shrink-0 w-2 h-2 rounded-full ${
                        notif.type === 'success' ? 'bg-emerald-500' :
                        notif.type === 'event' ? 'bg-theme-primary' :
                        notif.type === 'workshop' ? 'bg-theme-secondary' : 'bg-slate-400'
                      }`} />
                      <div>
                        <p className="text-slate-900 font-medium leading-relaxed mb-1">{notif.message}</p>
                        <span className="text-xs text-slate-400 font-medium tracking-wide">
                          {notif.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavItem({ to, icon, label }: { to: string; icon: any; label: string }) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => `
        flex flex-col items-center gap-1 transition-all duration-300
        ${isActive ? 'text-theme-primary' : 'text-slate-400'}
      `}
    >
      <span className="w-6 h-6">{icon}</span>
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </NavLink>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: any; label: string }) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => `
        flex items-center justify-center lg:justify-start gap-4 p-4 rounded-2xl transition-all duration-300 group
        ${isActive ? 'bg-theme-primary text-white shadow-lg' : 'text-slate-400 hover:bg-purple-50 hover:text-theme-primary'}
      `}
    >
      {({ isActive }) => (
        <>
          <span className="w-6 h-6">{icon}</span>
          <span className="hidden lg:block font-medium tracking-wide">{label}</span>
          <div className="hidden lg:block ml-auto">
            <motion.div 
              initial={false}
              animate={{ scale: isActive ? 1 : 0 }}
              className="w-1.5 h-1.5 rounded-full bg-white transition-opacity" 
            />
          </div>
        </>
      )}
    </NavLink>
  );
}
