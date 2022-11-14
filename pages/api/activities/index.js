import { ACTIVITY_TYPE_VALUES_MAP } from '../../../schemas/activity'
import { HTTP_METHODS } from '../../../services'
import { ACTIVITY_URL_EXTERNAL } from '../../../services/activityServices'
import { requestExternalApi } from '../../../services/requestApi'

const ACTIVITY_TYPE_VALUES = {}

Object.keys(ACTIVITY_TYPE_VALUES_MAP).forEach((key) => {
  ACTIVITY_TYPE_VALUES[key] = key
})

function getFilteredActivities(activities, filter) {
  return activities.filter(({ activityType }) => activityType === filter)
}

export default async function getActivitiesByMachineCode(req, res) {
  const {
    query: { machineCode },
  } = req

  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.GET,
    params: { machineCode },
    url: ACTIVITY_URL_EXTERNAL,
  })

  if (message) {
    return res.status(status).json({ message })
  }

  const { activities, ...rest } = data

  const filteredActivities = {
    CONDITION_CHECK: getFilteredActivities(
      activities,
      ACTIVITY_TYPE_VALUES.CONDITION_CHECK
    ),
    VISUAL_INSPECTIONS: getFilteredActivities(
      activities,
      ACTIVITY_TYPE_VALUES.VISUAL_INSPECTIONS
    ),
    LUBRICATION: getFilteredActivities(
      activities,
      ACTIVITY_TYPE_VALUES.LUBRICATION
    ),
    AUTONOMOUS_MAINTENANCE: getFilteredActivities(
      activities,
      ACTIVITY_TYPE_VALUES.AUTONOMOUS_MAINTENANCE
    ),
    PERIODIC_MAINTENANCE: getFilteredActivities(
      activities,
      ACTIVITY_TYPE_VALUES.PERIODIC_MAINTENANCE
    ),
    CORRECTIVE_MAINTENANCE: getFilteredActivities(
      activities,
      ACTIVITY_TYPE_VALUES.CORRECTIVE_MAINTENANCE
    ),
  }
  return res.status(status).json({ ...filteredActivities, ...rest })
}
