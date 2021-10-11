<template>
  <div ref="target" class="bookslider">
    <!-- Header -->
    <SliderHeader
      :title="title"
      @previous="prevPage"
      @next="nextPage"
    >
      <template #left>
        <slot name="left"></slot>
      </template>
      <template #default>
        <slot>
        </slot>
      </template>
    </SliderHeader>
    <!-- Slider -->
    <div :style="`height: ${vHeight}px; `">
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
        :style="`height: ${vHeight}px;`"
        @ready="onSliderReady"
        @visible-changed="onRangeChanged"
      >
        <FixedRatio
          v-for="(item, index) in list"
          :key="`slider-panel-${index}`"
          v-slot="{ size }"
          :length="vHeight - 12"
          :ratio="item.image.ratio"
          :classes="`relative-full-size slider-panel`"
        >
          <Image :image="item.image" :size="size"></Image>
          <ViewLink :item="item"></ViewLink>
        </FixedRatio>
      </Slider>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue-demi'
import { and, throttledWatch, debouncedWatch, useElementVisibility, useElementSize } from '@vueuse/core'
import { logger } from '~/logic'
import {
  SliderActions,
  ReadyHandler,
  useFetchMore,
  RangeChangeHandler,
  ArrayRange,
} from '~/logic/index'
import { ShelfItem, View, Filter } from '~/types'
const log = logger('slider')

const toInt = (value: string | number | boolean | undefined, def: number): number => {
  if (typeof value === 'undefined') return def
  if (typeof value === 'string') return Number.parseInt(value)
  if (typeof value === 'boolean') return value ? 1 : 0
  return value
}

export default defineComponent({
  props: {
    title: {
      type: String,
      required: false,
    },
    height: {
      type: [Number, String],
      required: false,
    },
    view: {
      type: Object as PropType<View>,
      required: false,
    },
    filter: {
      type: Object as PropType<Filter>,
      required: false,
    },
    apiUrl: {
      type: String,
      required: true,
    },
    apiToken: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    // views
    const vHeight = computed(() => toInt(props.height, 300))
    const viewId = computed(() => props.view ? props.view.id : '')
    // state
    const target = ref<HTMLElement>()
    const isVisible = useElementVisibility(target)
    const { width, height } = useElementSize(target)
    const isSliderReady = ref(false)
    const pageSize = ref(0)
    debouncedWatch(width, () => {
      const w = Math.floor(width.value)
      const h = Math.floor(height.value)
      if (!w || !h) return
      pageSize.value = Math.max(1, Math.min(6, Math.ceil(w / h * 0.8))) * 5
    }, { debounce: 200 })
    watch(pageSize, () => log.info('size', { w: Math.floor(width.value), h: Math.floor(height.value), pageSize: pageSize.value }))

    // url query
    const queryFilter = computed(() => props.filter ? `filter=${props.filter.identifier}:${props.filter.value}` : '')
    const queryToken = computed(() => props.apiToken ? `token=${props.apiToken}` : '')
    const query = computed(() => [queryFilter.value, queryToken.value].filter(v => v).join('&'))
    const url = computed(() => [`${props.apiUrl}/views/${viewId.value}/fetch`, query.value].filter(v => v).join('?'))
    // fetch more list
    const { list, fetch, fetchMore, error } = useFetchMore<ShelfItem>(url, { pageSize })
    watchOnce(and(isVisible, pageSize, viewId), () => fetch())

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
      countdown.value = vr.right - Math.ceil(vr.length * 1.25)
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
      vHeight,
      target,
      isReady,
      list,
      onSliderReady,
      onRangeChanged,
      prevPage,
      nextPage,
      error,
    }
  },
})
</script>
