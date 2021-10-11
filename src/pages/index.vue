<template>
  <div class="m-1 lg:m-8 space-y-1 lg:space-y-8">
    <page-section>
      <Row>
        <template #left>
          <h1 class="font-light text-2xl tracking-wider">
            ZHB Bookslider
          </h1>
        </template>
        <template #default>
          <!-- <view-select view-types="collection" view-ids="81238727660005505,81238729470005505" @selected="onView"></view-select> -->
          <view-select @selected="onView"></view-select>
        </template>
        <template #right>
          <dark-toggle></dark-toggle>
        </template>
      </Row>
    </page-section>
    <!-- <div style="height: 100vh"></div> -->
    <page-section>
      <ViewSlider title="Neuerwerbungen" view-types="collection" view-ids="81238727660005505,81238729470005505"></ViewSlider>
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
