import styles from '../styles/TableBordered.module.css'

export default function TableBordered({ children }) {
  return <table className={styles.table}>{children}</table>
}
