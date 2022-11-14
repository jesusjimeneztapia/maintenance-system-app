import Link from 'next/link'
import styles from '../styles/ActionLink.module.css'

export default function ActionLink({
  href,
  onClick,
  variant = 'primary',
  children,
}) {
  if (onClick) {
    return (
      <button
        className={`${styles.action} ${styles[variant]}`}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  return (
    <Link href={href}>
      <a className={`${styles.action} ${styles[variant]}`}>{children}</a>
    </Link>
  )
}
