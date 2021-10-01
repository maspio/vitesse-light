/* eslint-disable no-console */
import { ref, computed, watch } from 'vue-demi'
import { useFetch, MaybeRef } from '@vueuse/core'
import { useList } from './list'

type FetchMoreOptions = {
  pageSize: MaybeRef<number>
}

const FetchMoreOptionsDefault: FetchMoreOptions = {
  pageSize: 10,
}

export const useFetchMore = <T>(baseUrl: MaybeRef<string>, options?: FetchMoreOptions) => {
  const opts = { ...FetchMoreOptionsDefault, ...options }
  const offset = ref(0)
  const query = computed(() => ({
    offset: offset.value,
    limit: unref(opts.pageSize),
  }))
  const total = ref(opts.pageSize)
  const { list, append } = useList<T>()
  const url = computed(() => `${baseUrl}?offset=${query.value.offset}&limit=${query.value.limit}`)
  const { data, error, isFetching, execute } = useFetch<T>(url).get().json()
  watch(data, (newData) => {
    total.value = newData.total
    append(...newData.hits)
  })
  const canFetchMore = computed(() => {
    return list.value.length < total.value
  })
  const fetchMore = async () => {
    const ps = unref(opts.pageSize)
    const newOffset = offset.value + ps
    offset.value = newOffset
    await execute()
  }
  return { list, canFetchMore, fetchMore, isFetching, error }
}
