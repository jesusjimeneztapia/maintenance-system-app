import axios from 'redaxios'

export async function getSchedule({ date, strict = true }) {
  const { data } = await axios.get('/api/schedule', {
    params: { date, strict },
  })
  return data
}

export async function workOrderOnSchedule({ id, workOrderOnScheduleDto }) {
  const { data } = await axios.put(
    `/api/schedule/${id}`,
    workOrderOnScheduleDto
  )
  return data
}
