import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/Button'
import { createDocumentTitle } from '../libs/documentTitle'
import { AiFillWarning } from 'react-icons/ai'
import styles from '../styles/not-found/NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>{createDocumentTitle('Página no encontrada')}</title>
      </Head>
      <h2>Página no encontrada</h2>
      <div className={styles.container}>
        <AiFillWarning className={styles.icon} />
        <div className={styles.info}>
          <h4>404</h4>
          <p className={styles.title}>Ups. Esta página ha desaparecido.</p>
          <p className={styles.content}>
            La página que estás buscando no existe. Cómo llegaste aquí es un
            misterio.
            <span>
              Pero puedes hacer clic en el botón de abajo para volver a la
              página de inicio.
            </span>
          </p>
          <Button>
            <Link href='/'>
              <a>Inicio</a>
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
