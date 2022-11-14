import { CgDatabase } from 'react-icons/cg'
import Box from '../../Box'
import TableBordered from '../../TableBordered'
import styles from '../../../styles/machines/code/ImageMachineTable.module.css'

export default function ImageMachineTable({ code, image }) {
  return (
    <Box>
      <TableBordered>
        <thead>
          <tr>
            <th>Código Máquina</th>
            <th>{code}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>
              {image ? (
                // eslint-disable-next-line
                <img
                  className={styles.image}
                  src={image.src}
                  alt={image.name}
                />
              ) : (
                <div className={styles.container}>
                  <CgDatabase className={styles.icon} />
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </TableBordered>
    </Box>
  )
}
