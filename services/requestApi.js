import axios from 'redaxios'
import { HTTP_METHODS } from '.'
import { API_URL } from '../libs/environment'
import { getAPIURL } from '../libs/origin'

async function requestApi({ data, method, params, url, headers, ...rest }) {
  const config = {
    method,
    params,
    url,
    headers,
    ...rest,
  }
  if (method !== HTTP_METHODS.GET) {
    config.data = data
  }
  try {
    const { data: responseData, status } = await axios(config)
    return { data: responseData, status, message: null }
  } catch (error) {
    const { data, status } = error
    let message = 'Ocurrió algún error'
    if (data && data.message) {
      message = data.message
    }
    return {
      status: status ?? 500,
      message,
      data: null,
    }
  }
}

export async function requestExternalApi({
  data,
  method,
  params,
  url,
  headers,
  ...rest
}) {
  return await requestApi({
    data,
    method,
    params,
    url: `${API_URL}${url}`,
    headers,
    ...rest,
  })
}

export async function requestInternalApi(
  context,
  { data, method, params, url, headers, ...rest }
) {
  const baseURL = getAPIURL(context)
  return await requestApi({
    data,
    method,
    params,
    url: `${baseURL}${url}`,
    headers,
    ...rest,
  })
}
