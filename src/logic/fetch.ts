import { ref, computed, watch, Ref } from 'vue-demi'
import { useFetch } from '@vueuse/core'
import { useList } from './list'

import { logger } from './log'
const log = logger('fetch')

type FetchMoreOptions = {
  pageSize?: Ref<number>
}

const FetchMoreOptionsDefault: FetchMoreOptions = {
  pageSize: ref(10),
}

export const useFetchMore = <T>(baseUrl: Ref<string>, options?: FetchMoreOptions) => {
  const opts = { ...FetchMoreOptionsDefault, ...options }

  const offset = ref(0)
  const limit = computed(() => opts.pageSize!.value)
  const total = ref(opts.pageSize!.value)

  const url = computed(() => {
    const prefix = baseUrl.value.indexOf('?') > 0 ? '&' : '?'
    return `${baseUrl.value}${prefix}offset=${offset.value}&limit=${limit.value}`
  })
  const fetchUrl = ref(url.value)
  const { data, error, isFetching } = useFetch<T>(fetchUrl, {}, { refetch: true, beforeFetch: ctx => log.info('fetch', ctx.url) }).get().json()

  const { list, append, clear } = useList<T>()
  watch(data, (newData) => {
    total.value = newData.total
    append(...newData.hits)
  })
  watch(baseUrl, () => {
    clear()
    offset.value = 0
    fetchUrl.value = url.value
  })

  const canFetchMore = computed(() => {
    return list.value.length < total.value
  })
  const fetchMore = () => {
    if (canFetchMore.value) {
      offset.value = offset.value + opts.pageSize!.value
      fetchUrl.value = url.value
    }
    else {
      log.warn(`cannot fetch more than total ${total.value}`)
    }
  }
  return { fetchUrl: url, list, canFetchMore, fetchMore, isFetching, error }
}
