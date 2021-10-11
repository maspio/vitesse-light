<template>
  <ViewSlider
    :title="title"
    :height="height"
    :view="view"
    :filter="filter"
    :api-url="apiUrl"
    :api-token="apiToken"
  >
    <ViewFilterSelect :view-id="view.id" :api-url="apiUrl" placeholder="Alle Fachbereiche" @selected="onFilter"></ViewFilterSelect>
  </ViewSlider>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue-demi'
import { Filter } from '~/types'

export default defineComponent({
  inheritAttrs: true,
  props: {
    title: {
      type: String,
      required: false,
    },
    height: {
      type: String,
      required: false,
    },
    viewIds: {
      type: String,
      required: false,
    },
    apiUrl: {
      type: String,
      default: 'https://bookslider.zhbluzern.ch/api/v1',
    },
    apiToken: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const vIds = computed(() => props.viewIds || 'pMwkLFaq')
    const view = computed(() => ({ id: vIds.value }))
    const filter = ref<Filter>()
    const onFilter = (f: Filter) => filter.value = f
    return { view, filter, onFilter }
  },
})
</script>
