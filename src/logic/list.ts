import { ref, computed } from 'vue'

export const useList = <T>(items: T[] = []) => {
  const list = ref(items)
  const length = computed(() => list.value.length)
  const at = (i: number) => list.value[i] as T
  const first = computed(() => at(0))
  const lastIndex = computed(() => list.value.length - 1)
  const last = computed(() => at(lastIndex.value))
  const prepend = (...items: T[]) => {
    list.value.splice(0, 0, ...items as any)
  }
  const append = (...items: T[]) => {
    list.value.push(...items as any)
  }
  return { list, length, at, first, lastIndex, last, prepend, append }
}
