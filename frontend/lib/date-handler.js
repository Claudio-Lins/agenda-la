// const isWeekend = (dayOfWeek) => dayOfWeek === 0 || dayOfWeek === 6
const isWeekend = (dayOfWeek) => dayOfWeek === 0
const zeroPad = (number) => (number < 10 ? '0' + number : number.toString())
const toDateString = (date) =>
  `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(
    date.getDate()
  )}`
const isBlocked = (blockedDays, date) => blockedDays.indexOf(date) >= 0

export const getPossibleDays = (blockedDays = [], numberOfDays = 60) => {
  const today = new Date()
  const possibleDays = []
  for (let i = 0; i < numberOfDays; i++) {
    today.setDate(today.getDate() + 1)
    const dayOfWeek = today.getDay()
    if (!isWeekend(dayOfWeek) && !isBlocked(blockedDays, toDateString(today))) {
      possibleDays.push({
        date: today.toJSON().slice(0, 10),
        dayOfWeek,
      })
    }
  }
  return possibleDays
}

export const extractPossibleWeeks = (possibleDays) => {
  let firstDayOfWeeks = null
  const weeks = []

  possibleDays.forEach((currentDay) => {
    if (firstDayOfWeeks == null) {
      firstDayOfWeeks = currentDay
    }
    if (currentDay.dayOfWeek === 6) {
      weeks.push({
        start: firstDayOfWeeks,
        end: currentDay,
      })
      firstDayOfWeeks = null
    }
  })
  return weeks
}
