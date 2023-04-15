import Link from 'next/link'
import MachineListProvider from '../../context/providers/MachineListContext'
import MachineContainer from '../../components/machines/MachineContainer'
import Head from 'next/head'
import { createDocumentTitle } from '../../libs/documentTitle'
import { requestInternalApi } from '../../services/requestApi'
import { HTTP_METHODS } from '../../services'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { MACHINE_URL_REGULAR } from '../../services/machineServices'
import { Flex, Subtitle, Text, Title } from '@tremor/react'
import OneServerSolidIcon from '../../components/icons/OneServerSolidIcon'

export default function Machines({ machines, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: 'Máquinas',
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      {component ? (
        <>
          <Title className='mb-5'>{title}</Title>
          {component}
        </>
      ) : (
        <>
          <Flex className='mb-5 max-sm:flex-col max-sm:items-start'>
            <Title>{title}</Title>
            {machines.length > 0 && (
              <Link href='/machines/register'>
                <a className='max-sm:self-end inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-slate-500 rounded-lg bg-slate-100 hover:text-slate-900 hover:bg-slate-200'>
                  <span className='w-full'>Registrar máquina</span>
                </a>
              </Link>
            )}
          </Flex>
          {machines.length > 0 ? (
            <MachineListProvider machines={machines}>
              <MachineContainer page='machines' />
            </MachineListProvider>
          ) : (
            <Flex className='gap-3' flexDirection='col'>
              <OneServerSolidIcon className='w-32 text-slate-500/30' />
              <Subtitle>No existen máquinas registradas</Subtitle>
              <Text>Registra tu primera máquina</Text>
              <Link href='/machines/register'>
                <a className='inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-slate-500 rounded-lg bg-slate-100 hover:text-slate-900 hover:bg-slate-200'>
                  <span className='w-full'>Registrar máquina</span>
                </a>
              </Link>
            </Flex>
          )}
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { data: machines, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: MACHINE_URL_REGULAR,
  })

  return {
    props: { machines, message },
  }
}
