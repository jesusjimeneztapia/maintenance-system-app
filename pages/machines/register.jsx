import { useRef, useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import InputFile from '../../components/InputFile'
import Page from '../../components/page'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'
import axios from 'redaxios'
import Alert from '../../components/Alert'

const dataInitialValue = {
  name: '',
  maker: '',
  model: '',
  function: '',
  code: '',
  location: '',
  specificData: '',
  criticality: '',
  image: undefined,
}

export default function RegisterMachine() {
  const previewRef = useRef(null)
  const [data, setData] = useState(dataInitialValue)
  const [showQuestion, setShowQuestion] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowQuestion(true)
    // const formData = new FormData()
    // const keys = Object.keys(dataInitialValue)
    // keys.forEach((key) => {
    //   formData.set(key, data[key])
    // })
    // // formData.append('image', data.image, 'multipart/form-data')
    // try {
    //   const result = await axios.post('/api/machines/add', formData)
    //   console.log(result.data)
    //   alert(`La máquina '${data.name}' fue registrado con éxito`)
    //   setData(dataInitialValue)
    //   previewRef.current.innerHTML = 'Vista previa de la imagen'
    // } catch ({
    //   data: {
    //     data: { message },
    //   },
    // }) {
    //   alert(message)
    // }
  }

  const registerMachine = async () => {
    const formData = new FormData()
    const keys = Object.keys(dataInitialValue)
    keys.forEach((key) => {
      formData.set(key, data[key])
    })
    // formData.append('image', data.image, 'multipart/form-data')
    try {
      const result = await axios.post('/api/machines/add', formData)
      console.log(result.data)
      alert(`La máquina '${data.name}' fue registrado con éxito`)
      cleanForm()
    } catch ({
      data: {
        data: { message },
      },
    }) {
      alert(message)
    }
  }

  const handleChange = ({ target: { value, name } }) => {
    setData((current) => ({ ...current, [name]: value }))
  }

  const cleanForm = () => {
    setData(dataInitialValue)
    previewRef.current.innerHTML = 'Vista previa de la imagen'
  }

  const fileHandleChange = ({ target: { files } }) => {
    const reader = new FileReader()
    const [file] = files
    if (file) {
      reader.readAsDataURL(file)
      reader.onload = function () {
        const img = `<img src="${reader.result}" alt="Preview" />`
        previewRef.current.innerHTML = img
      }
      setData((current) => ({ ...current, image: file }))
    } else {
      setData((current) => ({ ...current, image: undefined }))
    }
  }

  return (
    <Page title='Registro de máquinas | TECNOPOR S.A.'>
      <Alert show={showQuestion} color='info'>
        <article className='flex flex-col gap-2'>
          <h4 className='text-xl font-medium'>Registro de la máquina</h4>
          <p>¿Seguro que quiere registrar la máquina?</p>
          <div className='flex justify-end gap-4 mt-2'>
            <button
              className='text-white bg-blue-900 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-1.5 mr-2'
              onClick={registerMachine}
            >
              Si
            </button>
            <button
              className='text-blue-900 bg-transparent border border-blue-900 hover:bg-blue-900 hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-1.5'
              onClick={() => setShowQuestion(false)}
            >
              No
            </button>
          </div>
        </article>
      </Alert>
      <div className='flex flex-col gap-5'>
        <h2 className='text-2xl font-bold text-center'>Registro de Máquina</h2>
        <form className='grid grid-cols-12 gap-4' onSubmit={handleSubmit}>
          <div className='col-span-3 flex flex-col gap-4'>
            <Input
              id='name'
              label='Nombre'
              placeholder='Nombre de la máquina'
              value={data.name}
              onChange={handleChange}
              required
            />
            <Input
              id='maker'
              label='Fabricante'
              placeholder='Fabricante de la máquina'
              value={data.maker}
              onChange={handleChange}
              required
            />
            <Input
              id='model'
              label='Modelo'
              placeholder='Modelo de la máquina...'
              value={data.model}
              onChange={handleChange}
              required
            />
            <Input
              id='function'
              label='Función'
              placeholder='Función de la máquina'
              value={data.function}
              onChange={handleChange}
              required
            />
            <Input
              id='location'
              label='Ubicación'
              placeholder='Ubicación de la máquina'
              value={data.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className='col-span-3 flex flex-col gap-4'>
            <Input
              id='code'
              label='Código'
              placeholder='Código de la máquina'
              value={data.code}
              onChange={handleChange}
              required
            />
            <Select
              id='criticality'
              label='Criticidad'
              value={data.criticality}
              onChange={handleChange}
              required
            >
              <option value='' disabled>
                Criticidad de la máquina
              </option>
              <option value='HIGH'>Alta</option>
              <option value='MEDIUM'>Media</option>
              <option value='LOW'>Baja</option>
            </Select>
            <Textarea
              id='specificData'
              label='Datos específicos'
              placeholder='Datos específicos de la máquina...'
              rows={10}
              value={data.specificData}
              onChange={handleChange}
              required
            />
          </div>
          <div className='col-span-6 flex flex-col gap-4'>
            <InputFile
              id='image'
              label='Subir imagen'
              onChange={fileHandleChange}
              accept='image/*'
              required
            />
            <div
              ref={previewRef}
              className='bg-gray-300 rounded-lg h-full overflow-hidden flex items-center justify-center text-gray-700 text-sm font-medium'
            >
              Vista previa de la imagen
            </div>
          </div>
          <div className='col-span-12 flex justify-center gap-6'>
            <Button type='submit'>Registrar</Button>
            <button
              className='flex gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-gray-50'
              onClick={cleanForm}
              type='button'
            >
              Borrar datos
            </button>
          </div>
        </form>
      </div>
    </Page>
  )
}
