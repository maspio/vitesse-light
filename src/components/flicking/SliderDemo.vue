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
    <div class="block is-flex is-justify-content-center">
      <button class="font-sans button mr-2 is-info is-outlined" @click="prev">
        prev
      </button>
      <button class="button mr-2 is-info is-outlined" @click="next">
        next
      </button>
    </div>
    <div class="block is-flex is-justify-content-center">
      <button class="button mr-2 is-info is-outlined" @click="onPrepend">
        Prepend
      </button>
      <button class="button mr-2 is-info is-outlined" @click="onAppend">
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
    const { list, prepend, append, getAt, last } = useList([
      0, 1, 2, 3, 4, 5, 6, 7, 8,
    ])
    const onPrepend = () => {
      list.value.splice(0, 0, ...[getAt(0) - 2, getAt(0) - 1])
    }
    const onAppend = () => {
      let nextNum = last() + 1
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

.slider-panel {
  background-color: transparent;
  border-color: blue;
  border-style: inset;
  border-width: thin;
  border-style: solid;
}
</style>
