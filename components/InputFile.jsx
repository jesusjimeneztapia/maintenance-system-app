import { useState } from 'react'
import styles from '../styles/Input.module.css'

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
  const [active, setActive] = useState(false)

  const getImagePreview = () => {
    let image = file
    const { src } = file
    if (!src) {
      image = {
        src: URL.createObjectURL(file),
        alt: file.name,
      }
    }
    return <img {...image} />
  }

  const createHandleActive = (value) => () => {
    setActive(value)
  }

  return (
    <>
      <div
        className={`${styles['group-file']} ${active && styles.active} ${
          error && styles.error
        } ${disabled && styles.disabled}`}
      >
        {file ? (
          <>{getImagePreview()}</>
        ) : (
          <label className={styles['label-file']}>
            {label}
            <span>{message}</span>
          </label>
        )}
        <input
          className={styles['input-file']}
          id={id}
          name={id}
          type='file'
          onChange={onChange}
          accept={accept}
          required={required}
          onDragLeaveCapture={createHandleActive(false)}
          onDragEnterCapture={createHandleActive(true)}
          onDropCapture={createHandleActive(false)}
          disabled={disabled}
        />
      </div>
      {error && <small>{error}</small>}
    </>
  )
}
