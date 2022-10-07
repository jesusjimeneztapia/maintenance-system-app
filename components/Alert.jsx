const COLOR = {
  info: 'text-blue-900 bg-blue-100 border-blue-400',
  danger: 'text-red-900 bg-red-100 border-red-400',
  success: 'text-green-900 bg-green-100 border-green-400',
  warning: 'text-yellow-900 bg-yellow-100 border-yellow-400',
  dark: 'text-gray-900 bg-gray-100 border-gray-400',
}

export default function Alert({ show, color, children }) {
  if (!show) {
    return <></>
  }

  return (
    <div
      className={`gap-4 w-96 absolute top-3 left-1/2 -translate-x-1/2 p-4 mb-4 text-base rounded-lg border ${COLOR[color]}`}
      role='alert'
    >
      {children}
    </div>
  )
}
