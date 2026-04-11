import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import Toast from './components/common/Toast.jsx'
import { ToastProvider } from './context/ToastContext.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <AppRoutes />
          <Toast />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}