import { useToastContext } from '../context/ToastContext'

export function useToast() {
  const { addToast } = useToastContext()

  return {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    info: (msg) => addToast(msg, 'info'),
    warning: (msg) => addToast(msg, 'warning'),
  }
}