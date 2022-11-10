import { FiArrowDown, FiArrowUp, FiArrowUpRight } from 'react-icons/fi'
import ReportBox from '../ReportBox'

const CRITICALITY = {
  HIGH: (
    <ReportBox variant='danger'>
      <FiArrowUp />
      <span>Alta</span>
    </ReportBox>
  ),
  MEDIUM: (
    <ReportBox variant='warning'>
      <FiArrowUpRight />
      <span>Media</span>
    </ReportBox>
  ),
  LOW: (
    <ReportBox variant='success'>
      <FiArrowDown />
      <span>Baja</span>
    </ReportBox>
  ),
}

export default function Criticality({ criticality }) {
  return <>{CRITICALITY[criticality]}</>
}
