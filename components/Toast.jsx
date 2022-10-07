import { CgClose } from 'react-icons/cg'
import { useToast } from '../context/providers/ToastContext'
import Alert from './Alert'

const CLOSE_BUTTON = {
  info: 'bg-blue-100 text-blue-900 hover:bg-blue-200',
  danger: 'bg-red-100 text-red-900 hover:bg-red-200',
  success: 'bg-green-100 text-green-900 hover:bg-green-200',
  warning: 'bg-yellow-100 text-yellow-900 hover:bg-yellow-200',
  dark: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
}

export default function Toast() {
  const { close, color, message, reset, show } = useToast()

  return (
    <Alert show={show} color={color}>
      <div className='flex'>
        <p>{message}</p>
        {close && (
          <button
            className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-9 w-9 ${CLOSE_BUTTON[color]}`}
            onClick={reset}
          >
            <CgClose className='w-6 h-6' />
          </button>
        )}
      </div>
    </Alert>
  )
}
