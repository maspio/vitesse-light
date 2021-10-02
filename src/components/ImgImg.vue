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
import { ImageSource } from '../types/image'
import { SizeWH } from '../utils'

/* eslint-disable no-console */

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

<style>
.relative-full-size {
  @apply box-border relative w-full h-full rounded-lg
}

.absolute-full-size {
  @apply box-border absolute left-0 top-0 right-0 bottom-0 rounded-lg
}

.img-blur {
  @apply box-border z-10 transition-opacity opacity-0 duration-400 delay-300 ease-in pointer-events-none
}

.img-blur-loading {
  @apply opacity-100
}

.img-rounded {
  @apply rounded-lg
}

</style>
