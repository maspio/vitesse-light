<template>
  <div class="relative-full-size">
    <ImgBlur
      :classes="`absolute-full-size img-blur ${loading ? 'img-blur-loading' : ''}`"
      :size="size"
      :base83="image.base83"
    ></ImgBlur>
    <ImgPic
      :image="image"
      classes="absolute-full-size"
      :size="size"
      @loaded="onLoaded"
    ></ImgPic>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue-demi'
import { ImageSource } from '../../types'
import { SizeWH } from '../../utils'

export default defineComponent({
  props: {
    image: {
      type: Object as PropType<ImageSource>,
      required: true,
    },
    size: {
      type: Object as PropType<SizeWH>,
      required: true,
    },
  },
  setup() {
    const loading = ref(false)
    const onLoaded = () => {
      loading.value = false
    }
    onMounted(async () => {
      loading.value = true
    })
    return { loading, onLoaded }
  },
})
</script>
