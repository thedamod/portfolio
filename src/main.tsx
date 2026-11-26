import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { createAppRouter } from './router'

const rootElement = document.getElementById('root')!
const router = createAppRouter()
const app = <App router={router} />

if (rootElement.hasChildNodes()) {
  router.ssr = { manifest: undefined }
  void router.load().then(() => hydrateRoot(rootElement, app))
} else {
  createRoot(rootElement).render(app)
}
