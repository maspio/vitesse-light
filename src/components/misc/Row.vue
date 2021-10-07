<template>
  <div class="slider-row">
    <div v-if="hasLeft || Left" :class="`slider-row ${classLeft} slider-row-left`">
      <slot name="left">
      </slot>
    </div>
    <div v-if="hasCenter || growCenter" :class="`slider-row ${classCenter} slider-row-center`">
      <slot> </slot>
    </div>
    <div v-if="hasRight || growRight" :class="`slider-row ${classRight} slider-row-right`">
      <slot name="right">
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue-demi'

export default defineComponent({
  props: {
    grow: {
      type: String,
      default: 'center',
    },
  },
  setup(props, { slots }) {
    const growOrShrink = (g: any) => (g ? 'slider-row-grow' : 'slider-row-shrink')
    const growLeft = computed(() => props.grow === 'left')
    const growCenter = computed(() => props.grow === 'center')
    const growRight = computed(() => props.grow === 'right')
    const hasLeft = computed(() => !!slots.left)
    const hasCenter = computed(() => !!slots.default)
    const hasRight = computed(() => !!slots.right)
    const classLeft = computed(() => growOrShrink(growLeft.value))
    const classCenter = computed(() => growOrShrink(growCenter.value))
    const classRight = computed(() => growOrShrink(growRight.value))
    return {
      growLeft,
      growCenter,
      growRight,
      hasLeft,
      hasCenter,
      hasRight,
      classLeft,
      classCenter,
      classRight,
    }
  },
})
</script>
