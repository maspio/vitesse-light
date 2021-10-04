<template>
  <div class="space-y-4">
    <!-- Header -->
    <SliderRow grow="center">
      <template #left>
        <h2 class="slider-title">
          {{ title }}
        </h2>
      </template>
      <template #default>
        <SliderFilter @selection-changed="onFilterChanged"></SliderFilter>
      </template>
      <template #right>
        <SliderButton class="hidden md:block" @clickprevious="prevPage" @clicknext="nextPage"></SliderButton>
      </template>
    </SliderRow>
    <!-- Slider -->
    <div :style="`height: ${height}px; `">
      <div v-if="error" class="slider-center">
        >
        {{ error }}
      </div>
      <div v-else-if="list.length === 0" class="slider-center">
        loading
      </div>
      <Slider
        :classes="`flicking w-full transition-opacity ${isReady ? 'opacity-100' : 'opacity-0'}`"
        :style="`height: ${height}px;`"
        @ready="onSliderReady"
      >
        <FixedRatio
          v-for="(item, index) in list"
          :key="`slider-panel-${index}`"
          v-slot="{ size }"
          :length="height - 12"
          :ratio="item.image.ratio"
          :classes="`slider-panel panel${index}`"
        >
          <Image :image="item.image" :size="size"></Image>
        </FixedRatio>
      </Slider>
    </div>

    <!-- <div class="space-x-3 mt-4 block">
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
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  SliderActions,
  SliderReadyHandler,
  SliderState,
  useFetchMore,
} from '../../logic'
import { ShelfItem } from '~/types/shelf'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'TITLE',
    },
    height: {
      type: Number,
      default: 300,
    },
  },
  emits: ['loadmore'],
  setup(_props, { emit }) {
    const isSliderReady = ref(false)

    const { list, canFetchMore, fetchMore, error } = useFetchMore<ShelfItem>(
      'http://localhost/api/views/pMwkLFaq/fetch',
    )

    const isReady = computed(() => {
      return list.value.length > 0 && isSliderReady.value
    })

    const onLoadMore = async () => {
      if (isReady.value && canFetchMore.value) await fetchMore()
      emit('loadmore')
    }
    const sliderElement = ref<any>()
    const sliderState = ref<SliderState>()
    const sliderActions = ref<SliderActions>()
    const onSliderReady: SliderReadyHandler = (slider, state, actions) => {
      isSliderReady.value = true
      sliderElement.value = slider
      sliderState.value = state
      sliderActions.value = actions
      sliderElement.value.on('needPanel', onLoadMore)
    }

    const prev = () => sliderActions.value?.prev()
    const next = () => sliderActions.value?.next()
    const prevPage = () => sliderActions.value?.prevPage()
    const nextPage = () => sliderActions.value?.nextPage()

    const onFilterChanged = async (selection: any) => {
      // filterSelected.value = selection
      // updateUrl()
    }

    return {
      isReady,
      list,
      fetchMore,
      canFetchMore,
      isSliderReady,
      onSliderReady,
      prev,
      next,
      prevPage,
      nextPage,
      onFilterChanged,
      error,
    }
  },
})
</script>

<style>
.transition-opacity {
  @apply transition-opacity duration-400 ease-in;
}

.slider-panel {
  @apply bg-transparent rounded-lg shadow-md mr-4 mb-3 shadow-dark-900 inline-block;
}
.slider-center {
  @apply flex h-full w-full justify-center items-center;
}

.slider-title {
   @apply text-base tracking-wider font-medium truncate hyphens-none;
}

</style>
