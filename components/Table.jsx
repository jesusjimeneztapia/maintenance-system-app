import styles from '../styles/Table.module.css'

export default function Table({ children }) {
  return <table className={styles.table}>{children}</table>
}
