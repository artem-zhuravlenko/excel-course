export const capitalize = (string) => {
  if (typeof string === "string") {
    return string.charAt(0).toUpperCase() + string.slice(1)
  } else {
    return ''
  }
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  return localStorage.setItem(key, JSON.stringify(data))
}