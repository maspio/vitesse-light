import { ref } from 'vue-demi'

export const useList = <T>(items: T[] = []) => {
  const list = ref(items)
  const prepend = (...items: T[]) => {
    list.value.splice(0, 0, ...items as any)
  }
  const append = (...items: T[]) => {
    list.value.push(...items as any)
  }
  const clear = () => {
    list.value.splice(0)
  }
  return { list, prepend, append, clear }
}
