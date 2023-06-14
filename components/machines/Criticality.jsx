import { Badge } from '@tremor/react'
import ArrowUpIcon from '../icons/ArrowUpIcon'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import ArrowDownIcon from '../icons/ArrowDownIcon'

const ICONS = {
  ALTA: ArrowUpIcon,
  MEDIA: ArrowRightIcon,
  BAJA: ArrowDownIcon,
}
const COLORS = {
  ALTA: 'rose',
  MEDIA: 'orange',
  BAJA: 'emerald',
}

export default function Criticality({ criticality }) {
  return (
    <Badge icon={ICONS[criticality?.name]} color={COLORS[criticality?.name]}>
      {criticality.name}
    </Badge>
  )
}
