<template>
  <picture :class="classes" :style="styles">
    <source
      :srcset="image.webp"
      type="image/webp"
    />
    <img
      :class="classes"
      :style="styles"
      :src="image.jpg"
      :alt="alt"
      :onload="onLoad"
      loading="lazy"
    />
  </picture>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi'
import { ImageSource } from '../types/image'
import { SizeWH, Size } from '../utils'

export default defineComponent({
  props: {
    image: {
      type: Object as PropType<ImageSource>,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
    classes: {
      type: String,
      default: 'w-full h-full',
    },
    size: {
      type: Object as PropType<SizeWH>,
      required: true,
    },
  },
  emits: ['loaded'],
  setup(props, { emit }) {
    const styles = computed(() => Size.toCss(props.size))
    const onLoad = () => {
      emit('loaded')
    }
    return { onLoad, styles }
  },
})
</script>
