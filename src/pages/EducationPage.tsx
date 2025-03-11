import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle2 } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import { Theme } from '../types';
import { themes } from '../styles/themes';

interface Props {
  theme: Theme;
}

export const EducationPage: React.FC<Props> = ({ theme }) => {
  const { i18n } = useTranslation();
  const education = portfolioData.education[i18n.language];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto"
    >
      {education.map((edu, index) => (
        <motion.div
          key={index}
          variants={item}
          className={`mb-12 p-8 ${theme.includes('dark') ? 'bg-white/5' : 'bg-white'} backdrop-blur-sm rounded-xl border border-purple-500/20`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-600/20 p-3 rounded-full">
              <GraduationCap className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{edu.degree}</h3>
              <p className="text-purple-400">{edu.institution}</p>
              <p className={`text-sm ${theme.includes('dark') ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{edu.period}</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {edu.descriptions.map((desc, descIndex) => (
              <motion.div
                key={descIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * descIndex }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <p className={theme.includes('dark') ? 'text-gray-300' : 'text-gray-700'}>{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {edu.skills.map((skill, skillIndex) => (
              <motion.span
                key={skillIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * skillIndex }}
                className="px-3 py-1 bg-purple-600/20 rounded-full text-purple-400 text-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};