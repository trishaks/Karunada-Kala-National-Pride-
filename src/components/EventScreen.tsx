import { useState } from 'react';
import Layout from './Layout';
import { EVENTS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Ticket, Bell, Filter, Check, Clock } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

export default function EventScreen() {
  const [interestedEvents, setInterestedEvents] = useState<string[]>([]);
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');
  const { addNotification } = useNotifications();

  const toggleInterest = (id: string, title: string) => {
    const isInterested = interestedEvents.includes(id);
    if (!isInterested) {
      addNotification(`Expressed interest in event: ${title}`, 'event');
    }
    setInterestedEvents(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const filteredEvents = EVENTS.filter(event => (event as any).status === filter);

  return (
    <Layout title="Cultural Events Feed">
      <div className="space-y-12">
        {/* Filters & Actions */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex gap-4 p-1 bg-white rounded-full border border-slate-100 shadow-sm">
            <button 
              onClick={() => setFilter('upcoming')}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
                filter === 'upcoming' 
                ? 'bg-theme-primary text-white shadow-md' 
                : 'text-slate-400 hover:text-theme-primary'
              }`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setFilter('past')}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
                filter === 'past' 
                ? 'bg-theme-primary text-white shadow-md' 
                : 'text-slate-400 hover:text-theme-primary'
              }`}
            >
              Past Events
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white rounded-xl border border-slate-200 text-slate-400 hover:text-theme-primary transition-colors shadow-sm">
              <Filter className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                addNotification('Notifications enabled for new culture events!', 'info');
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm bg-white text-theme-primary border-2 border-theme-primary hover:bg-theme-primary hover:text-white"
            >
              <Bell className="w-5 h-5" /> 
              Notify Me
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {filteredEvents.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                  <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-400 font-medium">No events found for this category.</p>
                </div>
              ) : (
                filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-card flex flex-col md:flex-row overflow-hidden group hover:shadow-xl transition-all border-slate-100 bg-white ${filter === 'past' ? 'grayscale-[0.5] opacity-80' : ''}`}
                  >
                    {/* Date Box */}
                    <div className={`md:w-48 flex flex-col items-center justify-center p-8 text-center ${filter === 'past' ? 'bg-slate-500' : 'bg-theme-primary'}`}>
                      <span className="text-sm uppercase tracking-[0.2em] font-medium opacity-70 text-white">
                        {new Date(event.date).toLocaleDateString(undefined, { month: 'short' })}
                      </span>
                      <span className="text-6xl font-serif font-bold text-white leading-tight">
                        {event.date.split('-')[2]}
                      </span>
                      <span className="text-sm font-bold opacity-70 text-white">
                        {event.date.split('-')[0]}
                      </span>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 p-8 md:p-12 space-y-6">
                      <div className="flex items-center gap-3">
                        {filter === 'past' && (
                          <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" /> CONCLUDED
                          </span>
                        )}
                        <h3 className="text-3xl font-serif font-bold group-hover:text-theme-primary transition-colors text-slate-900">{event.title}</h3>
                      </div>
                      <p className="text-lg text-slate-500 line-clamp-2 max-w-2xl">{event.description}</p>

                      <div className="flex flex-wrap gap-8">
                        <div className="flex items-center gap-3 text-slate-400">
                          <MapPin className="w-5 h-5 text-theme-primary" />
                          <span className="text-sm font-medium">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-400">
                          <Calendar className="w-5 h-5 text-theme-primary" />
                          <span className="text-sm font-medium">
                            {filter === 'upcoming' ? 'Starts 6:30 PM Onwards' : 'Successfully Conducted'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="p-8 md:p-12 flex items-center justify-center bg-slate-50 border-l border-slate-100 min-w-[200px]">
                      {filter === 'upcoming' ? (
                        <button 
                          onClick={() => toggleInterest(event.id, event.title)}
                          className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold transition-all transform active:scale-95 shadow-sm ${
                            interestedEvents.includes(event.id)
                            ? 'bg-theme-primary text-white border border-theme-primary'
                            : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {interestedEvents.includes(event.id) ? <Check className="w-5 h-5" /> : <Ticket className="w-5 h-5" />}
                          {interestedEvents.includes(event.id) ? 'Selected' : 'Interested'}
                        </button>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                          <Check className="w-8 h-8 opacity-50" />
                          <span className="text-xs font-bold uppercase tracking-widest">Completed</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Suggest Section */}
        <section className="bg-purple-50 p-12 rounded-[3rem] border border-purple-100 mt-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-2 text-slate-900">Hosting a Cultural Event?</h2>
            <p className="text-slate-500">List your Yakshagana, Folk Dance or Traditional shows on Karunada Kala.</p>
          </div>
          <button 
            onClick={() => {
              addNotification('Event submission form requested', 'info');
              alert("Submission functionality coming soon!");
            }}
            className="whitespace-nowrap px-8 py-4 bg-theme-primary text-white rounded-full font-bold hover:bg-theme-secondary transition-all shadow-lg active:scale-95"
          >
            Submit Your Event
          </button>
        </section>
      </div>
    </Layout>
  );
}
