export default function Button({ children, type }) {
  return (
    <button
      className='flex gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-gray-50'
      type={type}
    >
      {children}
    </button>
  )
}

export function Btn({ children }) {}
