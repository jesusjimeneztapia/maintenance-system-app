import styles from '../styles/TableBordered.module.css'

export default function TableBordered({ children }) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>{children}</table>
    </div>
  )
}
