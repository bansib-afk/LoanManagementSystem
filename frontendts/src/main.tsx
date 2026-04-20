import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
