import { ref, computed, watch } from 'vue-demi'
import { useFetch } from '@vueuse/core'
import { Facet, View } from '../types'

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
  const url = computed(() => [`${props.apiUrl}/views`, query.value].filter(v => v).join('?'))
  // fetch
  const { data } = useFetch<{ views: View[] }>(url, {}, { refetch: true }).json()
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
  // facets
  const facets = ref<Facet[]>([])
  // url
  const url = computed(() => `${props.apiUrl}/views/${props.viewId}/facets`)
  // fetch
  const { data } = useFetch<{ facets: Facet[] }>(url, {}, { refetch: true }).json()
  watch(data, (d) => {
    if (d && d.facets && d.facets.length)
      facets.value = d.facets
  })
  return { facets, url }
}
