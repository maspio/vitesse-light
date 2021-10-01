<template>
  <div class="font-sans">
    <FixedHeight :height="height">
      <Slider v-if="list.length" class="w-full" :style="`height: ${height}px;`" @ready="onReady">
        <FixedRatio
          v-for="item in list"
          :key="item.title"
          v-slot="{classes, styles}"
          :length="height"
          :ratio="item.image.ratio"
          class="slider-panel mr-2"
        >
          <ImgPic :img-src="item.image" :classes="classes" :styles="styles"></ImgPic>
        </FixedRatio>
      </Slider>
    </FixedHeight>
    <div class="btn-bar mt-3">
      <button class="btn-demo" @click="prev">
        prev
      </button>
      <button class="btn-demo" @click="next">
        next
      </button>
      <button class="btn-demo" @click="fetchMore">
        more
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
import { ShelfItemMockResponse } from '../../mock'
import { ShelfItem } from '~/types/shelf'

export default defineComponent({
  props: {
    height: {
      type: Number,
      default: 300,
    },
  },
  setup() {
    const { list, prepend, append } = useList<ShelfItem>()

    const fetchMore = () => {
      append(...ShelfItemMockResponse.hits)
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

    fetchMore()
    return {
      list,
      prepend,
      append,
      onReady,
      prev,
      next,
      fetchMore,
    }
  },
})
</script>

<style>
.btn-bar {
  @apply block is-flex is-justify-content-center
}

.btn-demo {
  @apply mr-2 is-info is-outlined
}

.slider-panel {
  background-color: transparent;
  border-color: red;
  border-style: inset;
  border-width: thin;
  border-style: solid;
}

</style>
