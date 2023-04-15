import Link from 'next/link'
import EnginesTable from '../../../components/machines/code/EnginesTable'
import GeneralInformationTable from '../../../components/machines/code/GeneralInformationTable'
import TechnicalDocumentationTable from '../../../components/machines/code/TechnicalDocumentationTable'
import ImageMachineTable from '../../../components/machines/code/ImageMachineTable'
import Head from 'next/head'
import { createDocumentTitle } from '../../../libs/documentTitle'
import { requestInternalApi } from '../../../services/requestApi'
import { HTTP_METHODS } from '../../../services'
import { getMachineByCodeUrlRegular } from '../../../services/machineServices'
import useBeforeRenderPage from '../../../hooks/useBeforeRenderPage'
import { Card, Col, Flex, Grid, Subtitle, Title } from '@tremor/react'

export default function Machine({
  code,
  engines,
  technicalDocumentation,
  generalInformation,
  image,
  name,
  message,
}) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: `Máquina ${name ?? code}`,
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      {component ? (
        <>
          <Title className='mb-5'>{`Máquina ${name ?? code}`}</Title>
          {component}
        </>
      ) : (
        <>
          <Flex className='mb-5 max-lg:flex-col max-lg:gap-3'>
            <Title className='w-full'>
              {name} ({code})
            </Title>
            <Flex className='gap-2' justifyContent='end'>
              <Link
                href={{ pathname: '/machines/[code]/edit', query: { code } }}
              >
                <a className='inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-slate-500 rounded-lg bg-slate-100 hover:text-slate-900 hover:bg-slate-200'>
                  <span className='w-full'>Editar máquina</span>
                </a>
              </Link>

              <Link
                href={{
                  pathname: '/activities/[machineCode]',
                  query: { machineCode: code },
                }}
              >
                <a className='inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-blue-500 rounded-lg bg-blue-100 hover:text-blue-900 hover:bg-blue-200'>
                  <span className='w-full'>Ver actividades</span>
                </a>
              </Link>
            </Flex>
          </Flex>
          <Flex className='gap-5 w-full' flexDirection='col'>
            <Card>
              <Subtitle className='mb-6'>Información de la máquina</Subtitle>
              <Grid className='gap-4' numCols={9}>
                <Col numColSpan={9} numColSpanLg={5}>
                  <GeneralInformationTable
                    code={code}
                    {...generalInformation}
                  />
                </Col>
                <Col
                  className='flex flex-col justify-between gap-4'
                  numColSpan={9}
                  numColSpanLg={4}
                >
                  <ImageMachineTable code={code} image={image} />
                  <TechnicalDocumentationTable
                    technicalDocumentation={technicalDocumentation}
                  />
                </Col>
              </Grid>
            </Card>
            <EnginesTable engines={engines} machineCode={code} />
          </Flex>
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { code: machineCode },
  } = context

  const { data, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    params: { complete: true },
    url: getMachineByCodeUrlRegular(machineCode),
  })

  let machine = data
  if (data) {
    const {
      code,
      engines,
      technicalDocumentation,
      image,
      name,
      ...generalInformation
    } = data
    machine = {
      code,
      engines,
      technicalDocumentation,
      image,
      name,
      generalInformation: { ...generalInformation, name },
    }
  }

  return { props: { ...machine, code: machineCode, message } }
}
