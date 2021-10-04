
<template>
  <div :class="`slider-icon slider-icon-${icon}`" aria-hidden="true"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    icon: { type: String, required: true },
  },
})
</script>
