import Link from 'next/link'
import Box from '../../Box'
import Button from '../../Button'
import TableBordered from '../../TableBordered'
import EngineRow from './EngineRow'

export default function EnginesTable({ engines, machineCode }) {
  return (
    <Box>
      <header
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '2rem',
          marginBottom: '1rem',
        }}
      >
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

      {engines.length > 0 && (
        <div>
          <TableBordered>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }} colSpan={16}>
                  Motores Eléctricos
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ fontWeight: '500', textAlign: 'center' }}>
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
            </tbody>
          </TableBordered>
        </div>
      )}
      {engines.length === 0 && (
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'var(--slate-600)',
          }}
        >
          No existen motores para esta máquina
        </p>
      )}
    </Box>
  )
}
