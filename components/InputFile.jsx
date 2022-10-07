export default function InputFile({
  id,
  label,
  onChange,
  accept = '*',
  required = false,
}) {
  return (
    <div>
      <label
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className='file:p-2.5 file:rounded-l-lg file:border-none file:bg-gray-900 file:cursor-pointer file:text-gray-50 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none'
        id={id}
        name={id}
        type='file'
        onChange={onChange}
        accept={accept}
        required={required}
      />
    </div>
  )
}
