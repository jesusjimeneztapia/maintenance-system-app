import Link from 'next/link'
import Button from '../Button'
import Input from '../Input'
import MachineList from './MachineList'
import styles from '../../styles/machines/MachineContainer.module.css'
import { useMachineList } from '../../context/providers/MachineListContext'

export default function MachineContainer({ page }) {
  const { filterByName, filteredMachines, searchHandleChange } =
    useMachineList()

  return (
    <>
      <header className={styles.header}>
        <div className={styles.search}>
          <Input
            placeholder='Buscar máquina por nombre...'
            value={filterByName}
            onChange={searchHandleChange}
          />
        </div>
        {page === 'machines' && (
          <Button variant='primary'>
            <Link href='/machines/register'>
              <a>Registrar Máquina</a>
            </Link>
          </Button>
        )}
      </header>
      <MachineList machines={filteredMachines} page={page} />
      {!filteredMachines.length && (
        <p className={styles.caption}>
          No existe la máquina <span>{filterByName}</span>
        </p>
      )}
    </>
  )
}
