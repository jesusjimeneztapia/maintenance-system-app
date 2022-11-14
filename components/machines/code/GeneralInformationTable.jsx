import { AREA_VALUES_MAP } from '../../../schemas/machine'
import Box from '../../Box'
import TableBordered from '../../TableBordered'
import Criticality from '../Criticality'
import styles from '../../../styles/machines/code/EnginesTable.module.css'

export default function GeneralInformationTable({
  name,
  maker,
  model,
  location,
  area,
  criticality,
  function: fn,
  specificData,
}) {
  return (
    <Box>
      <TableBordered>
        <thead>
          <tr>
            <th className={styles['text-center']} colSpan={2}>
              Información general
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Máquina</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Fabricante</td>
            <td>{maker}</td>
          </tr>
          <tr>
            <td>Modelo</td>
            <td>{model}</td>
          </tr>
          <tr>
            <td>Ubicación</td>
            <td>{location}</td>
          </tr>
          <tr>
            <td>Área</td>
            <td>{AREA_VALUES_MAP[area]}</td>
          </tr>
          <tr>
            <td>Criticidad</td>
            <td>
              <Criticality criticality={criticality} />
            </td>
          </tr>
          <tr>
            <td>Función</td>
            <td>{fn}</td>
          </tr>
          <tr>
            <td>Datos específicos</td>
            <td>{specificData}</td>
          </tr>
        </tbody>
      </TableBordered>
    </Box>
  )
}
