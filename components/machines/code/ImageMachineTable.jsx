import { CgDatabase } from 'react-icons/cg'
import Box from '../../Box'
import TableBordered from '../../TableBordered'

export default function ImageMachineTable({ code, image }) {
  return (
    <Box>
      <TableBordered>
        <thead>
          <tr>
            <th>Código Máquina</th>
            <th>{code}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>
              {image ? (
                <img
                  style={{ maxWidth: '100%' }}
                  src={image.src}
                  alt={image.name}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <CgDatabase
                    style={{
                      width: 'calc(100% - 12rem)',
                      height: 'auto',
                    }}
                  />
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </TableBordered>
    </Box>
  )
}
