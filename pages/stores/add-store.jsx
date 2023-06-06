import Head from 'next/head'
import { createDocumentTitle } from '../../libs/documentTitle'
import { Title } from '@tremor/react'
import StoreForm from '../../components/store/StoreForm'
import { ADD_STORE_INITIAL_VALUES, createStoreDto } from '../../schemas/store'
import AddStoreForm from '../../components/store/AddStoreForm'
import { requestInternalApi } from '../../services/requestApi'
import { HTTP_METHODS } from '../../services'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { useAddStore } from '../../store/addStore'
import { useEffect } from 'react'

function useLoadAddStore({ fields, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: ['Repuestos', 'Añadir'],
  })

  const setFields = useAddStore((state) => state.setFields)

  useEffect(() => {
    if (fields != null) {
      setFields(fields)
    }
  }, [fields, setFields])

  return { component, title }
}

export default function AddStore({ fields, message }) {
  const { component, title } = useLoadAddStore({ fields, message })
  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      <Title className='w-full mb-5'>Añadir repuesto</Title>
      {component ? (
        <>{component}</>
      ) : (
        <StoreForm
          title='Repuesto a añadir'
          dtoValidation={createStoreDto}
          initialValues={ADD_STORE_INITIAL_VALUES}
          method='POST'
          url='/api/stores'
        >
          <AddStoreForm />
        </StoreForm>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { data: fields, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: '/stores/fields/create',
  })

  return { props: { fields, message } }
}
