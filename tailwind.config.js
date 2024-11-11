/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Adicione o caminho da pasta app
    "./components/**/*.{js,ts,jsx,tsx}", // Se você tiver uma pasta components, adicione aqui
    "./public/**/*.html", // Inclua arquivos HTML se houver
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
