import { TableCell, TableRow } from '@tremor/react'
import Link from 'next/link'
import EditIcon from '../../icons/EditIcon'

const ENGINE_VALUES = {
  DIRECT: 'DIRECTO',
  SOFT: 'SUAVE',
}

export default function EngineRow({ engine, machineCode }) {
  return (
    <TableRow>
      <TableCell>{engine.code}</TableCell>
      <TableCell>{engine.function}</TableCell>
      <TableCell className='text-center'>{engine.mark}</TableCell>
      <TableCell className='text-center'>{engine.type}</TableCell>
      <TableCell className='text-center'>{engine.powerHp}</TableCell>
      <TableCell className='text-center'>{engine.powerKw}</TableCell>
      <TableCell className='text-center'>{engine.voltage}</TableCell>
      <TableCell className='text-center'>{engine.current}</TableCell>
      <TableCell className='text-center'>{engine.rpm}</TableCell>
      <TableCell className='text-center'>{engine.cosPhi}</TableCell>
      <TableCell className='text-center'>{engine.performance}</TableCell>
      <TableCell className='text-center'>{engine.frequency}</TableCell>
      <TableCell className='text-center'>{engine.poles}</TableCell>
      <TableCell className='text-center'>{engine.ip}</TableCell>
      <TableCell className='text-center'>
        {ENGINE_VALUES[engine.boot]}
      </TableCell>
      <TableCell className='text-center'>
        <Link
          href={{
            pathname: '/machines/[code]/edit-engine',
            query: { code: machineCode, engineCode: engine.code },
          }}
        >
          <a className='flex items-center gap-1 font-medium text-slate-500 hover:text-slate-700'>
            <EditIcon className='w-5 h-5' />
            Editar
          </a>
        </Link>
      </TableCell>
    </TableRow>
  )
}
