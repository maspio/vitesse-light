<template>
  <div class="slider-row">
    <div v-if="hasLeft" :class="`slider-row ${leftClass} slider-row-left`">
      <slot name="left">
      </slot>
    </div>
    <div v-if="hasMiddle" :class="`slider-row ${centerClass} slider-row-center`">
      <slot> </slot>
    </div>
    <div v-if="hasRight" :class="`slider-row ${rightClass} slider-row-right`">
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
      default: 'left',
    },
  },
  setup(props, { slots }) {
    const growOrShrink = (g: any) => (g ? 'slider-row-grow' : 'slider-row-shrink')
    const hasLeft = computed(() => !!slots.left)
    const hasMiddle = computed(() => !!slots.default)
    const hasRight = computed(() => !!slots.right)
    const leftClass = computed(() => growOrShrink(props.grow === 'left'))
    const centerClass = computed(() => growOrShrink(props.grow === 'center'))
    const rightClass = computed(() => growOrShrink(props.grow === 'right'))
    return {
      hasLeft,
      hasMiddle,
      hasRight,
      leftClass,
      centerClass,
      rightClass,
    }
  },
})
</script>
