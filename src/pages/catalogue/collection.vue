<template>
  <PageLayout>
    <!-- view-ids="81238729470005505,81238727660005505" -->
    <catalogue-collection-slider :api-url="'http://localhost/api/v1'" title="Guck mal" view-ids="81238729470005505,81238727660005505"></catalogue-collection-slider>
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
