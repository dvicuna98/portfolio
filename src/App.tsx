import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { Navigation } from './components/Navigation';
import { AboutPage } from './pages/AboutPage';
import { EducationPage } from './pages/EducationPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { Theme } from './types';
import { themes } from './styles/themes';

function App() {
  const [theme, setTheme] = useState<Theme>('dark1');
  
  // Determine if we're in production (GitHub Pages) or development
  const isProduction = import.meta.env.MODE === 'production';

  // Use HashRouter for GitHub Pages to handle routing correctly
  const RouterComponent = isProduction ? HashRouter : Router;

  return (
    <RouterComponent>
      <div className={`min-h-screen ${themes[theme].primary} ${themes[theme].text} transition-colors duration-300`}>
        <ThemeToggle currentTheme={theme} setTheme={setTheme} />
        <LanguageToggle />
        <Navigation theme={theme} />
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 py-16 sm:px-6 lg:px-8"
          >
            <Routes>
              <Route path="/" element={<AboutPage theme={theme} />} />
              <Route path="/about" element={<Navigate to="/" replace />} />
              <Route path="/education" element={<EducationPage theme={theme} />} />
              <Route path="/experience" element={<ExperiencePage theme={theme} />} />
              <Route path="/projects" element={<ProjectsPage theme={theme} />} />
              <Route path="/contact" element={<ContactPage theme={theme} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </RouterComponent>
  );
}

export default App;