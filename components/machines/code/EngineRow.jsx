import { TableCell, TableRow } from '@tremor/react'
import EditIcon from '../../icons/EditIcon'
import AppLink from '../../AppLink'

export default function EngineRow({ engine, machineCode }) {
  return (
    <TableRow>
      <TableCell>{engine.code}</TableCell>
      <TableCell>{engine.function}</TableCell>
      <TableCell className='text-center'>{engine.mark ?? '-'}</TableCell>
      <TableCell className='text-center'>{engine.type ?? '-'}</TableCell>
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
      <TableCell className='text-center'>{engine.boot}</TableCell>
      <TableCell className='text-center'>
        <AppLink
          href={{
            pathname: '/machines/[code]/edit-engine',
            query: { code: machineCode, engineCode: engine.code },
          }}
          color='gray'
          icon={EditIcon}
        />
      </TableCell>
    </TableRow>
  )
}
