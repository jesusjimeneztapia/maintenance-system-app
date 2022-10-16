import Box from '../../../components/Box'
import Button from '../../../components/Button'
import Page from '../../../components/page'
import { CgDatabase } from 'react-icons/cg'
import TableBordered from '../../../components/TableBordered'
import { getAPIURL } from '../../../libs/origin'
import axios from 'redaxios'
import Link from 'next/link'

const CRITICALITY = {
  HIGH: 'ALTA',
  MEDIUM: 'MEDIA',
  LOW: 'BAJA',
}

export default function Machine({ code, machine }) {
  const renderTechnicalDocumentation = (value) => {
    const { technicalDocumentation } = machine
    return (
      <>
        {technicalDocumentation.includes(value) ? (
          <>
            <td style={{ textAlign: 'center' }}>X</td>
            <td></td>
            <td></td>
            <td></td>
          </>
        ) : (
          <>
            <td></td>
            <td style={{ textAlign: 'center' }}>X</td>
            <td></td>
            <td></td>
          </>
        )}
      </>
    )
  }

  return (
    <Page title={`Máquina ${code} - Editar | TECNOPOR S.A.`}>
      <header
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
        }}
      >
        <h2>
          {code} - {machine.name}
        </h2>
        <Button>
          <Link href={{ pathname: '/machines/[code]/edit', query: { code } }}>
            Editar Máquina
          </Link>
        </Button>
      </header>
      <div
        style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        }}
      >
        <div
          style={{
            gridColumn: 'span 7',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <Box>
            <TableBordered>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }} colSpan={2}>
                    Información general
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Máquina</td>
                  <td>{machine.name}</td>
                </tr>
                <tr>
                  <td>Fabricante</td>
                  <td>{machine.maker}</td>
                </tr>
                <tr>
                  <td>Modelo</td>
                  <td>{machine.model}</td>
                </tr>
                <tr>
                  <td>Ubicación</td>
                  <td>{machine.location}</td>
                </tr>
                <tr>
                  <td>Criticidad</td>
                  <td>{CRITICALITY[machine.criticality]}</td>
                </tr>
                <tr>
                  <td>Función</td>
                  <td>{machine.function}</td>
                </tr>
                <tr>
                  <td>Datos específicos</td>
                  <td>{machine.specificData}</td>
                </tr>
              </tbody>
            </TableBordered>
          </Box>
          <Box>
            <TableBordered>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }} colSpan={5}>
                    Documentación técnica
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ fontWeight: '500', textAlign: 'center' }}>
                  <td></td>
                  <td>Si</td>
                  <td>No</td>
                  <td>Cod.</td>
                  <td>Obs.</td>
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
                <tr>
                  <td>Check List</td>
                  <td></td>
                  <td style={{ textAlign: 'center' }}>X</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </TableBordered>
          </Box>
        </div>
        <div
          style={{
            gridColumn: 'span 5',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
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
                    {machine.image ? (
                      <img
                        style={{ maxWidth: '100%' }}
                        src={machine.image.src}
                        alt={machine.image.name}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <CgDatabase
                          style={{
                            width: 'calc(100% - 12rem)',
                            height: 'auto',
                          }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </TableBordered>
          </Box>
          <Box>
            <TableBordered>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }} colSpan={5}>
                    Repuestos
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ fontWeight: '500', textAlign: 'center' }}>
                  <td>Nombre</td>
                  <td>Cod.</td>
                  <td>Observaciones</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </TableBordered>
          </Box>
        </div>
        <div
          style={{
            gridColumn: 'span 12',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <Box>
            <TableBordered>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }} colSpan={15}>
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
                </tr>
                <tr style={{ textAlign: 'center' }}>
                  <td>CB-03-CAL-01-MOT-001</td>
                  <td>M. VENTILADOR</td>
                  <td>VOGES</td>
                  <td>B132 S2/MA</td>
                  <td>10</td>
                  <td>7.5</td>
                  <td>380</td>
                  <td>15</td>
                  <td>2900</td>
                  <td>0.87</td>
                  <td>0.89</td>
                  <td>50</td>
                  <td>2</td>
                  <td>#</td>
                  <td>DIRECTO</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </TableBordered>
          </Box>
        </div>
      </div>
    </Page>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { code },
  } = context

  let machine = null
  let message = null

  const api = getAPIURL(context)
  try {
    const { data } = await axios.get(`${api}/machines/${code}`)
    machine = data
  } catch (error) {
    const { data } = error
    message = data.message
  }

  return { props: { code, machine, message } }
}
