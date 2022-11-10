import axios from 'redaxios'
import { API_URL } from '../../../libs/environment'

const ACTICITY_TYPE = {
  CONDITION_CHECK: 'CONDITION_CHECK',
  VISUAL_INSPECTIONS: 'VISUAL_INSPECTIONS',
  LUBRICATION: 'LUBRICATION',
  AUTONOMOUS_MAINTENANCE: 'AUTONOMOUS_MAINTENANCE',
  PERIODIC_MAINTENANCE: 'PERIODIC_MAINTENANCE',
  CORRECTIVE_MAINTENANCE: 'CORRECTIVE_MAINTENANCE',
}

function getFilteredActivities(activities, filter) {
  return activities.filter(({ activityType }) => activityType === filter)
}

export default async function getActivitiesByMachineCode(req, res) {
  const {
    query: { machineCode },
  } = req

  try {
    const { data } = await axios.get(`${API_URL}/activities`, {
      params: { machineCode },
    })
    const filteredActivities = {
      CONDITION_CHECK: getFilteredActivities(
        data,
        ACTICITY_TYPE.CONDITION_CHECK
      ),
      VISUAL_INSPECTIONS: getFilteredActivities(
        data,
        ACTICITY_TYPE.VISUAL_INSPECTIONS
      ),
      LUBRICATION: getFilteredActivities(data, ACTICITY_TYPE.LUBRICATION),
      AUTONOMOUS_MAINTENANCE: getFilteredActivities(
        data,
        ACTICITY_TYPE.AUTONOMOUS_MAINTENANCE
      ),
      PERIODIC_MAINTENANCE: getFilteredActivities(
        data,
        ACTICITY_TYPE.PERIODIC_MAINTENANCE
      ),
      CORRECTIVE_MAINTENANCE: getFilteredActivities(
        data,
        ACTICITY_TYPE.CORRECTIVE_MAINTENANCE
      ),
    }
    return res.json(filteredActivities)
  } catch (error) {
    const { data, status } = error
    return res
      .status(status ?? 500)
      .json(data ?? { message: 'Ocurrió algún error' })
  }
}
