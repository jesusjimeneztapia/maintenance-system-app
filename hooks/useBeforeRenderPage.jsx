import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Button from '../components/Button'
import { useToast } from '../context/providers/ToastContext'
import { createTitleInitial } from '../libs/documentTitle'
import styles from '../styles/BeforeRenderPage.module.css'

export default function useBeforeRenderPage({ message, title }) {
  const titleInitial = createTitleInitial(title)
  const { reset, showToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (message) {
      showToast({
        autoClose: false,
        close: true,
        color: 'danger',
        position: 'center',
        children: message,
      })
    }
  }, []) // eslint-disable-line

  const createHandleClick = (href) => () => {
    reset()
    if (href) {
      return router.replace(href)
    }
    router.back()
  }

  if (!message) {
    return { title: titleInitial }
  }

  return {
    component: (
      <>
        <h2>{titleInitial}</h2>
        <p className={styles.message}>{message}</p>
        <p className={styles.info}>
          Puede hacer clic en <span>Volver</span> para volver atrás o{' '}
          <span>Inicio</span> para ir al inicio.
        </p>
        <footer className={styles.footer}>
          <Button variant='soft-primary' onClick={createHandleClick()}>
            Volver
          </Button>
          <Button variant='secondary' onClick={createHandleClick('/')}>
            Inicio
          </Button>
        </footer>
      </>
    ),
    title: titleInitial,
  }
}
