export const notification = (body) => {
  if (!'Notification' in window) {
    console.warn('Browser does not support notifications')
    return false
  }

  if (window.Notification.permission !== 'granted') {
    console.log('Tried to send notification when they are not enabled')
    return false
  }

  const options = {
    icon: '/img/icon.png',
    vibrate: true,
    body
  }

  const n = new window.Notification('Pomodo', options)

  setTimeout(n.close.bind(n), 5000);
}
