import { ref, computed, watch } from 'vue-demi'
import { Facet, View } from '~/types'

type FetchViewsProps = {
  viewTypes?: string
  viewIds?: string
  apiUrl?: string
}

export const useFetchViews = (props: FetchViewsProps) => {
  // views
  const views = ref<View[]>([])
  // url
  const types = computed(() => props.viewTypes ? `type=${props.viewTypes}` : '')
  const ids = computed(() => props.viewIds ? `ids=${props.viewIds}` : '')
  const query = computed(() => [types.value, ids.value].filter(v => v).join('&'))
  const url = computed(() => [props.apiUrl, query.value].filter(v => v).join('?'))
  // fetch
  const { data } = useFetch<{views: View[]}>(url, {}, { refetch: true }).json()
  watch(data, (d) => {
    if (d && d.views && d.views.length)
      views.value = d.views
  })
  return { views, url }
}

type FetchViewFacetsProps = {
  viewId?: string
  apiUrl?: string
}

export const useFetchViewFacets = (props: FetchViewFacetsProps) => {
  // views
  const views = ref<Facet[]>([])
  // url
  const url = computed(() => [props.apiUrl, props.viewId].filter(v => v).join('/'))
  // fetch
  const { data } = useFetch<{views: View[]}>(url, {}, { refetch: true }).json()
  watch(data, (d) => {
    if (d && d.views && d.views.length)
      views.value = d.views
  })
  return { views, url }
}