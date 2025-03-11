import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        nav: {
          about: 'About Me',
          education: 'Education',
          experience: 'Experience',
          projects: 'Projects',
          contact: 'Contact'
        },
        common: {
          downloadCV: 'Download CV',
          sendMessage: 'Send Message',
          viewProject: 'View Project',
          getInTouch: 'Get in Touch'
        }
      }
    },
    es: {
      translation: {
        nav: {
          about: 'Sobre Mí',
          education: 'Educación',
          experience: 'Experiencia',
          projects: 'Proyectos',
          contact: 'Contacto'
        },
        common: {
          downloadCV: 'Descargar CV',
          sendMessage: 'Enviar Mensaje',
          viewProject: 'Ver Proyecto',
          getInTouch: 'Contactar'
        }
      }
    }
  }
});