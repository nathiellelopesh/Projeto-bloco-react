
import { createRoot } from 'react-dom/client'
import AppProvider from './context.jsx';
import Routes from "./routes/index.jsx";
import './index.css'

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <Routes />
  </AppProvider>
)