<template>
  <canvas ref="target" :class="classes" :style="styles"></canvas>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue-demi'
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
    const ctx2d = computed(() => target.value?.getContext('2d'))
    watch(ctx2d, (ctx) => {
      if (!ctx) return
      const w = ctx.canvas.width
      const h = ctx.canvas.width
      const pixels = decode(props.base83, w, h)
      if (pixels) {
        if (ctx) {
          const imageData = ctx.createImageData(w, h)
          imageData.data.set(pixels)
          ctx.putImageData(imageData, 0, 0)
        }
      }
    })
    return { target, styles }
  },
})
</script>
