import { Card, Flex, Icon } from '@tremor/react'
import OneServerSolidIcon from '../../icons/OneServerSolidIcon'

export default function ImageMachineTable({ code, image }) {
  return (
    <Card>
      {image ? (
        <Flex justifyContent='center'>
          {
            /* eslint-disable */
            <img
              className='max-h-44 w-auto h-full'
              src={image.src}
              alt={image.name}
            />
          }
        </Flex>
      ) : (
        <Icon
          className='flex justify-center h-36'
          icon={OneServerSolidIcon}
          variant='solid'
          size='xl'
          color='amber'
        />
      )}
    </Card>
  )
}
