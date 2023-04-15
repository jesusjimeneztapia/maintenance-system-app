import { Flex, Subtitle, Text } from '@tremor/react'
import UploadSolidIcon from './icons/UploadSolidIcon'

export default function InputFile({
  id,
  label = 'Subir archivo',
  message = 'Arrastre aquí el archivo o haz click para seleccionar un archivo.',
  onChange,
  file,
  accept = '*',
  error,
  required = false,
  disabled,
}) {
  // const [active, setActive] = useState(false)

  const getImagePreview = () => {
    let image = file
    const { src } = file
    if (!src) {
      image = {
        src: URL.createObjectURL(file),
        alt: file.name,
      }
    }
    return <img {...image} /> // eslint-disable-line
  }

  // const createHandleActive = (value) => () => {
  //   setActive(value)
  // }

  return (
    <Flex className='gap-2' flexDirection='col' alignItems=''>
      <div className='flex items-center justify-center w-full'>
        <label
          htmlFor={id}
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 overflow-hidden ${
            error ? 'border-red-500' : 'border-slate-300'
          }`}
        >
          {file ? (
            <>{getImagePreview()}</>
          ) : (
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <UploadSolidIcon className='w-10 h-10 mb-3 text-slate-400' />
              <Subtitle className='mb-2'>{label}</Subtitle>
              <Text className='text-center px-3'>{message}</Text>
            </div>
          )}
          <input
            className='hidden'
            id={id}
            name={id}
            onChange={onChange}
            accept={accept}
            type='file'
            required={required}
            // onDragLeaveCapture={createHandleActive(false)}
            // onDragEnterCapture={createHandleActive(true)}
            // onDropCapture={createHandleActive(false)}
            disabled={disabled}
          />
        </label>
      </div>
      {error && <p className='text-sm text-red-600'>{error}</p>}
    </Flex>
  )
}
