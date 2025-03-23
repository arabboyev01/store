import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SpeedInsights } from "@vercel/speed-insights/next"
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SpeedInsights />
    <App />
  </StrictMode>,
)
