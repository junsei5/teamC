// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwindのクラスがどこで使用されているか、スキャンする対象ファイルを指定
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}