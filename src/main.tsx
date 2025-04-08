
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add viewport meta tag for better mobile experience
const meta = document.createElement('meta')
meta.name = 'viewport'
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
document.head.appendChild(meta)

// Add theme color meta tag for mobile browsers
const themeColor = document.createElement('meta')
themeColor.name = 'theme-color'
themeColor.content = '#3b82f6' // Blue color
document.head.appendChild(themeColor)

// Add title if not already set
if (!document.title) {
  document.title = 'FitFlow Tracker - Your Daily Fitness Companion'
}

createRoot(document.getElementById("root")!).render(<App />);
