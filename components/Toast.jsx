import { Alert } from 'flowbite-react'
import { Button, Flex } from '@tremor/react'
import CloseIcon from './icons/CloseIcon'
import { useToast } from '../store/toast'
import { useEffect } from 'react'

function useAutoToast() {
  const [toast, reset] = useToast((state) => [state.toast, state.reset])
  const { show, autoClose } = toast

  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => reset(), 5000)
      return () => clearTimeout(timer)
    }
  }, [autoClose, show, reset])

  return { toast, reset }
}

export default function Toast() {
  const { toast, reset } = useAutoToast()
  const { close, color, children, show, position } = toast

  if (!show) {
    return <></>
  }

  return (
    <div
      className={`fixed z-[60] top-5 w-80 ${
        position === 'left'
          ? 'left-5'
          : position === 'right'
          ? 'right-5'
          : 'left-1/2 -translate-x-1/2'
      }`}
    >
      <Alert color={color}>
        <Flex className='gap-4' alignItems='start' justifyContent='between'>
          <section className={close ? 'w-64' : 'w-full'}>{children}</section>
          {close && (
            <Button
              variant='light'
              color={color === 'failure' ? 'red' : color}
              icon={CloseIcon}
              onClick={reset}
            />
          )}
        </Flex>
      </Alert>
    </div>
  )
}
