import Head from 'next/head'
import React, { useMemo, useRef, useState } from 'react'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { createDocumentTitle } from '../../libs/documentTitle'
import { HTTP_METHODS } from '../../services'
import { requestInternalApi } from '../../services/requestApi'
import { Title } from '@tremor/react'
import {
  getSchedule,
  workOrderOnSchedule,
} from '../../services/scheduleServices'
import ScheduleOnHold from '../../components/schedule/ScheduleOnHold'
import OnSchedule from '../../components/schedule/OnSchedule'
import ScheduleHeader from '../../components/schedule/ScheduleHeader'
import { useToast } from '../../store/toast'

function getWeekNumber(date) {
  const [year, month, day] = date.split('-')
  date = new Date(year, month - 1, day)
  const firstDayYear = new Date(date.getFullYear(), 0, 1)
  const weeks = Math.ceil(
    ((date.getTime() - firstDayYear.getTime()) / 86400000 +
      firstDayYear.getDay() +
      1) /
      7
  )
  return weeks > 52 ? 1 : weeks
}

function getFirstWeekDay(date) {
  date = new Date(date)
  const firstDay = date.getDate() - date.getDay()
  return new Date(date.getFullYear(), date.getMonth(), firstDay)
}

function getStrict(date) {
  const now = new Date()
  const firstWeekDay = getFirstWeekDay(date)
  return !(
    now >= firstWeekDay &&
    now <= new Date(firstWeekDay).setDate(firstWeekDay.getDate() + 6)
  )
}

function useSchedule({ allWorkOrders, date }) {
  const strict = useRef(getStrict(date))
  const [show, request] = useToast((state) => [state.show, state.request])
  const [weeks, setWeeks] = useState(getWeekNumber(date))
  const [firstWeekDay, setFirstWeekDay] = useState(getFirstWeekDay(date))
  const [workOrders, setWorkOrders] = useState(allWorkOrders)

  const { workOrdersOnHold, workOrdersOnSchedule } = useMemo(() => {
    const workOrdersOnSchedule = workOrders.filter(
      ({ onSchedule }) => onSchedule
    )
    const workOrdersOnHold = workOrders.filter(({ onSchedule }) => !onSchedule)
    return { workOrdersOnHold, workOrdersOnSchedule }
  }, [workOrders])

  const handleSubmit = async (date) => {
    const [year, month, day] = date.split('-')
    date = new Date(+year, month - 1, +day)
    const dateString = date.toLocaleDateString('es-BO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    show({
      autoClose: false,
      close: true,
      color: 'info',
      position: 'center',
      children: `Se está filtrando la planificación ${dateString}...`,
    })

    const response = await request(
      async () => await getSchedule({ date, strict: getStrict(date) }),
      {
        autoClose: true,
        close: true,
        color: 'success',
        children: `La planificación ${dateString} se filtró exitósamente`,
      }
    )
    if (response) {
      strict.current = getStrict(date)
      setFirstWeekDay(getFirstWeekDay(date))
      setWorkOrders(response)
    }
  }

  const handleChangeDate = (date) => {
    setWeeks(getWeekNumber(date))
  }

  const updateWorkOrder = async ({ id, workOrderOnScheduleDto }) => {
    const index = workOrders.findIndex(({ code }) => id === code)
    if (index >= 0) {
      show({
        autoClose: false,
        close: true,
        color: 'info',
        position: 'center',
        children: `La órden de trabajo #${id} se está actualizando...`,
      })
      const response = await request(
        async () => await workOrderOnSchedule({ id, workOrderOnScheduleDto }),
        {
          autoClose: true,
          close: true,
          color: 'success',
          children: `La órden de trabajo #${id} se actualizó exitósamente`,
        }
      )
      if (response) {
        const cloneWorkOrders = [...workOrders]
        cloneWorkOrders[index] = response
        setWorkOrders([...cloneWorkOrders])
      }
    }
  }

  return {
    defaultDate: date,
    firstWeekDay,
    weeks,
    workOrdersOnHold,
    workOrdersOnSchedule,
    strict: strict.current,
    handleChangeDate,
    handleSubmit,
    updateWorkOrder,
  }
}

export default function Schedule({ message, allWorkOrders, date }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: 'Planificación semanal',
  })

  const {
    defaultDate,
    firstWeekDay,
    handleChangeDate,
    handleSubmit,
    updateWorkOrder,
    weeks,
    workOrdersOnHold,
    workOrdersOnSchedule,
    strict,
  } = useSchedule({
    allWorkOrders,
    date,
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
          <ScheduleHeader
            title={title}
            defaultDate={defaultDate}
            handleChangeDate={handleChangeDate}
            handleSubmit={handleSubmit}
            showDraft
          />
          <OnSchedule
            deleteWorkOrderById={async (id) =>
              updateWorkOrder({
                id,
                workOrderOnScheduleDto: { onSchedule: false },
              })
            }
            firstWeekDay={firstWeekDay}
            updateWorkOrder={updateWorkOrder}
            workOrdersOnSchedule={workOrdersOnSchedule}
            weeks={weeks}
            strict={strict}
          />

          <ScheduleOnHold
            workOrdersOnHold={workOrdersOnHold}
            updateWorkOrder={updateWorkOrder}
            strict={strict}
          />
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

  const firstDay = date.getDate() - date.getDay()
  const firstWeekDay = new Date(date.getFullYear(), date.getMonth(), firstDay)

  const { data, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: '/schedule',
    params: { date, strict },
  })

  return {
    props: {
      message,
      allWorkOrders: data,
      date: date.toISOString().replace(/T.+/, ''),
      firstWeekDay: firstWeekDay.toString(),
    },
  }
}
