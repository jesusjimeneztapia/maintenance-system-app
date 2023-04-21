export default function DayValue() {
  return (
    <TableCell
      key={index}
      className={`text-center ${
        hours != null && hours > 11 ? 'bg-blue-500' : 'bg-amber-500'
      }`}
    >
      {plannedDay == null ? (
        <input
          className='border-none bg-transparent rounded'
          type='number'
          min='0'
          max='23'
          placeholder='hr'
        />
      ) : (
        <>
          {new Date(plannedDay).getDate() === firstDay + 1 + index && (
            <>
              {new Date(plannedDay).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </>
          )}
        </>
      )}
    </TableCell>
  )
}
