import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key from environment variables
export const initEmailJS = () => {
  const publicKey = process.env.EMAILJS_PUBLIC_KEY || '';
  if (!publicKey) {
    console.warn('EmailJS public key is not set. Contact form will not work.');
  }
  emailjs.init(publicKey);
};