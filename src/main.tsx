import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from './app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContainer />
  </StrictMode>,
)
