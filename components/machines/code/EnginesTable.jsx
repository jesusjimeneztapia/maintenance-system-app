import Link from 'next/link'
import Box from '../../Box'
import Button from '../../Button'
import TableBordered from '../../TableBordered'
import EngineRow from './EngineRow'
import styles from '../../../styles/machines/code/EnginesTable.module.css'

export default function EnginesTable({ engines, machineCode }) {
  return (
    <Box>
      <header className={styles.header}>
        <Button>
          <Link
            href={{
              pathname: '/machines/[code]/add-engine',
              query: { code: machineCode },
            }}
          >
            <a>Agregar motor</a>
          </Link>
        </Button>
      </header>

      <div>
        <TableBordered>
          <thead>
            <tr>
              <th className={styles['text-center']} colSpan={16}>
                Motores Eléctricos
              </th>
            </tr>
          </thead>
          <tbody>
            {engines.length === 0 ? (
              <tr>
                <td className={styles.message} colSpan={16}>
                  No existen motores para esta máquina
                </td>
              </tr>
            ) : (
              <>
                <tr className={styles.header}>
                  <td>Código</td>
                  <td>Función</td>
                  <td>Marca</td>
                  <td>Tipo</td>
                  <td>P [Hp]</td>
                  <td>P [KW]</td>
                  <td>Tensión [V]</td>
                  <td>I [A]</td>
                  <td>rpm</td>
                  <td>cos</td>
                  <td>n</td>
                  <td>f [Hz]</td>
                  <td>N° POLOS</td>
                  <td>IP</td>
                  <td>Aranque</td>
                  <td>Operaciones</td>
                </tr>
                {engines.map((engine) => (
                  <EngineRow
                    key={engine.code}
                    engine={engine}
                    machineCode={machineCode}
                  />
                ))}
              </>
            )}
          </tbody>
        </TableBordered>
      </div>
    </Box>
  )
}
