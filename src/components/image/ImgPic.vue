<template>
  <picture :class="classes" :style="styles">
    <source
      :srcset="image.webp"
      type="image/webp"
    />
    <img
      ref="target"
      :class="classes"
      :style="styles"
      :src="image.jpg"
      :alt="alt"
      loading="lazy"
    />
  </picture>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, watch } from 'vue-demi'
import { SizeWH, Size } from '../../utils'
import { ImageSource } from '../../types'

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
    const target = ref<HTMLImageElement>()
    const loaded = ref(false)
    const styles = computed(() => Size.toCss(props.size))
    const onLoad = () => {
      if (!loaded.value) {
        emit('loaded')
        loaded.value = true
      }
    }
    const unwatch = watch(target, () => {
      if (target.value) {
        const complete = target.value.complete
        if (complete) onLoad()
        else target.value.onload = onLoad
        unwatch()
      }
    })
    return { target, styles }
  },
})
</script>
