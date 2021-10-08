
import { ref, computed, Ref, toRefs, ToRefs } from 'vue-demi'
// eslint-disable-next-line import/named
import Flicking, { Status, Panel } from '@egjs/vue3-flicking'

import { logger } from './log'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = logger('slider')

export type SliderState = {
  panels: Array<any>
  status: Status
  isMoving: boolean
  isNavigating: boolean
  direction: 'PREV' | 'NEXT'
}

export type SliderPanel = {
  index: number
  loading: boolean
  toggled: boolean
  removed: boolean
}

export interface ArrayRange {
  from: number
  to: number
  length: number
  total: number
  right: number
}

export const SliderStateDefault: SliderState = {
  panels: [],
  status: { panels: [] },
  isMoving: false,
  isNavigating: false,
  direction: 'PREV',
}

export type SliderActions = {
  prev: () => Promise<void>
  prevPage: () => Promise<void>
  next: () => Promise<void>
  nextPage: () => Promise<void>
  toPage: (index: number) => Promise<void>
}

export type SliderReadyHandler = (slider: Flicking, state: ToRefs<SliderState>, actions: SliderActions, e: any) => void
export type SliderSelectedHandler = (slider: Flicking, index: number, panel: Panel, e: any) => void
export type SliderVisibleChangeHandler = (slides: SliderPanel[], range: ArrayRange) => void

type Opts = {
  target?: Ref
  onReady?: SliderReadyHandler
  onSelect?: SliderSelectedHandler
  onVisibleChanged?: SliderVisibleChangeHandler
}

const DefOpts: Opts = {
  target: undefined,
}

export const useSlider = (opts: Opts = DefOpts) => {
  const target = opts.target || ref<Flicking>()

  const state = reactive(SliderStateDefault)
  const isBusy = computed(() => [state.isMoving, state.isNavigating].some(f => !!f))

  const visiblePanels = ref<SliderPanel[]>([])

  const selectedIdx = ref<number>()
  const selectedPanel = ref<Panel>()

  const onMoveStart = (e: any) => {
    state.isMoving = true
    state.direction = e.direction
  }
  const onMoveEnd = () => {
    state.isMoving = false
  }

  const onVisibleChange = (e: any) => {
    const vps = e.visiblePanels.map((p: any) => ({
      index: p._index as number,
      loading: p._loading as boolean,
      toggled: p._toggled as boolean,
      removed: p._removed as boolean,
    }))
    visiblePanels.value = vps
    const status: Status = target.value.getStatus()
    if (!vps.length) return
    const total = status.panels.length
    const from = vps[0].index
    const to = vps[vps.length - 1].index
    const length = to - from
    const right = total - to
    if (opts.onVisibleChanged) opts.onVisibleChanged(visiblePanels.value, { from, to, length, total, right })
  }

  const onSelect = (e: any) => {
    const index = e.index as number
    const panel: any = e.panel
    selectedIdx.value = index
    selectedPanel.value = panel
    opts.onSelect?.(target.value, index, panel, e)
  }

  const execAsync = async (fn: () => Promise<any>) => {
    if (isBusy.value) return Promise.resolve()
    state.isNavigating = true
    await fn().catch((e: any) => {
      console.error('execAsync', e)
    })
    state.isNavigating = false
  }

  const prev = () => execAsync(target.value.prev)
  const next = () => execAsync(target.value.next)
  const toPage = (index: number) => {
    const status: Status = target.value.getStatus()
    if (Number.isNaN(status.index) || !status.panels.length) return Promise.resolve()
    return execAsync(() => target.value.moveTo(index))
  }
  const dirPage = (dir: -1 | 1 = 1) => {
    const status: Status = target.value.getStatus()
    const idx = status.index || 0
    const visLength = visiblePanels.value.length
    const idxDiff = Math.max(visLength - 1, 1)
    let nextIdx = idx + dir * idxDiff
    nextIdx = Math.min(Math.max(0, nextIdx), status.panels.length - 1)
    return toPage(nextIdx)
  }
  const prevPage = () => dirPage(-1)
  const nextPage = () => dirPage(1)

  const actions: SliderActions = {
    prev,
    prevPage,
    next,
    nextPage,
    toPage,
  }

  const onReady = (e: any) => {
    const slider = target.value! as Flicking
    slider.on('moveStart', onMoveStart)
    slider.on('moveStart', onMoveEnd)
    slider.on('visibleChange', onVisibleChange)
    slider.on('select', onSelect)
    opts.onReady?.(target.value, toRefs(state), actions, e)
  }

  return { target, ...toRefs(state), onReady, isBusy, visiblePanels, selectedIdx, selectedPanel, actions }
}
