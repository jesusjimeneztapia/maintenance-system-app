import Head from 'next/head'
import { createDocumentTitle } from '../../libs/documentTitle'
import { Title } from '@tremor/react'
import { requestInternalApi } from '../../services/requestApi'
import { HTTP_METHODS } from '../../services'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { useStores } from '../../store/stores'
import { useEffect } from 'react'
import StoreHeader from '../../components/store/StoreHeader'
import Stores from '../../components/store/Stores'

function useLoadStores({ stores, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: 'Repuestos',
  })

  const setStores = useStores((state) => state.setStores)

  useEffect(() => {
    if (stores != null) {
      setStores(stores)
    }
  }, [stores, setStores])

  return { component, title }
}

export default function StoresPage({ stores, message }) {
  const { component, title } = useLoadStores({ stores, message })
  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      {component ? (
        <>
          <Title className='w-full mb-5'>{title}</Title>
          {component}
        </>
      ) : (
        <>
          <StoreHeader />
          <Stores />
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { data: stores, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: '/stores',
  })
  return { props: { stores, message } }
}
