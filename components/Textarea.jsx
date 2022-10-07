export default function Textarea({
  id,
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  required = false,
}) {
  return (
    <div>
      <label htmlFor={id} className='text-sm font-medium text-gray-900'>
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        className='mt-2 block resize-none p-2.5 w-full text-sm text-gray-900 placeholder:text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}
