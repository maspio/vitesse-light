<template>
  <Row grow="center">
    <template #left>
      <slot name="left">
        <h2 v-if="!!title" class="slider-title">
          {{ title }}
        </h2>
      </slot>
    </template>
    <template #default>
      <slot>
      </slot>
    </template>
    <template #right>
      <slot name="right">
        <SliderButton
          @clickprevious="$emit('previous')"
          @clicknext="$emit('next')"
        ></SliderButton>
      </slot>
    </template>
  </Row>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  emits: ['previous', 'next'],
  setup() {
    return {}
  },
})
</script>
