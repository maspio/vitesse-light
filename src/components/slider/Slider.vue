<template>
  <Flicking
    ref="target"
    :options="options"
    @ready="onReady"
  >
    <slot></slot>
  </Flicking>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue-demi'
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
  setup(_props, { emit }) {
    const target = ref<Flicking>()
    const options = reactive({
      align: 'prev',
      bound: true,
      horizontal: true,
      needPanelThreshold: 3,
      moveType: 'snap',
      renderOnlyVisible: true,
      autoResize: true,
      bounce: '20%',
      deceleration: 0.0075,
      duration: 100,
      inputType: ['pointer'],
    })
    const onReady: SliderReadyHandler = (slider, state, actions, e) => {
      emit('ready', slider, state, actions, e)
    }
    const slider = useSlider({ target, onReady })
    return {
      ...slider,
      options,
      target,
    }
  },
})
</script>

<style>
@import "@egjs/vue3-flicking/dist/flicking.css";
</style>
