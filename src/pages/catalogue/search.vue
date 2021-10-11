<template>
  <PageLayout>
    <catalogue-search-slider title="Neuerscheinungen"></catalogue-search-slider>
  </PageLayout>
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
  setup() {
    return { }
  },
})
</script>
