import Box from '../../Box'
import TableBordered from '../../TableBordered'
import styles from '../../../styles/machines/code/EnginesTable.module.css'

export default function TechnicalDocumentationTable({
  technicalDocumentation,
}) {
  const renderTechnicalDocumentation = (value) => {
    return (
      <>
        {technicalDocumentation.includes(value) ? (
          <>
            <td className={styles['text-center']}>X</td>
            <td></td>
          </>
        ) : (
          <>
            <td></td>
            <td className={styles['text-center']}>X</td>
          </>
        )}
      </>
    )
  }

  return (
    <Box>
      <TableBordered>
        <thead>
          <tr>
            <th className={styles['text-center']} colSpan={5}>
              Documentación técnica
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.header}>
            <td></td>
            <td>Si</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Manual de Operaciones</td>
            {renderTechnicalDocumentation('OPERATIONS_MANUAL')}
          </tr>
          <tr>
            <td>Manual de Mantenimiento</td>
            {renderTechnicalDocumentation('MAINTENANCE_MANUAL')}
          </tr>
          <tr>
            <td>Planos Eléctricos</td>
            {renderTechnicalDocumentation('ELECTRICAL_PLANS')}
          </tr>
          <tr>
            <td>Planos Mecánicos</td>
            {renderTechnicalDocumentation('MECHANICAL_PLANS')}
          </tr>
        </tbody>
      </TableBordered>
    </Box>
  )
}
