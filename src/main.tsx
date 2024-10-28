import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import IndexView from './views/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IndexView />
  </StrictMode>,
)
