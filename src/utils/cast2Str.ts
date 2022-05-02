export function getTimeStr (timestamp: string): string {
  const time = new Date(timestamp).getTime()
  if (Number.isNaN(time)) return '未知'
  const currentTime = Date.now()
  const diff = (currentTime - time) / (1000 * 60 * 60)
  if (diff >= 24 * 29 * 12) {
    return `${Math.floor(diff / (24 * 29 * 12))}年前`
  } else if (diff >= 29 * 24) {
    return `${Math.floor(diff / (24 * 29))}月前`
  } else if (diff >= 24) {
    return `${Math.floor(diff / 24)}天前`
  } else if (diff >= 1) {
    return `${Math.floor(diff)}小时前`
  } else if (diff * 60 >= 1) {
    return `${Math.floor(diff * 60)}分钟前`
  } else {
    return Math.floor(diff * 60 * 60) < 10
      ? '几秒前'
      : `${Math.floor(diff * 60 * 60)}秒前`
  }
}

export function getCountStr (count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  } else {
    return count ? count.toString() : ' '
  }
}

export function notifCountStr (count: number): string {
  if (count > 99) {
    return '99+'
  } else {
    return count.toString()
  }
}
