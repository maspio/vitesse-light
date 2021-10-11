<template>
  <ViewSlider
    :title="title"
    :height="height"
    :view="view"
    :filter="filter"
    :api-url="apiUrl"
    :api-token="apiToken"
  >
    <template #left>
      <ViewSelect :api-url="apiUrl" :view-types="viewTypes" :view-ids="viewIds" @selected="onView"></ViewSelect>
    </template>
    <ViewFilterSelect v-if="isSearchType" :view-id="view.id" :api-url="apiUrl" placeholder="Alle Fachbereiche" @selected="onFilter"></ViewFilterSelect>
  </ViewSlider>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue-demi'
import { Filter, View } from '../../types'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: false,
    },
    height: {
      type: String,
      required: false,
    },
    viewTypes: {
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
  setup() {
    const view = ref<View>()
    const filter = ref<Filter>()
    const onView = (v: View) => view.value = v
    const onFilter = (f: Filter) => filter.value = f
    const viewType = computed(() => view.value?.type)
    const isSearchType = computed(() => viewType.value ? viewType.value === 'search' : false)
    return { view, onView, filter, onFilter, isSearchType }
  },
})
</script>
