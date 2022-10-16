import styles from '../styles/Button.module.css'

export default function Button({
  children,
  type,
  variant = 'primary',
  onClick,
  disabled,
}) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
