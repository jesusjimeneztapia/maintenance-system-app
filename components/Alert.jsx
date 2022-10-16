import styles from '../styles/Alert.module.css'

export default function Alert({
  show,
  variant,
  children,
  position = 'center',
}) {
  if (!show) {
    return <></>
  }

  return (
    <div
      className={`${styles.alert} ${styles[variant]} ${styles[position]}`}
      role='alert'
    >
      {children}
    </div>
  )
}
