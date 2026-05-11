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
        vksurface: 'var(--vk-surface)',
        vksurface2: 'var(--vk-surface-2)',
        vktext: 'var(--vk-text)',
        vkmuted: 'var(--vk-text-muted)',
        vkaccent: 'var(--vk-accent)',
        vkaccentsoft: 'var(--vk-accent-soft)',
        vkaccentdeep: 'var(--vk-accent-deep)',
        vksuccess: 'var(--vk-success)',
        vkinfo: 'var(--vk-info)',
        /* Legacy aliases — kept so existing className references don't break */
        vkcyan: 'var(--vk-info)',
        vkpink: 'var(--vk-accent)',
        vkmint: 'var(--vk-success)',
        vkpurple: 'var(--vk-accent-soft)'
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
