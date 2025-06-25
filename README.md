  # Verse of Hope ✨📖

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://vercel.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18+-61dafb?logo=react)](https://reactjs.org)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

A React-based Bible verse generator that provides random uplifting verses, supports multi-language translation, text-to-speech, dark mode toggle, and allows saving your favorite verses.

---

## 🌟 Features

✅ Random verse generator  
✅ Save verses to favorites (stored in localStorage)  
✅ Search and manage favorites (including remove functionality)  
✅ Dark/light mode toggle  
✅ Multi-language support (English, Hindi, Telugu)  
✅ Text-to-speech (with play/stop button)  
✅ Smooth animated transitions using Framer Motion  
✅ Alerts with SweetAlert2  
✅ Fully responsive UI  

---

## 🚀 Live Demo

👉 [View on Vercel](https://verseofhope.vercel.app)

---

## 🛠 Tech Stack

- React (with Hooks)
- React Router
- Bootstrap + custom CSS
- Framer Motion
- SweetAlert2
- Argos OpenTech translation API
- localStorage (for favorites persistence)

---

## 📂 Project Structure
```
src/
├── components/
│ ├── FavoritesPage.js
│ ├── RandomVerseGenerator.js
│ └── VerseBox.js
├── data/
│ └── verses.json
├── App.js
├── App.css
└── index.js
```
## ⚙️ Setup & Run Locally

```bash
# Clone the repository
git clone https://github.com/anilsinthu114/verse-of-hope.git
cd verse-of-hope

# Install dependencies
npm install

# Run the app
npm start
```
🏗️ Build for Production
```bash
npm start 

