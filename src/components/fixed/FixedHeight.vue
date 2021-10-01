<template>
  <div :class="classes" :style="style">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue-demi'

export default defineComponent({
  props: {
    height: {
      type: Number,
      required: true,
    },
    classes: {
      type: String,
      default: 'box-border w-full',
    },
  },
  setup(props) {
    const style = computed(() => `height: ${props.height}px;`)
    return { style }
  },
})
</script>
