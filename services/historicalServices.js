import axios from 'redaxios'

export const HISTORICAL_URL_EXTERNAL = '/historical'

export async function getHistoricalSummary({ machineCode, lte = new Date() }) {
  const { data } = await axios.get(
    `/api/machines/${machineCode}${HISTORICAL_URL_EXTERNAL}/summary`,
    { params: { lte } }
  )
  return data
}

export async function getHistorical({ machineCode, lte = new Date() }) {
  const { data } = await axios.get(
    `/api/machines/${machineCode}${HISTORICAL_URL_EXTERNAL}`,
    { params: { lte } }
  )
  return data
}
