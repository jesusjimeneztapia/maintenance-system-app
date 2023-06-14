import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { createTitleInitial } from '../libs/documentTitle'
import { Button, Flex, Subtitle, Text } from '@tremor/react'
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
          Puede hacer clic en
          <Button
            className='mx-1'
            color='gray'
            variant='light'
            onClick={createHandleClick()}
          >
            Volver
          </Button>
          para volver atrás o
          <Button
            className='mx-1'
            color='amber'
            variant='light'
            onClick={createHandleClick('/')}
          >
            Inicio
          </Button>
          para ir al inicio.
        </Text>
        <Flex className='gap-3' justifyContent='center'>
          <Button color='gray' onClick={createHandleClick()}>
            Volver
          </Button>
          <Button color='amber' onClick={createHandleClick('/')}>
            Inicio
          </Button>
        </Flex>
      </Flex>
    ),
    title: titleInitial,
  }
}
