import { CgClose } from 'react-icons/cg'
import { useToast } from '../context/providers/ToastContext'
import Alert from './Alert'
import styles from '../styles/Toast.module.css'

export default function Toast() {
  const { close, color, children, reset, show, position } = useToast()

  return (
    <Alert show={show} variant={color} position={position}>
      <div className={styles.toast}>
        <div>{children}</div>
        {close && <CgClose className={styles.close} onClick={reset} />}
      </div>
    </Alert>
  )
}
