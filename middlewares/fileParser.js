import nc from 'next-connect'
import { Form } from 'multiparty'

const fileParser = nc()

fileParser.use((req, res, next) => {
  const form = new Form()

  form.parse(req, (_error, fields, files) => {
    req.body = fields
    req.files = files
    next()
  })
})

export default fileParser
