/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NotificationProvider } from './context/NotificationContext';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import ExploreScreen from './components/ExploreScreen';
import MapScreen from './components/MapScreen';
import WorkshopScreen from './components/WorkshopScreen';
import EventScreen from './components/EventScreen';
import ArtDetailScreen from './components/ArtDetailScreen';
import ArtisanProfileScreen from './components/ArtisanProfileScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NotificationProvider>
      <Router>
        <div className="min-h-screen bg-white text-theme-light selection:bg-theme-primary selection:text-white">
          <Routes>
            <Route 
              path="/login" 
              element={!isAuthenticated ? <LoginScreen onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/" 
              element={isAuthenticated ? <HomeScreen /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/explore" 
              element={isAuthenticated ? <ExploreScreen /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/explore/:id" 
              element={isAuthenticated ? <ArtDetailScreen /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/map" 
              element={isAuthenticated ? <MapScreen /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/workshops" 
              element={isAuthenticated ? <WorkshopScreen /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/events" 
              element={isAuthenticated ? <EventScreen /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/artisan/:id" 
              element={isAuthenticated ? <ArtisanProfileScreen /> : <Navigate to="/login" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </NotificationProvider>
  );
}

