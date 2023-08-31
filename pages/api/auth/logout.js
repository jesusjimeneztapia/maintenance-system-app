import { serialize } from 'cookie'

export default function logout(_req, res) {
  const token = serialize('token', null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  })
  const role = serialize('role', null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  })
  res.setHeader('Set-Cookie', [token, role])
  return res.send()
}
