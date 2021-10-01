<template>
  <div class="font-sans">
    <Slider class="w-full" :style="`height: ${height}px;`" @ready="onReady">
      <FixedRatio
        v-for="idx in list"
        :key="idx"
        :length="height"
        class="slider-panel"
      >
        {{ idx }}
      </FixedRatio>
    </Slider>
    <div class="btn-bar">
      <button class="btn-demo" @click="prev">
        prev
      </button>
      <button class="btn-demo" @click="next">
        next
      </button>
      <button class="btn-demo" @click="onPrepend">
        Prepend
      </button>
      <button class="btn-demo" @click="onAppend">
        Append
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  useList,
  SliderActions,
  SliderReadyHandler,
  UseSliderState,
} from '../../logic'

export default defineComponent({
  props: {
    height: {
      type: Number,
      default: 100,
    },
  },
  setup() {
    const { list, first, last, prepend, append } = useList([
      0, 1, 2, 3, 4, 5, 6, 7, 8,
    ])
    const onPrepend = () => {
      const fv = first.value
      list.value.splice(0, 0, ...[fv - 2, fv - 1])
    }
    const onAppend = () => {
      let nextNum = last.value + 1
      const newList = '.'
        .repeat(10)
        .split('.')
        .map(() => nextNum++)
      list.value.push(...newList)
    }

    const sliderElement = ref<any>()
    const sliderState = ref<UseSliderState>()
    const sliderActions = ref<SliderActions>()
    const onReady: SliderReadyHandler = (slider, state, actions) => {
      sliderElement.value = slider
      sliderState.value = state
      sliderActions.value = actions
    }
    const prev = () => sliderActions.value?.prev()
    const next = () => sliderActions.value?.next()

    return {
      list,
      prepend,
      append,
      onReady,
      prev,
      next,
      onPrepend,
      onAppend,
    }
  },
})
</script>

<style>
.btn-bar {
  @apply block is-flex is-justify-content-center
}

.btn-demo {
 @apply button mr-2 is-info is-outlined
}

.slider-panel {
  background-color: transparent;
  border-color: blue;
  border-style: inset;
  border-width: thin;
  border-style: solid;
}
</style>
