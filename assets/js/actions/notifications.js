import {
  NOTIFICATIONS_SET
} from '../constants/index'

export const notificationsSet = (toggle) => ({
  type: NOTIFICATIONS_SET,
  toggle
})

export const notificationsRequest = () => {
  return (dispatch) => {
    try {
      Notification.requestPermission(
        permission => handleNotificationsRequest(permission)
      )
    } catch (e) {
      console.error('Error: Requesting notifications permission')
      console.error(e)
    }
  }
}

/**
 * Thanks to Safari being Goofy as hell, this is neccesary
 */
const handleNotificationsRequest = (permission) => {
  return (dispatch) => {
    switch (permission) {
      case 'granted':
        return dispatch(notificationsSet(true))
        break
      default:
        return dispatch(notificationsSet(false))
        break
    }
  }
}
