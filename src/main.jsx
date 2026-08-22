window.storage = { get: async (k) => ({value: localStorage.getItem(k)}), set: async (k, v) => localStorage.setItem(k, v) };
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

