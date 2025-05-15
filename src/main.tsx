
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n';
import '@fontsource/cairo/400.css';
import '@fontsource/cairo/700.css';

createRoot(document.getElementById("root")!).render(<App />);
