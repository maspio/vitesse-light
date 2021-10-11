<template>
  <ViewSlider
    :title="title"
    :height="height"
    :view="view"
    :filter="filter"
    :api-url="apiUrl"
    :api-token="apiToken"
  >
    <ViewFilterSelect @selected="onFilter"></ViewFilterSelect>
  </ViewSlider>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { Filter } from '~/types'

export default defineComponent({
  inheritAttrs: true,
  props: {
    title: {
      type: String,
      required: false,
    },
    height: {
      type: Number,
      default: 300,
    },
    viewIds: {
      type: String,
      required: false,
    },
    apiUrl: {
      type: String,
      default: 'http://localhost/api/v1/views',
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
