import nc from 'next-connect'
import { serialize } from 'cookie'
import { requestExternalApi } from '../../../services/requestApi'

const MAX_AGE = 1000 * 60 * 60 * 24 * 30 * 12

const loginEndPoint = nc()

loginEndPoint.post(async (req, res) => {
  const { method, body } = req
  const { data, message, status } = await requestExternalApi({
    method,
    url: '/auth/login',
    data: body,
  })
  if (message != null) {
    return res.status(status).json({ message })
  }

  const token = serialize('token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  })
  const role = serialize('role', data.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  })
  res.setHeader('Set-Cookie', [token, role])
  return res.json({ role: data.role })
})

export default loginEndPoint
