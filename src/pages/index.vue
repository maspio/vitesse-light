<template>
  <div class="m-1 lg:m-8 space-y-20 lg:space-y-40">
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
    <!-- catalogue -->
    <page-section>
      <catalogue-slider title="Neuerscheinungen"></catalogue-slider>
    </page-section>
    <!-- collection -->
    <page-section>
      <collection-slider title="Guck mal"></collection-slider>
    </page-section>
    <!-- bookslider -->
    <page-section>
      <bookslider title="Bookslider"></bookslider>
    </page-section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
export default defineComponent({
  setup() {
    // eslint-disable-next-line no-console
    const onView = (v: any) => console.log('view selected', v)
    return { onView }
  },
})
</script>
