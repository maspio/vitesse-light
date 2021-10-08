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
        <SliderSelect
          :name="'filterSelect'"
          placeholder="Alle Fachbereiche"
          :items="facets"
          @selection-changed="onFilter"
        ></SliderSelect>
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
        {{ error }}
      </div>
      <div v-else-if="list.length === 0" class="slider-center">
        <Loading></Loading>
      </div>
      <Slider
        :classes="`flicking w-full transition-opacity ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`"
        :style="`height: ${height}px;`"
        @ready="onSliderReady"
        @visible-changed="onVisibleChanged"
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
import { defineComponent, ref } from 'vue-demi'
import { throttledWatch } from '@vueuse/core'

import {
  SliderActions,
  SliderReadyHandler,
  useFetchMore,
  SliderVisibleChangeHandler,
  ArrayRange,
} from '~/logic/index'
import { SelectItem, ShelfItem } from '~/types'
import { Facets } from '~/logic/mock'

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
      default: 'http://localhost:5001/api/views/pMwkLFaq/fetch',
    },
    apiToken: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    // state
    const isSliderReady = ref(false)
    // filter
    const filterSelect = ref<SelectItem | null>(null)
    const filter = computed(() => filterSelect.value?.value)
    const onFilter = (selection: any) => filterSelect.value = selection
    // url query
    const queryFilter = computed(() => filter.value ? `filter=department:${filter.value}` : '')
    const queryToken = computed(() => props.apiToken ? `token=${props.apiToken}` : '')
    const query = computed(() => {
      return [queryFilter.value, queryToken.value].filter(v => v).join('&')
    })
    const url = computed(() => [props.apiUrl, query.value].filter(v => v).join('?'))
    // fetch more list
    const pageSize = ref(10)
    const { list, canFetchMore, fetchMore, error, isFetching } = useFetchMore<ShelfItem>(url, { pageSize })
    const isListReady = computed(() => list.value.length > 0)
    // slider
    const isReady = computed(() => isSliderReady.value && isListReady.value)
    const actions = ref<SliderActions>()
    const onSliderReady: SliderReadyHandler = (slider, state, a) => {
      isSliderReady.value = true
      actions.value = a
    }
    // visible range
    const vRange = ref<ArrayRange>({ from: 0, to: 0, length: 0, total: 0, right: 0 })
    const onVisibleChanged: SliderVisibleChangeHandler = (panels, range) => {
      vRange.value = range
    }
    // countdown trigger
    const countdown = ref(Number.MAX_VALUE)
    const trigger = ref(false)
    throttledWatch(vRange, (range: ArrayRange) => {
      // log.info('v-range', range)
      countdown.value = vRange.value.right - vRange.value.length * 1.5
    }, { throttle: 200, immediate: false })
    watch(countdown, (v) => {
      if (countdown.value < 0 && canFetchMore.value) {
        // log.info('countdown', v)
        trigger.value = true
      }
    })
    watch(trigger, (v) => {
      if (v) {
        // log.info('trigger', v)
        trigger.value = false
        fetchMore()
      }
    })

    const prev = () => actions.value?.prev()
    const next = () => actions.value?.next()
    const prevPage = () => actions.value?.prevPage()
    const nextPage = () => actions.value?.nextPage()

    return {
      facets: Facets.toSelectItem(),
      filterSelect,
      isReady,
      list,
      isFetching,
      isSliderReady,
      onSliderReady,
      onVisibleChanged,
      prev,
      next,
      prevPage,
      nextPage,
      onFilter,
      error,
    }
  },
})
</script>

<style>
@import "../../styles/slider.css";
</style>
