<template>
  <span class="slider-buttons">
    <SliderIconButton
      class="slider-button-prev"
      name="Previous"
      icon="arrow-left"
      @click="$emit('clickprevious')"
    ></SliderIconButton>
    <SliderIconButton
      class="slider-button-next"
      name="Next"
      icon="arrow-right"
      @click="$emit('clicknext')"
    ></SliderIconButton>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  emits: ['clickprevious', 'clicknext'],
  setup() {
    return {}
  },
})
</script>
