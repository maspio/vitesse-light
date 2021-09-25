/* eslint-disable import/named */
<template>
  <div>
    <Flicking
      ref="target"
      :options="{
        align: 'prev',
        bound: true,
        horizontal: true,
        needPanelThreshold: 3,
        moveType: 'snap',
        renderOnlyVisible: true,
        autoResize: true,
        bounce: '20%',
        deceleration: 0.0075,
        easing: x => 1 - Math.pow(1 - x, 3),
        duration: 100,
        inputType: ['touch', 'mouse'],
      }"
      class="no-margin-padding"
      first-panel-size="200px"
      @ready="onReady"
    >
      <div v-for="idx in list" :key="idx" class="flicking-panel no-margin-padding">
        {{ idx }}
      </div>
    </Flicking>
    <div class="block is-flex is-justify-content-center">
      <button class="button mr-2 is-info is-outlined" @click="prev">
        prev
      </button>
      <button class="button mr-2 is-info is-outlined" @click="next">
        next
      </button>
    </div>
    <div class="block is-flex is-justify-content-center">
      <button class="button mr-2 is-info is-outlined" @click="prepend">
        Prepend
      </button>
      <button class="button mr-2 is-info is-outlined" @click="append">
        Append
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
// eslint-disable-next-line import/named
import Flicking from '@egjs/vue3-flicking'
import { useSlider } from '../logic/slider'

/**
 * Flicking
 * api: https://naver.github.io/egjs-flicking/docs/api/Flicking
 * options: https://naver.github.io/egjs-flicking/Options
 * demo: https://naver.github.io/egjs-flicking/Demos
 */
export default defineComponent({
  components: {
    Flicking,
  },
  setup() {
    const target = ref<Flicking>()
    const slider = useSlider({ target })
    const list = ref([0, 1, 2, 3, 4, 5, 6, 7, 8])
    const length = computed(() => list.value.length || 0)

    const maxIndex = () => list.value.length - 1
    const getAt = (i: number) => list.value[i]
    const last = () => getAt(maxIndex())

    const prepend = () => {
      list.value.splice(0, 0, ...[getAt(0) - 2, getAt(0) - 1])
    }
    const append = () => {
      let nextNum = last() + 1
      const newList = '.'
        .repeat(10)
        .split('.')
        .map(() => nextNum++)
      list.value.push(...newList)
    }
    return {
      ...slider,
      target,
      list,
      prepend,
      append,
      length,
    }
  },
})
</script>

<style>
@import "@egjs/vue3-flicking/dist/flicking.css";

.no-margin-padding {
  padding: 0px;
  margin: 0px;
}

.flicking-viewport {
  height: 240px;
  border-color: red;
  border-width: medium;
}
.flicking-panel {
  height: 240px;
  width: 180px;
  background-color: transparent;
  border-color: blue;
  border-width: medium;
  border-style: solid;
}
</style>
