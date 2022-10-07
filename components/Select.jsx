export default function Select({
  children,
  id,
  label,
  onChange,
  required = false,
  value = '',
}) {
  return (
    <div>
      <label htmlFor={id} className='text-sm font-medium text-gray-900'>
        {label}
      </label>
      <select
        id={id}
        name={id}
        className='mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        value={value}
        onChange={onChange}
        required={required}
      >
        {children}
      </select>
    </div>
  )
}
