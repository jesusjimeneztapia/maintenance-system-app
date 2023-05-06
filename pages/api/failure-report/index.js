import nc from 'next-connect'
import { requestExternalApi } from '../../../services/requestApi'
import fileParser from '../../../middlewares/fileParser'
import FormData from 'form-data'
import fs from 'fs-extra'
import { FAILURE_REQUEST_URL_REGULAR } from '../../../services/failureReportServices'

export const config = {
  api: {
    bodyParser: false,
  },
}

const failureReportEndPoint = nc()
failureReportEndPoint.use(fileParser)

failureReportEndPoint.post(async (req, res) => {
  const { method, files } = req
  const {
    body: { machineCode, ...body },
  } = req
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value[0])
  })
  const { image } = files
  if (image != null) {
    const { path } = image[0]
    const stream = fs.createReadStream(path)
    formData.append('image', stream)
  }
  const { data, message, status } = await requestExternalApi({
    data: formData,
    headers: formData.getHeaders(),
    method,
    url: `/machines/${machineCode[0]}/report`,
  })
  return res.status(status).json(message ? { message } : data)
})

failureReportEndPoint.get(async (req, res) => {
  const { method } = req
  const { data, message, status } = await requestExternalApi({
    method,
    url: FAILURE_REQUEST_URL_REGULAR,
  })
  return res.status(status).json(message ? { message } : data)
})

export default failureReportEndPoint
