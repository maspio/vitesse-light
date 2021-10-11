<template>
  <ViewSlider :title="title" :view="view" :filter="filter">
    <ViewSelect :view-types="viewTypes" :view-ids="viewIds" @selected="onView"></ViewSelect>
    <FilterSelect v-if="isSearchType" @selected="onFilter"></FilterSelect>
  </ViewSlider>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { Filter, View } from '~/types'

export default defineComponent({
  props: {
    title: {
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
