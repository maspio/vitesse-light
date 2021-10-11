<template>
  <PageLayout>
    <!-- view-types="collection" -->
    <catalogue-slider :api-url="'http://localhost/api/v1'"></catalogue-slider>
  </PageLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  setup() {
    return { }
  },
})
</script>
