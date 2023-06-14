import { Card, Col, Flex, Grid, Subtitle } from '@tremor/react'
import GeneralInformationTable from './GeneralInformationTable'
import ImageMachineTable from './ImageMachineTable'
import TechnicalDocumentationTable from './TechnicalDocumentationTable'

export default function MachineInformation({
  code,
  generalInformation,
  image,
  technicalDocumentation,
}) {
  return (
    <Grid className='gap-5' numCols={9}>
      <Col className='col-span-9 xl:col-span-5'>
        <Card>
          <Flex flexDirection='col' alignItems=''>
            <Subtitle className='mb-6'>Información de la máquina</Subtitle>
            <Flex className='gap-5' flexDirection='col' alignItems=''>
              <Card className='max-md:hidden'>
                <GeneralInformationTable code={code} {...generalInformation} />
              </Card>
              <div className='md:hidden'>
                <GeneralInformationTable code={code} {...generalInformation} />
              </div>
              <div className='xl:hidden flex max-lg:flex-col-reverse gap-5'>
                <TechnicalDocumentationTable
                  technicalDocumentation={technicalDocumentation.map(
                    ({ name }) => name
                  )}
                />
                <ImageMachineTable code={code} image={image} />
              </div>
            </Flex>
          </Flex>
        </Card>
      </Col>
      <Col className='max-xl:hidden' numColSpan={9} numColSpanLg={4}>
        <Card className='flex flex-col gap-5'>
          <ImageMachineTable code={code} image={image} />
          <TechnicalDocumentationTable
            technicalDocumentation={technicalDocumentation.map(
              ({ name }) => name
            )}
          />
        </Card>
      </Col>
    </Grid>
  )
}
