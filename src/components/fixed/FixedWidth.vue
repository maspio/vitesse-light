<template>
  <div :class="classes" :style="style">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue-demi'

export default defineComponent({
  props: {
    width: {
      type: Number,
      required: true,
    },
    classes: {
      type: String,
      default: 'box-border',
    },
  },
  setup(props) {
    const style = computed(() => `width: ${props.width}px;`)
    return { style }
  },
})
</script>
