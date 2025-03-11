import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import portfolioData from '../data/portfolio.json';
import { Theme } from '../types';
import { themes } from '../styles/themes';

interface Props {
  theme: Theme;
}

export const ContactPage: React.FC<Props> = ({ theme }) => {
  const { t, i18n } = useTranslation();
  const contact = portfolioData.contact[i18n.language];
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | 'sending' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  // Sanitize input to prevent XSS
  const sanitizeInput = (input: string): string => {
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/eval\(/gi, '')
        .replace(/expression\(/gi, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields',
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address',
      });
      return;
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedEmail = sanitizeInput(formData.email);
    const sanitizedMessage = sanitizeInput(formData.message);

    // Check if sanitized inputs are different from original (potential XSS attempt)
    if (sanitizedName !== formData.name || sanitizedEmail !== formData.email || sanitizedMessage !== formData.message) {
      setStatus({
        type: 'error',
        message: 'Invalid input detected. Please remove any special characters or HTML.',
      });
      return;
    }

    // Check if EmailJS credentials are available
    if (!process.env.EMAILJS_PUBLIC_KEY) {
      setStatus({
        type: 'error',
        message: 'Contact form is not configured. Please contact the administrator.',
      });
      return;
    }

    setStatus({
      type: 'sending',
      message: 'Sending message...',
    });

    try {
      // EmailJS configuration
      const templateParams = {
        from_name: sanitizedName,
        from_email: sanitizedEmail,
        message: sanitizedMessage,
      };

      await emailjs.send(
          process.env.EMAILJS_SERVICE_ID || 'service_portfolio',
          process.env.EMAILJS_TEMPLATE_ID || 'template_contact',
          templateParams,
          process.env.EMAILJS_PUBLIC_KEY
      );

      setStatus({
        type: 'success',
        message: 'Message sent successfully!',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    }
  };

  return (
      <div className="max-w-4xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-12"
        >
          <div>
            <h2 className="text-3xl font-bold mb-6">{t('nav.contact')}</h2>
            <div className="space-y-4 mb-8">
              <a
                  href={`mailto:${contact.email}`}
                  className={`flex items-center gap-3 ${themes[theme].text} hover:${themes[theme].accent} transition-colors`}
              >
                <Mail size={20} />
                {contact.email}
              </a>
              <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 ${themes[theme].text} hover:${themes[theme].accent} transition-colors`}
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 ${themes[theme].text} hover:${themes[theme].accent} transition-colors`}
              >
                <Github size={20} />
                GitHub
              </a>
            </div>
          </div>

          <motion.form
              ref={formRef}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6"
          >
            <div>
              <label htmlFor="name" className={`block text-sm font-medium mb-2 ${themes[theme].text}`}>
                Name
              </label>
              <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 ${theme.includes('dark') ? 'bg-white/5' : 'bg-gray-100'} rounded-lg border ${theme.includes('dark') ? 'border-gray-700' : 'border-gray-300'} focus:border-purple-500 focus:outline-none`}
                  maxLength={100}
                  required
              />
            </div>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${themes[theme].text}`}>
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 ${theme.includes('dark') ? 'bg-white/5' : 'bg-gray-100'} rounded-lg border ${theme.includes('dark') ? 'border-gray-700' : 'border-gray-300'} focus:border-purple-500 focus:outline-none`}
                  maxLength={100}
                  required
              />
            </div>
            <div>
              <label htmlFor="message" className={`block text-sm font-medium mb-2 ${themes[theme].text}`}>
                Message
              </label>
              <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-2 ${theme.includes('dark') ? 'bg-white/5' : 'bg-gray-100'} rounded-lg border ${theme.includes('dark') ? 'border-gray-700' : 'border-gray-300'} focus:border-purple-500 focus:outline-none`}
                  maxLength={1000}
                  required
              />
            </div>

            {status.type && (
                <div className={`p-3 rounded-lg ${
                    status.type === 'success' ? 'bg-green-500/20 text-green-400' :
                        status.type === 'error' ? 'bg-red-500/20 text-red-400' :
                            'bg-blue-500/20 text-blue-400'
                }`}>
                  {status.message}
                </div>
            )}

            <button
                type="submit"
                disabled={status.type === 'sending'}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ${
                    status.type === 'sending' ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              <Send size={20} />
              {status.type === 'sending' ? 'Sending...' : t('common.sendMessage')}
            </button>
          </motion.form>
        </motion.div>
      </div>
  );
};