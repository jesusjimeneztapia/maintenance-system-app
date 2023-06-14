import EnginesTable from '../../../components/machines/code/EnginesTable'
import Head from 'next/head'
import { createDocumentTitle } from '../../../libs/documentTitle'
import { requestInternalApi } from '../../../services/requestApi'
import { HTTP_METHODS } from '../../../services'
import { getMachineByCodeUrlRegular } from '../../../services/machineServices'
import useBeforeRenderPage from '../../../hooks/useBeforeRenderPage'
import { Flex, Title } from '@tremor/react'
import AppLink from '../../../components/AppLink'
import MachineInformation from '../../../components/machines/code/MachineInformation'

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
              <AppLink
                href={{ pathname: '/machines/[code]/edit', query: { code } }}
                color='gray'
              >
                Editar máquina
              </AppLink>
              <AppLink
                href={{
                  pathname: '/activities/[machineCode]',
                  query: { machineCode: code },
                }}
                color='blue'
              >
                Ver actividades
              </AppLink>
            </Flex>
          </Flex>
          <Flex className='gap-5' flexDirection='col' alignItems=''>
            <div>
              <MachineInformation
                code={code}
                generalInformation={generalInformation}
                image={image}
                technicalDocumentation={technicalDocumentation}
              />
            </div>
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
