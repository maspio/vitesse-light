<template>
  <canvas ref="target" :class="classes" :style="styles"></canvas>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, watchEffect } from 'vue-demi'
import { decode } from '@picibird/blurhash-ts'
import { SizeWH, Size } from '../utils'

export default defineComponent({
  props: {
    size: {
      type: Object as PropType<SizeWH>,
      required: true,
    },
    base83: {
      type: String,
      default: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj',
    },
    classes: {
      type: String,
      default: 'w-full h-full',
    },
  },
  setup(props) {
    const target = ref<HTMLCanvasElement>()
    const styles = computed(() => Size.toCss(props.size))
    const ctx = computed(() => target.value?.getContext('2d'))
    const unwatch = watchEffect(() => {
      if (!ctx.value) return
      const ctx2d = ctx.value
      const w = ctx2d.canvas.width
      const h = ctx2d.canvas.height
      if (!w || !h) return
      const pixels = decode(props.base83, w, h)
      if (pixels) {
        const imageData = new ImageData(pixels, w, h)
        ctx2d.putImageData(imageData, 0, 0)
      }
      unwatch()
    })
    return { target, styles }
  },
})
</script>
