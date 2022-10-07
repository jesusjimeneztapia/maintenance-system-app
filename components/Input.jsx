export default function Input({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
}) {
  return (
    <div>
      <label htmlFor={id} className='text-sm font-medium text-gray-900'>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className='mt-2 bg-gray-50 border border-gray-300 placeholder:text-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete='off'
      />
    </div>
  )
}
