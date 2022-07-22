import prisma from '../../../libs/db'
import {
  cleanBody,
  validateError,
  validateMethods,
} from '../../../libs/validation'

export default async function addMachine(req, res) {
  try {
    validateMethods(req, 'POST')
    const data = cleanBody(
      req,
      'code',
      'name',
      'maker',
      'location',
      'technicalData',
      'specificData',
      'function',
      'criticality',
      'imageUrl'
    )
    const newMachine = await prisma.machines.create({ data })
    return res.status(201).json(newMachine)
  } catch (error) {
    const { status, message } = validateError(error)
    return res.status(status).json({ message })
  }
}
