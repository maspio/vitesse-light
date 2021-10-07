<template>
  <div class="m-1 lg:m-8 space-y-1 lg:space-y-8">
    <page-section>
      <Row>
        <template #left>
          <h1 class="font-light text-2xl tracking-wider">
            ZHB Bookslider
          </h1>
        </template>
        <template #right>
          <dark-toggle></dark-toggle>
        </template>
      </Row>
    </page-section>
    <page-section>
      <Bookslider title="Neuerwerbungen"></Bookslider>
    </page-section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSection from '~/components/misc/PageSection.vue'

export default defineComponent({
  components: { PageSection },
  setup() {
    return {}
  },
})
</script>
