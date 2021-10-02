<template>
  <div>
    <div :style="`height: ${height}px;`">
      <Slider
        v-if="list.length"
        classes="flicking w-full"
        :style="`height: ${height}px;`"
        @ready="onReady"
      >
        <FixedRatio
          v-for="(item, index) in list"
          :key="`slider-panel-${index}`"
          v-slot="{ size }"
          :length="height - 12"
          :ratio="item.image.ratio"
          :classes="`slider-panel panel${index}`"
        >
          <ImgImg :image="item.image" :size="size"></ImgImg>
        </FixedRatio>
      </Slider>
      <div v-if="error">
        {{ error }}
      </div>
    </div>
    <div class="block space-x-3 mt-4">
      <button @click="prevPage">
        ppp
      </button>
      <button @click="prev">
        p
      </button>
      <button @click="next">
        n
      </button>
      <button @click="nextPage">
        nnn
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  SliderActions,
  SliderReadyHandler,
  UseSliderState,
  useFetchMore,
} from '../../logic'
import { ShelfItem } from '~/types/shelf'

export default defineComponent({
  props: {
    height: {
      type: Number,
      default: 300,
    },
  },
  emits: ['loadmore'],
  setup(_props, { emit }) {
    const { list, canFetchMore, fetchMore, error } = useFetchMore<ShelfItem>(
      'http://localhost/api/views/pMwkLFaq/fetch',
    )

    const onLoadMore = async () => {
      if (canFetchMore.value) await fetchMore()
      emit('loadmore')
    }

    const sliderElement = ref<any>()
    const sliderState = ref<UseSliderState>()
    const sliderActions = ref<SliderActions>()
    const onReady: SliderReadyHandler = (slider, state, actions) => {
      sliderElement.value = slider
      sliderState.value = state
      sliderActions.value = actions
      sliderElement.value.on('needPanel', onLoadMore)
    }
    const prev = () => sliderActions.value?.prev()
    const next = () => sliderActions.value?.next()
    const prevPage = () => sliderActions.value?.prevPage()

    const nextPage = () => sliderActions.value?.nextPage()

    return {
      list,
      fetchMore,
      canFetchMore,
      onReady,
      prev,
      next,
      prevPage,
      nextPage,
      error,
    }
  },
})
</script>

<style>
.slider-panel {
  @apply inline-block mb-3 mr-4 shadow-md shadow-dark-900 rounded-lg bg-transparent;
}
</style>
