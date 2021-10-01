<template>
  <div :class="classes" :style="styles">
    <slot v-bind="{ classes, styles }"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue-demi'
import { Size, Ratio, RatioString } from '../../utils'

export default defineComponent({
  props: {
    ratio: {
      type: String as PropType<RatioString>,
      default: '1x1.25',
    },
    fixed: {
      type: String,
      default: 'height',
    },
    length: {
      type: Number,
      default: 100,
    },
    classes: {
      type: String,
      default: 'box-border',
    },
  },
  setup(props) {
    const ratioXY = computed(() => Ratio.parse(props.ratio))
    const size = computed(() => {
      if (props.fixed === 'height')
        return Ratio.toSizeFromHeight(ratioXY.value, props.length)
      if (props.fixed === 'width')
        return Ratio.toSizeFromWidth(ratioXY.value, props.length)
      throw new Error(`FixedRatio fixed=[height|width] not ${props.fixed}`)
    })
    const styles = computed(() => Size.toCss(size.value))
    return { styles }
  },
})
</script>
