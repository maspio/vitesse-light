
<template>
  <button type="button" class="slider-button slider-no-outline slider-no-border slider-no-shadow" @click="$emit('click')">
    <span class="sronly">{{ name }}</span>
    <SliderIcon :icon="icon"></SliderIcon>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    name: { type: String, required: true },
    icon: { type: String, required: true },
  },
  emits: ['click'],
})
</script>
