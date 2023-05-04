import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { createTitleInitial } from '../libs/documentTitle'
import { Flex, Subtitle, Text } from '@tremor/react'
import { useToast } from '../store/toast'

export default function useBeforeRenderPage({ message, title }) {
  const titleInitial = createTitleInitial(title)
  const [reset, show] = useToast((state) => [state.reset, state.show])
  const router = useRouter()

  useEffect(() => {
    if (message) {
      show({
        autoClose: false,
        close: true,
        color: 'failure',
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
      <Flex className='gap-3' flexDirection='col'>
        <Subtitle>{message}</Subtitle>
        <Text>
          Puede hacer clic en{' '}
          <button
            className='font-medium text-slate-500 hover:text-slate-700'
            onClick={createHandleClick()}
          >
            Volver
          </button>{' '}
          para volver atrás o{' '}
          <button
            className='font-medium text-blue-500 hover:text-blue-700'
            onClick={createHandleClick('/')}
          >
            Inicio
          </button>{' '}
          para ir al inicio.
        </Text>
        <Flex className='gap-3' justifyContent='center'>
          <button
            className='max-sm:self-end inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-slate-500 rounded-lg bg-slate-100 hover:text-slate-900 hover:bg-slate-200'
            onClick={createHandleClick()}
          >
            Volver
          </button>
          <button
            className='max-sm:self-end inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-blue-500 rounded-lg bg-blue-100 hover:text-blue-900 hover:bg-blue-200'
            onClick={createHandleClick('/')}
          >
            Inicio
          </button>
        </Flex>
      </Flex>
    ),
    title: titleInitial,
  }
}
