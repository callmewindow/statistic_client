// 接口的辅助方法
import qs from 'qs'

export function QS(obj) {
  return qs.stringify(obj)
}