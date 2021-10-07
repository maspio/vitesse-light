<template>
  <div class="space-y-4">
    <!-- Header -->
    <Row grow="center">
      <template #left>
        <h2 class="slider-title">
          {{ title }}
        </h2>
      </template>
      <template #default>
        <SliderFilter @selection-changed="onFilterChanged"></SliderFilter>
      </template>
      <template #right>
        <SliderButton
          class="hidden sm:block"
          @clickprevious="prevPage"
          @clicknext="nextPage"
        ></SliderButton>
      </template>
    </Row>
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
        :classes="`flicking w-full transition-opacity ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  SliderActions,
  SliderReadyHandler,
  SliderState,
  useFetchMore,
} from '~/logic/index'
import { SelectItem, ShelfItem } from '~/types'

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
    apiUrl: {
      type: String,
      default: 'http://localhost/api/views/pMwkLFaq/fetch',
    },
    apiQuery: {
      type: String,
      default: '',
    },
  },
  emits: ['loadmore'],
  setup(props, { emit }) {
    // 'http://localhost/api/views/pMwkLFaq/fetch'
    // 'local_field_990,exact,"nl202109"OR"nl202108"'

    const filterSelected = ref<SelectItem | null>(null)
    const hasFilterSelected = computed(() => {
      return filterSelected.value
        && filterSelected.value.value
        && filterSelected.value.value.length
    })

    const isReady = ref(false)
    const isSliderReady = ref(false)

    const query = computed(() => {
      if (!hasFilterSelected.value) return props.apiQuery
      // eslint-disable-next-line no-console
      console.log('filter selected', filterSelected.value)
      const fq = `,AND;lds26,exact,${filterSelected.value!.value
        .map(v => `"${v}"`)
        .join('OR')}`
      return props.apiQuery + fq
    })

    const url = computed(() => {
      return `${props.apiUrl}?${query.value}`
    })

    const { list, canFetchMore, fetchMore, error } = useFetchMore<ShelfItem>(
      url,
      { pageSize: 10 },
    )
    const isListReady = computed(() => list.value.length > 0)

    watchEffect(() => {
      if (isSliderReady.value && isListReady) {
        setTimeout(() => {
          isReady.value = true
        }, 2000)
      }
    })

    const onLoadMore = async () => {
      if (!isReady.value || !canFetchMore.value) return Promise.resolve()
      await fetchMore()
      // eslint-disable-next-line no-console
      // console.log('load more')
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

    const onFilterChanged = (selection: any) => {
      filterSelected.value = selection
    }

    return {
      filterSelected,
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
@import "../../styles/slider.css";
</style>
