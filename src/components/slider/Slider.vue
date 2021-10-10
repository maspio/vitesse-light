<template>
  <Flicking
    ref="target"
    :options="options"
    :class="`flicking ${classes}`"
    @ready="onReady"
  >
    <slot></slot>
  </Flicking>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue-demi'
import Flicking from '@egjs/vue3-flicking'
import { useSlider } from '~/logic/slider'

/**
 * https://naver.github.io/egjs-flicking/docs/api/Flicking
 */
export default defineComponent({
  components: {
    Flicking,
  },
  props: {
    classes: {
      type: String,
      required: false,
    },
  },
  emits: ['ready', 'selected', 'visible-changed'],
  setup(_props, { emit }) {
    const target = ref<HTMLElement>()
    const options = reactive({
      align: 'prev',
      bound: true,
      // lastIndex: 80,
      autoResize: true,
      moveType: 'snap',
      renderOnlyVisible: true,
      inputType: ['pointer'],
      collectStatistics: false,
    })

    const slider = useSlider({
      target,
      onReady: (slider, actions) => emit('ready', slider, actions),
      onRangeChanged: range => emit('visible-changed', range),
    })
    return {
      ...slider,
      options,
      target,
    }
  },
})
</script>
