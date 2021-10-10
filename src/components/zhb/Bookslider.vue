<template>
  <div ref="target" class="bookslider">
    <!-- Header -->
    <SliderHeader
      :title="title"
      @previous="prevPage"
      @next="nextPage"
    >
      <SliderSelect
        :name="'filter'"
        placeholder="Alle Fachbereiche"
        :items="facets"
        @selection-changed="onFilter"
      ></SliderSelect>
    </SliderHeader>
    <!-- Slider -->
    <div :style="`height: ${height}px; `">
      <div v-if="error" class="slider-center">
        {{ error }}
      </div>
      <div v-else-if="list.length === 0" class="slider-center">
        <Loading></Loading>
      </div>
      <Slider
        :classes="`slider transition-opacity ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`"
        :style="`height: ${height}px;`"
        @ready="onSliderReady"
        @visible-changed="onRangeChanged"
      >
        <FixedRatio
          v-for="(item, index) in list"
          :key="`slider-panel-${index}`"
          v-slot="{ size }"
          :length="height - 12"
          :ratio="item.image.ratio"
          :classes="`slider-panel`"
        >
          <Image :image="item.image" :size="size"></Image>
        </FixedRatio>
      </Slider>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue-demi'
import { and, throttledWatch, debouncedWatch, useElementVisibility, useElementSize } from '@vueuse/core'

import {
  SliderActions,
  ReadyHandler,
  useFetchMore,
  RangeChangeHandler,
  ArrayRange,
} from '~/logic/index'
import { SelectItem, ShelfItem } from '~/types'
import { Facets } from '~/logic/mock'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: false,
    },
    height: {
      type: Number,
      default: 300,
    },
    viewIds: {
      type: String,
      required: false,
    },
    apiUrl: {
      type: String,
      default: 'http://localhost/api/views/pMwkLFaq/fetch',
    },
    apiToken: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const target = ref<HTMLElement>()
    const isVisible = useElementVisibility(target)
    const { width, height } = useElementSize(target)
    const pageSize = ref(0)
    debouncedWatch(width, () => {
      const w = Math.floor(width.value)
      const h = Math.floor(height.value)
      if (!w || !h) return
      pageSize.value = Math.max(1, Math.min(6, Math.ceil(w / h * 0.8))) * 5
    }, { debounce: 200 })
    // eslint-disable-next-line no-console
    watch(pageSize, () => console.info('size', { w: Math.floor(width.value), h: Math.floor(height.value), pageSize: pageSize.value }))
    // state
    const isSliderReady = ref(false)
    // filter
    const filterSelect = ref<SelectItem | null>(null)
    const filter = computed(() => filterSelect.value?.value)
    const onFilter = (selection: any) => filterSelect.value = selection
    // url query
    const queryFilter = computed(() => filter.value ? `filter=department:${filter.value}` : '')
    const queryToken = computed(() => props.apiToken ? `token=${props.apiToken}` : '')
    const query = computed(() => [queryFilter.value, queryToken.value].filter(v => v).join('&'))
    const url = computed(() => [props.apiUrl, query.value].filter(v => v).join('?'))
    // fetch more list
    const { list, fetch, fetchMore, error } = useFetchMore<ShelfItem>(url, { pageSize })
    watchOnce(and(isVisible, pageSize), () => fetch())

    // slider
    const isReady = computed(() => isSliderReady.value && list.value.length > 0)
    const actions = ref<SliderActions>()
    const onSliderReady: ReadyHandler = (_slider, a) => {
      isSliderReady.value = true
      actions.value = a
    }
    const prevPage = () => actions.value?.prevPage()
    const nextPage = () => actions.value?.nextPage()
    // visible range
    const vRange = ref<ArrayRange>({ from: 0, to: 0, length: 0, total: 0, right: 0 })
    const onRangeChanged: RangeChangeHandler = range => vRange.value = range

    // countdown trigger
    const countdown = ref(Number.MAX_VALUE)
    const trigger = ref(false)
    throttledWatch(vRange, (vr: ArrayRange) => {
      countdown.value = vr.right - vr.length * 1.5
    }, { throttle: 200, immediate: false })
    watch(countdown, (v) => {
      if (v <= 0 && list.value.length > 0)
        trigger.value = true
    })
    debouncedWatch(trigger, (v) => {
      if (v) {
        trigger.value = false
        fetchMore()
      }
    }, { debounce: 500, immediate: false })

    return {
      target,
      facets: Facets.toSelectItem(),
      isReady,
      list,
      onSliderReady,
      onRangeChanged,
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
