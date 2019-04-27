export const initialData = {
  breakTime: 1,
  count: 0,
  intervalId: null,
  isActive: false,
  isBreak: false,
  isFinale: false,
  longBreakTime: 2,
  maxCount: 4,
  startTime: 0,
  time: 1,
  workTime: 1,
  notifications: false
}

export const initialProdData = Object.assign({}, initialData, {
  breakTime: 300,
  longBreakTime: 900,
  time: 1500,
  workTime: 1500
})

export const soundsData = {
  work: './audio/work.mp3',
  relax: './audio/relax.mp3'
}
