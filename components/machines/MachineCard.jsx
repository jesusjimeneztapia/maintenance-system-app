import Link from 'next/link'
import { AREA_VALUES_MAP, CRITICALITY_VALUES_MAP } from '../../schemas/machine'
import { Flex, Icon, TableCell, TableRow, Text, Title } from '@tremor/react'
import Image from 'next/image'
import OneServerSolidIcon from '../icons/OneServerSolidIcon'
import EditIcon from '../icons/EditIcon'
import PresentationChartLineIcon from '../icons/PresentationChartLineIcon'
import { Badge } from 'flowbite-react'
import ArrowDownIcon from '../icons/ArrowDownIcon'
import ArrowUpIcon from '../icons/ArrowUpIcon'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import { useMachineList } from '../../store/machines'

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
          {page === 'machines' ? location : AREA_VALUES_MAP[area]}
        </TableCell>
        <TableCell className='text-center'>
          <Badge
            className='w-fit m-auto'
            icon={
              criticality === 'HIGH'
                ? ArrowUpIcon
                : criticality === 'MEDIUM'
                ? ArrowRightIcon
                : ArrowDownIcon
            }
            color={
              criticality === 'HIGH'
                ? 'failure'
                : criticality === 'MEDIUM'
                ? 'warning'
                : 'success'
            }
          >
            {CRITICALITY_VALUES_MAP[criticality]}
          </Badge>
        </TableCell>
        <TableCell>
          <Flex className='gap-4' justifyContent='center'>
            <Link
              href={{
                pathname:
                  page === 'machines'
                    ? '/machines/[code]/edit'
                    : '/activities/[machineCode]',
                query: page === 'machines' ? { code } : { machineCode: code },
              }}
            >
              <a
                className={`flex items-center gap-1 font-medium ${
                  page === 'machines'
                    ? 'text-slate-500 hover:text-slate-700'
                    : 'text-blue-500 hover:text-blue-700'
                }`}
              >
                {page === 'machines' ? (
                  <>
                    <EditIcon className='w-5 h-5' />
                    Editar
                  </>
                ) : (
                  <>
                    <PresentationChartLineIcon className='w-5 h-5' />
                    Ver actividades
                  </>
                )}
              </a>
            </Link>
            <Link href={`/machines/${code}`}>
              <a
                className={`flex items-center gap-1 font-medium text-amber-500 hover:text-amber-700`}
              >
                Ver más
                <ArrowRightIcon className='w-4 h-4' />
              </a>
            </Link>
          </Flex>
        </TableCell>
      </TableRow>
    </Link>
  )
}
