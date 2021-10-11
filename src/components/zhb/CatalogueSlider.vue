<template>
  <ViewSlider :title="title" :view="view" :filter="filter">
    <FilterSelect @selected="onFilter"></FilterSelect>
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
    viewId: {
      type: String,
      default: 'pMwkLFaq',
    },
  },
  setup(props) {
    const view = { id: props.viewId }
    const filter = ref<Filter>()
    const onFilter = (f: Filter) => filter.value = f
    return { view, filter, onFilter }
  },
})
</script>
