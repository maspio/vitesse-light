<template>
  <picture :class="classes" :style="styles">
    <source
      :srcset="imgSrc.webp"
      type="image/webp"
    />
    <img
      :class="classes"
      :style="styles"
      :src="imgSrc.jpg"
      :alt="alt"
      loading="lazy"
    />
  </picture>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi'
import { ImageSource } from '../types/image'

export default defineComponent({
  props: {
    imgSrc: {
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
    styles: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {}
  },
})
</script>
