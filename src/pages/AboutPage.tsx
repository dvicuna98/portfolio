import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {Download, Terminal, Code2, Database, Server, Globe2, Layout} from 'lucide-react';
import { Link } from 'react-router-dom';
import portfolioData from '../data/portfolio.json';
import { Theme } from '../types';
import { themes } from '../styles/themes';

interface Props {
  theme: Theme;
}

export const AboutPage: React.FC<Props> = ({ theme }) => {
  const { t, i18n } = useTranslation();
  const { title, description, cvUrl } = portfolioData.about[i18n.language];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-purple-500/30">
                  <img
                    src="/assets/images/me.webp"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0"
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.h1 
                className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {title}
              </motion.h1>
            </div>
            <motion.p 
              className={`text-xl leading-relaxed mb-8 ${themes[theme].text}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 flex-wrap"
            >
              <motion.a
                href={cvUrl}
                download
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
                whileHover={{ y: -5, scale: 1.05, height: "auto" }}
                transition={{ duration: 0.2 }}
              >
                <Download size={20} />
                {t('common.downloadCV')}
              </motion.a>
              <motion.div
                whileHover={{ y: -5, scale: 1.05, height: "auto" }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/contact"
                  className={`inline-flex items-center gap-2 px-8 py-4 ${themes[theme].card} ${themes[theme].border} rounded-full transition-all transform hover:scale-105 shadow-lg ${themes[theme].hover}`}
                >
                  <Globe2 size={20} className={themes[theme].accent} />
                  {t('common.getInTouch')}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 gap-6"
        >
          {[
            { icon: Terminal, title: "Backend Development", desc: "Node.js, Python, Nestjs, FastAPI" },
            { icon: Layout, title: "Frontend Development", desc: "React, Vuejs, Nextjs, Nuxtjs, TypeScript" },
            { icon: Database, title: "Database Design", desc: "PostgreSQL, MongoDB, Firestore" },
            { icon: Server, title: "Container Orchestration", desc: "Docker, Kubernetes"},
            { icon: Code2, title: "Communication methods", desc: "RabbitMQ, REST APIs"}
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`p-6 rounded-2xl ${themes[theme].card} backdrop-blur-lg ${themes[theme].border} ${themes[theme].hover} transition-all hover:shadow-lg group`}
            >
              <item.icon className={`w-8 h-8 mb-4 ${themes[theme].accent}`} />
              <h3 className={`text-lg font-semibold mb-2 ${themes[theme].text}`}>{item.title}</h3>
              <p className={`text-sm ${themes[theme].text} opacity-80`}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};