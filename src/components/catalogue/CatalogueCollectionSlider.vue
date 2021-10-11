<template>
  <ViewSlider
    :title="title"
    :height="height"
    :view="view"
    :api-url="apiUrl"
    :api-token="apiToken"
  >
    <ViewSelect view-types="collection" :view-ids="vIds" @selected="onView"></ViewSelect>
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
    const vIds = computed(() => props.viewIds || '81238729470005505,81238727660005505')
    const view = ref<View>()
    const onView = (v: View) => view.value = v
    return { vIds, view, onView }
  },
})
</script>
