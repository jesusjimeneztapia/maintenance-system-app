import Link from 'next/link'
import { FiEdit } from 'react-icons/fi'
import styles from '../../../styles/machines/MachineCard.module.css'

const ENGINE_VALUES = {
  DIRECT: 'DIRECTO',
  SOFT: 'SUAVE',
}

function Row({ children }) {
  return (
    <td>
      <span
        style={{
          minWidth: 'max-content',
          display: 'block',
          textAlign: 'center',
        }}
      >
        {children}
      </span>
    </td>
  )
}

export default function EngineRow({ engine, machineCode }) {
  return (
    <tr>
      <Row>{engine.code}</Row>
      <Row>{engine.function}</Row>
      <Row>{engine.mark}</Row>
      <Row>{engine.type}</Row>
      <Row>{engine.powerHp}</Row>
      <Row>{engine.powerKw}</Row>
      <Row>{engine.voltage}</Row>
      <Row>{engine.current}</Row>
      <Row>{engine.rpm}</Row>
      <Row>{engine.cosPhi}</Row>
      <Row>{engine.performance}</Row>
      <Row>{engine.frequency}</Row>
      <Row>{engine.poles}</Row>
      <Row>{engine.ip}</Row>
      <Row>{ENGINE_VALUES[engine.boot]}</Row>
      <Row>
        <div className={styles.container}>
          <Link
            href={{
              pathname: '/machines/[code]/edit-engine',
              query: { code: machineCode, engineCode: engine.code },
            }}
          >
            <a className={styles.edit}>
              <FiEdit />
              Editar
            </a>
          </Link>
        </div>
      </Row>
    </tr>
  )
}
