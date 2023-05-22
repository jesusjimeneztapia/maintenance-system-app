import { Flex, Text } from '@tremor/react'
import IndicatorsHeader from '../../components/indicators/IndicatorsHeader'
import { HTTP_METHODS } from '../../services'
import { INDICATOR_URL_EXTERNAL } from '../../services/indicatorServices'
import { requestInternalApi } from '../../services/requestApi'
import Head from 'next/head'
import { createDocumentTitle } from '../../libs/documentTitle'
import Compliance from '../../components/indicators/Compliance'
import WorkOrders from '../../components/indicators/WorkOrders'
import HoursGraphic from '../../components/indicators/HoursGraphic'
import WorkOrdersGraphic from '../../components/indicators/WorkOrdersGraphic'
import { Card } from 'flowbite-react'
import { dateLocaleString } from '../../libs/date'
import useLoadIndicators from '../../hooks/useLoadIndicators'

export default function IndicatorsPage({ indicators, message, date }) {
  const { component, title, workOrders, selectedDate } = useLoadIndicators({
    indicators,
    message,
    date,
  })
  const isoString = new Date(selectedDate)
  isoString.setDate(isoString.getDate() + 1)

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      {component ? (
        <>{component}</>
      ) : (
        <>
          <IndicatorsHeader />
          {workOrders?.length > 0 ? (
            <Flex className='gap-5' flexDirection='col'>
              <Flex className='gap-5 max-sm:flex-col' alignItems='start'>
                <Compliance />
                <WorkOrders />
              </Flex>
              <WorkOrdersGraphic />
              <HoursGraphic />
            </Flex>
          ) : (
            <Card>
              <Text className='text-center'>
                No existen indicadores para el
                <span className='font-medium ml-1'>
                  {dateLocaleString(isoString.toISOString(), true)}
                </span>
              </Text>
            </Card>
          )}
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  let { date } = context.query
  let strict = true
  date = new Date(date)
  if (date.toString().toLowerCase() === 'invalid date') {
    date = new Date()
    strict = false
  }

  const { data: indicators, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: INDICATOR_URL_EXTERNAL,
    params: { date, strict },
  })

  return {
    props: {
      indicators,
      message,
      date: date.toISOString().replace(/T.+/, ''),
    },
  }
}
