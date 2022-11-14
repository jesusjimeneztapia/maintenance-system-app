import { HTTP_METHODS } from '.'
import { createActivityDto, updateActivityDto } from '../schemas/activity'

export const ACTIVITY_URL_REGULAR = '/activities'
export function getActivityByCodeUrlRegular(activityCode) {
  return `${ACTIVITY_URL_REGULAR}/${activityCode}`
}

export const ACTIVITY_URL_EXTERNAL = ACTIVITY_URL_REGULAR
export function getActivityByCodeUrlExternal(activityCode) {
  return `${ACTIVITY_URL_EXTERNAL}/${activityCode}`
}

const ACTIVITY_URL_INTERNAL = `/api${ACTIVITY_URL_REGULAR}`
const CREATE_ACTIVITY_URL_INTERNAL = `${ACTIVITY_URL_INTERNAL}/create`

function editActivityByCodeUrlInternal(activityCode) {
  return `${ACTIVITY_URL_INTERNAL}/${activityCode}/edit`
}
export function deleteActivityByCodeUrlInternal(activityCode) {
  return `${ACTIVITY_URL_INTERNAL}/${activityCode}/delete`
}

export const CREATE_ACTIVITY_CONFIG = {
  method: HTTP_METHODS.POST,
  url: CREATE_ACTIVITY_URL_INTERNAL,
  dtoValidation: createActivityDto,
}
export function editActivityConfig(activityCode) {
  return {
    method: HTTP_METHODS.PUT,
    url: editActivityByCodeUrlInternal(activityCode),
    dtoValidation: updateActivityDto,
  }
}
