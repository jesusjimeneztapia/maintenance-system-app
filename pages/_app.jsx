import Page from '../components/page'
import Toast from '../components/Toast'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toast />
      <Page>
        <Component {...pageProps} />
      </Page>
    </>
  )
}
