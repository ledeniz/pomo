import {
  NOTIFICATIONS_SET
} from '../constants/index'

export const notificationsSet = (toggle) => ({
  type: NOTIFICATIONS_SET,
  toggle
})

export const notificationsRequest = () => {
  return (dispatch) => {
    Notification.requestPermission((permission) => {
      switch (permission) {
        case 'granted':
          return dispatch(notificationsSet(true))
          break
        default:
          return dispatch(notificationsSet(false))
          break
      }
    })
  }
}
