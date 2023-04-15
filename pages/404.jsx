import Head from 'next/head'
import Link from 'next/link'
import { createDocumentTitle } from '../libs/documentTitle'
import { Flex, Subtitle, Text, Title } from '@tremor/react'
import WarningSolidIcon from '../components/icons/WarningSolidIcon'

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>{createDocumentTitle('Página no encontrada')}</title>
      </Head>
      <Title className='mb-5'>Página no encontrada</Title>
      <Flex
        className='gap-6 max-sm:flex-col'
        justifyContent='center'
        alignItems='center'
      >
        <WarningSolidIcon className='max-w-xs max-sm:w-40 text-red-500' />
        <Flex className='w-fit gap-1' flexDirection='col' alignItems='center'>
          <Subtitle className='text-7xl max-sm:text-6xl pb-4'>404</Subtitle>
          <Text className='text-base font-medium'>
            Ups. Esta página ha desaparecido
          </Text>
          <Text>
            La página que estás buscando no existe. Cómo llegaste aquí es un
            misterio.
          </Text>
          <Text className='pb-3'>
            Pero puedes hacer clic en el botón de abajo para volver a la página
            de inicio.
          </Text>

          <Link href='/'>
            <a className='inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-blue-500 rounded-lg bg-blue-100 hover:text-blue-900 hover:bg-blue-200'>
              Inicio
            </a>
          </Link>
        </Flex>
      </Flex>
    </>
  )
}
