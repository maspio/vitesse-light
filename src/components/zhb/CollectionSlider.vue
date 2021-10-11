<template>
  <ViewSlider :title="title" :view="view">
    <ViewSelect view-types="collection" :view-ids="viewIds" @selected="onView"></ViewSelect>
  </ViewSlider>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { View } from '~/types'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: false,
    },
    viewIds: {
      type: String,
      default: '81238729470005505,81238727660005505',
    },
  },
  setup() {
    const view = ref<View>()
    const onView = (v: View) => view.value = v
    return { view, onView }
  },
})
</script>
