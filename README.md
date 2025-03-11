# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- Responsive design for all devices
- Dark/light theme toggle
- Multilingual support (English and Spanish)
- Contact form with EmailJS integration
- Smooth animations with Framer Motion

## Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your EmailJS credentials
4. Start the development server:
   ```
   npm run dev
   ```

## Deployment to GitHub Pages

1. Update the `base` property in `vite.config.ts` with your repository name
2. Set up your EmailJS credentials:
   - Create an account at [emailjs.com](https://www.emailjs.com/)
   - Create a service (ID: 'service_portfolio')
   - Create an email template (ID: 'template_contact')
   - Get your public key

3. Add your EmailJS credentials to GitHub repository secrets:
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Add the following secrets:
     - `EMAILJS_SERVICE_ID`
     - `EMAILJS_TEMPLATE_ID`
     - `EMAILJS_PUBLIC_KEY`

4. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

## Security Notes

- The EmailJS public key is protected using environment variables
- Never commit your `.env` file to the repository
- For GitHub Pages deployment, use GitHub Secrets to store sensitive information