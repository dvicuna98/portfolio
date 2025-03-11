import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import { Theme } from '../types';
import { themes } from '../styles/themes';

interface Props {
  theme: Theme;
}

export const ProjectsPage: React.FC<Props> = ({ theme }) => {
  const { t, i18n } = useTranslation();
  const projects = portfolioData.projects[i18n.language];

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2 }}
          className={`${theme.includes('dark') ? 'bg-white/5' : 'bg-white'} backdrop-blur-sm rounded-xl p-6`}
        >
          <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
          <p className={theme.includes('dark') ? 'text-gray-300 mb-6' : 'text-gray-700 mb-6'}>{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-purple-600/20 rounded-full text-purple-400 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Github size={20} />
              {t('common.viewProject')}
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};