import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Theme } from '../types';
import { themes } from '../styles/themes';

interface Props {
  theme: Theme;
}

export const Navigation: React.FC<Props> = ({ theme }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { key: 'about', path: '/' },
    { key: 'education', path: '/education' },
    { key: 'experience', path: '/experience' },
    { key: 'projects', path: '/projects' },
    { key: 'contact', path: '/contact' }
  ];

  // Desktop Navigation
  const DesktopNav = () => (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 backdrop-blur-md rounded-full shadow-lg px-6 py-3 z-40 hidden md:block">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-center gap-6"
      >
        {navItems.map(({ key, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={key}
              to={path}
              className={`relative px-4 py-2 rounded-full transition-colors text-base whitespace-nowrap ${
                isActive 
                  ? `${themes[theme].accent} font-medium`
                  : `${themes[theme].text} hover:${themes[theme].accent}`
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 rounded-full ${themes[theme].card} ${themes[theme].border} -z-10`}
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              <div>{t(`nav.${key}`)}</div>
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );

  // Mobile Navigation
  const MobileNav = () => (
    <div className="block md:hidden">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`fixed top-4 right-4 p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-purple-500 hover:text-white transition-all transform hover:scale-110 z-50`}
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          {isMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 backdrop-blur-md bg-black/50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`fixed top-0 right-0 h-full w-64 ${themes[theme].primary} shadow-xl z-50`}
            >
              <div className="flex flex-col p-6 h-full">
                <div className="flex-1 flex flex-col gap-4 mt-16">
                  {navItems.map(({ key, path }, index) => {
                    const isActive = location.pathname === path;
                    return (
                      <motion.div
                        key={key}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          delay: 0.1 * index,
                          type: "spring",
                          damping: 20,
                          stiffness: 200
                        }}
                      >
                        <Link
                          to={path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`relative block px-4 py-3 rounded-xl transition-all transform hover:scale-105 ${
                            isActive 
                              ? `${themes[theme].accent} font-medium ${themes[theme].card}`
                              : `${themes[theme].text} hover:${themes[theme].accent}`
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="mobileActiveTab"
                              className={`absolute inset-0 rounded-xl ${themes[theme].card} ${themes[theme].border} -z-10`}
                            />
                          )}
                          <div className="text-lg font-medium">{t(`nav.${key}`)}</div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
};