/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // Increase the base font size
        base: '1.125rem', // 18px instead of default 16px
        
        // You can also adjust other font sizes if needed
        sm: '0.925rem',    // 14.8px
        lg: '1.25rem',     // 20px
        xl: '1.375rem',    // 22px
        '2xl': '1.625rem', // 26px
        '3xl': '2rem',     // 32px
      },
    },
  },
  plugins: [],
  // Add responsive font sizing globally
  corePlugins: {
    fontSize: true,
  },
}