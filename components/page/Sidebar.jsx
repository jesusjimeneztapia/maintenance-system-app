import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import ServerSolidIcon from '../icons/ServerSolidIcon'
import PresentationChartLineSolidIcon from '../icons/PresentationChartLineSolidIcon'
import TemplateSolidIcon from '../icons/TemplateSolidIcon'
import CalendarSolidIcon from '../icons/CalendarSolidIcon'
import NavLink from './NavLink'
import { Button, Flex, Title } from '@tremor/react'
import MenuIcon from '../icons/MenuIcon'
import CloseIcon from '../icons/CloseIcon'
import PresentationChartBarIcon from '../icons/PresentationChartBarIcon'
import WrenchScrewdriverSolidIcon from '../icons/WrenchScrewdriverSolidIcon'
import ClipboardDocumentListSolidIcon from '../icons/ClipboardDocumentListSolidIcon'
import ClockSolidIcon from '../icons/ClockSolidIcon'
import PuzzlePieceSolidIcon from '../icons/PuzzlePieceSolidIcon'

export default function Sidebar() {
  const role = global.localStorage?.getItem('role')
  const [translate, setTranslate] = useState(false)

  if (role == null) {
    return <></>
  }

  const handleToggle = () => {
    setTranslate((translate) => !translate)
  }

  return (
    <>
      <Flex className='pl-4 pt-4 md:hidden gap-5' justifyContent='start'>
        <Button
          icon={() => <MenuIcon className='w-6 h-6' />}
          variant='light'
          color='gray'
          onClick={handleToggle}
        />
        <Link href='/'>
          <a className='flex items-center gap-2'>
            <Image src='/favicon.ico' alt='Logo' width={20} height={20} />
            <Title>TECNOPOR S.A.</Title>
          </a>
        </Link>
        {translate && (
          <div
            className='fixed top-0 left-0 z-10 h-screen w-screen bg-slate-700/50'
            onClick={handleToggle}
          />
        )}
      </Flex>

      <aside
        id='logo-sidebar'
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${
          translate ? 'translate-x-0' : '-translate-x-full'
        } md:shadow-none`}
        aria-label='Sidebar'
      >
        <div className='h-full px-3 py-4 overflow-y-auto bg-amber-500'>
          <Flex alignItems='start'>
            <div className='max-md:hidden'>
              <Link href='/'>
                <a className='flex items-center gap-3 pl-2.5 mb-5'>
                  <Image src='/favicon.ico' alt='Logo' width={24} height={24} />
                  <Title className='text-slate-900'>TECNOPOR S.A.</Title>
                </a>
              </Link>
            </div>
            <Button
              className='md:hidden text-slate-900 mb-4 ml-auto'
              icon={() => <CloseIcon className='w-6 h-6 text-inherit' />}
              variant='light'
              color='slate'
              onClick={handleToggle}
            />
          </Flex>
          <ul className='space-y-2 font-medium'>
            {role === 'admin' && (
              <>
                <NavLink
                  href='/machines'
                  icon={ServerSolidIcon}
                  text='Máquinas'
                />
                <NavLink
                  href='/activities'
                  icon={PresentationChartLineSolidIcon}
                  text='Actividades'
                />
                <NavLink
                  href='/stores'
                  icon={PuzzlePieceSolidIcon}
                  text='Repuestos'
                />
                <NavLink
                  href='/work-orders'
                  icon={TemplateSolidIcon}
                  text='Órdenes de trabajo'
                />
              </>
            )}
            <NavLink
              href='/failure-report'
              icon={ClipboardDocumentListSolidIcon}
              text='Reportes de falla'
            />
            <NavLink
              href='/maintenance-request'
              icon={WrenchScrewdriverSolidIcon}
              text='Solicitudes de mantenimiento'
            />
            {role === 'admin' && (
              <>
                <NavLink
                  href='/schedule'
                  icon={CalendarSolidIcon}
                  text='Planificación'
                />
                <NavLink
                  href='/historical'
                  icon={ClockSolidIcon}
                  text='Históricos'
                />
                <NavLink
                  href='/indicators'
                  icon={PresentationChartBarIcon}
                  text='Indicadores'
                />
              </>
            )}
          </ul>
        </div>
      </aside>
    </>
  )
}
