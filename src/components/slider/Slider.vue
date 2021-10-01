<template>
  <Flicking
    ref="target"
    :options="options"
    :class="classes"
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
  props: {
    classes: {
      type: String,
      default: 'flicking w-full',
    },
  },
  emits: ['ready'],
  setup(_props, { emit }) {
    const target = ref<Flicking>()
    const options = reactive({
      align: 'prev',
      gap: 10,
      bound: true,
      lastIndex: 80,
      infinite: true,
      horizontal: true,
      needPanelThreshold: 4,
      moveType: 'snap',
      renderOnlyVisible: true,
      inputType: ['touch', 'mouse'],
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
