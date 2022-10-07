import Toast from '../components/Toast'
import ToastProvider from '../context/providers/ToastContext'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <Toast />
      <Component {...pageProps} />
    </ToastProvider>
  )
}
