import HomeLink from '../components/home/HomeLink'
import Head from 'next/head'
import { createDocumentTitle } from '../libs/documentTitle'
import { Flex, Subtitle, Title } from '@tremor/react'
import ServerSolidIcon from '../components/icons/ServerSolidIcon'
import OneServerSolidIcon from '../components/icons/OneServerSolidIcon'
import PresentationChartLineSolidIcon from '../components/icons/PresentationChartLineSolidIcon'
import TemplateSolidIcon from '../components/icons/TemplateSolidIcon'
import CalendarSolidIcon from '../components/icons/CalendarSolidIcon'

export default function Home() {
  return (
    <>
      <Head>
        <title>{createDocumentTitle('Sistema de mantenimiento')}</title>
      </Head>
      <Title>TECNOPOR S.A.</Title>
      <Subtitle>Sistema de mantenimiento</Subtitle>
      <Flex
        className='gap-5 flex-wrap max-w-5xl w-full m-auto pt-5'
        justifyContent='center'
      >
        <HomeLink href='/machines' title='Máquinas' icon={ServerSolidIcon} />
        <HomeLink
          href='/machines/register'
          title='Registrar Máquina'
          icon={OneServerSolidIcon}
        />
        <HomeLink
          href='/activities'
          title='Actividades'
          icon={PresentationChartLineSolidIcon}
        />
        <HomeLink
          href='/work-orders'
          title='Órdenes de trabajo'
          icon={TemplateSolidIcon}
        />
        <HomeLink
          href='/schedule'
          title='Planificación'
          icon={CalendarSolidIcon}
        />
      </Flex>
    </>
  )
}
