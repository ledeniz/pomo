export const initialData = {
  breakTime: 5,
  count: 0,
  intervalId: null,
  isActive: false,
  isBreak: false,
  isFinale: false,
  longBreakTime: 55,
  maxCount: 4,
  startTime: 0,
  time: 8,
  workTime: 8,
  notifications: false
}

export const initialProdData = Object.assign({}, initialData, {
  breakTime: 300,
  longBreakTime: 900,
  time: 1500,
  workTime: 1500
})

export const soundsData = {
  notification: './audio/notification.mp3'
}
