<template>
  <div class="wrapper">
    <Flicking
      ref="target"
      :options="{ bound: true, bounce: 30, align: 'prev' }"
      :plugins="plugins"
      first-panel-size="200px"
      :status="status"
    >
      <span class="button mr-2 is-white">🍎 Apple</span>
      <span class="button mr-2 is-white">🍉 Watermelon</span>
      <span class="button mr-2 is-white">🥝 Kiwi</span>
      <span class="button mr-2 is-white">...</span>
    </Flicking>
    <Flicking
      ref="target2"
      :options="{ bound: true, bounce: 30, align: 'prev' }"
      first-panel-size="200px"
      :status="status"
    >
      <span class="button mr-2 is-white">🍔 Hamburger</span>
      <span class="button mr-2 is-white">🍕 Pizza</span>
      <span class="button mr-2 is-white">🍞 Bread</span>
      <span class="button mr-2 is-white">...</span>
    </Flicking>
    <Flicking
      ref="target3"
      :options="{ bound: true, bounce: 30, align: 'prev' }"
      first-panel-size="200px"
      :status="status"
    >
      <span class="button mr-2 is-white">🥛 Milk</span>
      <span class="button mr-2 is-white">☕ Coffee</span>
      <span class="button mr-2 is-white">🍵 Green tea</span>
      <span class="button mr-2 is-white">...</span>
    </Flicking>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Flicking from '@egjs/vue3-flicking'
import { Sync } from '@egjs/flicking-plugins'
import { useSlider } from '../logic/slider'

export default defineComponent({
  components: {
    Flicking,
  },
  setup() {
    const slider = useSlider()
    const target2 = ref<Flicking>()
    const target3 = ref<Flicking>()

    onMounted(() => {
      slider.plugins = [
        new Sync({
          type: 'camera',
          synchronizedFlickingOptions: [
            {
              flicking: slider.target.value! as any,
              isClickable: false,
            },
          ],
        }),
      ]
    })
    return { ...slider, target2, target3 }
  },
})
</script>
