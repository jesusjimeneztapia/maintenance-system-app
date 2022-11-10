import styles from '../styles/ReportBox.module.css'

export default function ReportBox({ children, variant = 'primary' }) {
  return (
    <div className={`${styles['report-box']} ${styles[variant]}`}>
      {children}
    </div>
  )
}
