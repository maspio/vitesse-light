<template>
  <div class="m-8 space-y-4">
    <page-section>
      <h1>ZHB Bookslider Demo</h1>
    </page-section>
    <page-section class="space-y-2">
      <h2>Catalog Slider</h2>
      <Bookslider></Bookslider>
    </page-section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import PageSection from '~/components/demo/PageSection.vue'

export default defineComponent({
  components: { PageSection },
  setup() {
    return {}
  },
})
</script>
