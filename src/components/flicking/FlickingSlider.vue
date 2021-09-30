<template>
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
      easing: (x) => 1 - Math.pow(1 - x, 3),
      duration: 100,
      inputType: ['pointer'],
    }"
    class="no-margin-padding"
    first-panel-size="200px"
    @ready="onReady"
  >
    <slot> </slot>
  </Flicking>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// eslint-disable-next-line import/named
import Flicking from '@egjs/vue3-flicking'
import { useSlider, SliderReadyHandler } from '../../logic/slider'

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
  emits: ['ready'],
  setup(props, { emit }) {
    const target = ref<Flicking>()
    const onReady: SliderReadyHandler = (slider, state, actions, e) => {
      emit('ready', slider, state, actions, e)
    }
    const slider = useSlider({ target, onReady })
    return {
      ...slider,
      target,
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
