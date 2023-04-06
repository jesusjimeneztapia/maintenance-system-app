export function isInspection({ activityName, activityType, machineCheckList }) {
  return (
    machineCheckList?.length > 0 &&
    activityType === 'INSPECTION' &&
    (activityName === 'INSPECCION' || activityName === 'INSPECCIÓN')
  )
}
