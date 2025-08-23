/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        vkbg: 'var(--vk-bg)',
        vkcyan: 'var(--vk-cyan)',
        vkpink: 'var(--vk-pink)',
        vkmint: 'var(--vk-mint)',
        vktext: 'var(--vk-text)',
        vkpurple: 'var(--vk-purple)'
      },
      boxShadow: {
        soft: 'var(--vk-shadow-soft)',
        strong: 'var(--vk-shadow-strong)'
      },
      borderRadius: {
        xl: 'var(--vk-radius-xl)'
      }
    }
  },
  plugins: [],
}
