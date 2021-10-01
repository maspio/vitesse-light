import { ref, computed } from 'vue'

export const useList = <T>(items: T[] = []) => {
  const list = ref<T[]>(items)
  const length = computed(() => list.value.length || 0)
  const lastIndex = () => list.value.length - 1
  const getAt = (i: number) => list.value[i]
  const last = () => getAt(lastIndex())
  const prepend = (...items: T[]) => {
    list.value.splice(0, 0, ...items as any)
  }
  const append = (...items: T[]) => {
    list.value.push(...items as any)
  }
  return { list, length, prepend, append, lastIndex, getAt, last }
}
