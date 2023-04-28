import axios from 'redaxios'

export const INDICATOR_URL_EXTERNAL = '/indicators'
const INDICATOR_URL_INTERNAL = `/api${INDICATOR_URL_EXTERNAL}`

export async function getIndicators({ date, strict }) {
  const { data } = await axios.get(INDICATOR_URL_INTERNAL, {
    params: { date, strict },
  })
  return data
}
