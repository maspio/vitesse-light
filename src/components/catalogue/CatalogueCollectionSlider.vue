<template>
  <ViewSlider
    :title="title"
    :height="height"
    :view="view"
    :api-url="apiUrl"
    :api-token="apiToken"
  >
    <ViewSelect :api-url="apiUrl" view-types="collection" :view-ids="vIds" @selected="onView"></ViewSelect>
  </ViewSlider>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue-demi'
import { View } from '~/types'

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
    const vIds = computed(() => props.viewIds || '81238729470005505,81238727660005505')
    const view = ref<View>()
    const onView = (v: View) => view.value = v
    return { vIds, view, onView }
  },
})
</script>
