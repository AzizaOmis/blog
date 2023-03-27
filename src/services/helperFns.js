export const clippingText = (text, num) => {
  if (text.trim().length < num) return text.trim()
  let arr = text.trim().split('')
  let idx = arr.indexOf(' ', num - 1)
  if (arr[idx - 1] === ',') {
    idx -= 1
  }
  arr = arr.slice(0, idx).join('') + '...'
  if (arr.length > num) {
    arr = text.split('').slice(0, num).join('') + '...'
  }
  return arr
}
