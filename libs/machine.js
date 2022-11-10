import FormData from 'form-data'
import fs from 'fs-extra'

export function createFormDataForApi(values, files) {
  const formData = new FormData()
  const { technicalDocumentation: tdInput, ...rest } = values
  const keys = Object.keys(rest)
  keys.forEach((key) => {
    formData.append(key, rest[key][0])
  })
  const technicalDocumentation = JSON.parse(tdInput[0])
  technicalDocumentation.forEach((value) => {
    formData.append('technicalDocumentation', value)
  })
  const { image } = files
  if (image) {
    const { path } = image[0]
    const stream = fs.createReadStream(path)
    formData.append('image', stream)
  }
  return formData
}
