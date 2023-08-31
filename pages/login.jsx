import { Button, Card, Metric, Subtitle, Title } from '@tremor/react'
import Input from '../components/Input'
import { useToast } from '../store/toast'
import { login } from '../services/authServices'
import { useRouter } from 'next/router'
import { parse } from 'cookie'
import { useEffect } from 'react'
import Head from 'next/head'
import { createDocumentTitle } from '../libs/documentTitle'

export default function Login({ redirect }) {
  const router = useRouter()
  const request = useToast((state) => state.request)

  useEffect(() => {
    if (redirect) {
      router.push('/')
    }
  }, [redirect, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    const response = await request(
      async () => await login({ username, password })
    )
    if (response) {
      const { role } = response
      localStorage.setItem('role', role)
      router.push('/')
    }
  }
  return (
    <>
      <Head>
        <title>{createDocumentTitle('Inicio de Sesión')}</title>
      </Head>
      <div className='min-h-[calc(100vh-32px)] flex flex-col gap-5'>
        <section className='m-auto w-full max-w-md'>
          <Metric>Tecnopor S.A</Metric>
          <Title>Sistema de mantenimiento</Title>
          <Card className='w-full mt-4'>
            <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
              <Subtitle className='text-center'>Inicio de Sesión</Subtitle>
              <Input id='username' label='Nombre de usuario' required />
              <Input
                id='password'
                type='password'
                label='Contraseña'
                required
              />
              <Button color='amber'>Iniciar Sesión</Button>
            </form>
          </Card>
        </section>
      </div>
    </>
  )
}

export function getServerSideProps(context) {
  const cookies = parse(context.req.headers.cookie || '')
  const { token, role } = cookies
  const redirect = token != null && role != null

  return { props: { redirect } }
}
