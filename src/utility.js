export const convertMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}ч ${remainingMinutes}м`
}

export const fly = (data, duration) => {
  const date = new Date(data)
  if (duration) {
    date.setUTCMinutes(date.getUTCMinutes() + duration)
  }
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}
