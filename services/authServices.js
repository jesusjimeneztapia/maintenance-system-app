import axios from 'redaxios'

export async function login({ username, password }) {
  const { data } = await axios.post('/api/auth/login', { username, password })
  return data
}

export async function logout() {
  await axios.post('/api/auth/logout')
  return true
}
