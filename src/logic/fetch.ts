/* eslint-disable no-console */
import { ref, computed, watch, Ref } from 'vue-demi'
import { useFetch, MaybeRef } from '@vueuse/core'
import { useList } from './list'

type FetchMoreOptions = {
  pageSize: MaybeRef<number>
}

const FetchMoreOptionsDefault: FetchMoreOptions = {
  pageSize: 10,
}

export const useFetchMore = <T>(baseUrl: Ref<string>, options?: FetchMoreOptions) => {
  const opts = { ...FetchMoreOptionsDefault, ...options }

  const offset = ref(0)
  const limit = computed(() => unref(opts.pageSize))
  const total = ref(opts.pageSize)

  const url = computed(() => {
    const prefix = baseUrl.value.indexOf('?') ? '&' : '?'
    const url = `${baseUrl.value}${prefix}offset=${offset.value}&limit=${limit.value}`
    console.log('url', url)
    return url
  })

  const { data, error, isFetching } = useFetch<T>(url, {}, { refetch: true }).get().json()

  const { list, append, clear } = useList<T>()
  watch(data, (newData) => {
    total.value = newData.total
    append(...newData.hits)
  })
  watch(baseUrl, () => clear())

  const canFetchMore = computed(() => {
    return list.value.length < total.value
  })
  const fetchMore = () => {
    offset.value = offset.value + unref(opts.pageSize)
  }
  return { list, canFetchMore, fetchMore, isFetching, error }
}
