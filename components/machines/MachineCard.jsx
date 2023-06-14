import Link from 'next/link'
import { Icon, TableCell, TableRow, Text, Title } from '@tremor/react'
import Image from 'next/image'
import OneServerSolidIcon from '../icons/OneServerSolidIcon'
import EditIcon from '../icons/EditIcon'
import PresentationChartLineIcon from '../icons/PresentationChartLineIcon'
import { useMachineList } from '../../store/machines'
import AppLink from '../AppLink'
import EyeIcon from '../icons/EyeIcon'
import Criticality from './Criticality'

export default function MachineCard({
  image,
  code,
  name,
  location,
  area,
  criticality,
  priority,
}) {
  const page = useMachineList((state) => state.page)

  return (
    <Link href={{ pathname: '/machines/[code]', query: { code } }}>
      <TableRow className='hover:bg-slate-50 cursor-pointer'>
        <TableCell>
          {image ? (
            <Image
              src={image}
              alt={name}
              height={44}
              width={80}
              layout='fixed'
              objectFit='cover'
              objectPosition='center'
              priority={priority}
            />
          ) : (
            <Icon
              className='w-20 flex justify-center'
              icon={OneServerSolidIcon}
              size='lg'
              color='amber'
              variant='solid'
            />
          )}
        </TableCell>
        <TableCell>
          <Title>{code}</Title>
          <Text>{name}</Text>
        </TableCell>
        <TableCell className='text-center'>
          {page === 'machines' ? location : area.name}
        </TableCell>
        <TableCell className='text-center'>
          <Criticality criticality={criticality} />
        </TableCell>
        <TableCell className='text-center'>
          <AppLink
            href={{
              pathname:
                page === 'machines'
                  ? '/machines/[code]/edit'
                  : '/activities/[machineCode]',
              query: page === 'machines' ? { code } : { machineCode: code },
            }}
            color={page === 'machines' ? 'gray' : 'blue'}
            icon={page === 'machines' ? EditIcon : PresentationChartLineIcon}
          />
        </TableCell>
        <TableCell className='text-center'>
          <AppLink
            href={{
              pathname: '/machines/[code]',
              query: { code },
            }}
            color='amber'
            icon={EyeIcon}
          ></AppLink>
        </TableCell>
      </TableRow>
    </Link>
  )
}
