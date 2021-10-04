
import { ref, computed, Ref } from 'vue-demi'
// eslint-disable-next-line import/named
import Flicking, { Status, Panel } from '@egjs/vue3-flicking'

export type SliderState = {
  panels: Ref<Panel[] |undefined>
  status: Ref<Status>
  isMoving: Ref<boolean>
  isNavigating: Ref<boolean>
  isBusy: Ref<boolean>
}

export type SliderActions = {
  prev: () => Promise<void>
  prevPage: () => Promise<void>
  next: () => Promise<void>
  nextPage: () => Promise<void>
  toPage: (index: number) => Promise<void>
}

export type SliderReadyHandler = (slider: Flicking, state: SliderState, actions: SliderActions, e: any) => void
export type SliderSelectedHandler = (slider: Flicking, index: number, panel: Panel, e: any) => void

type Opts = {
  target?: Ref
  onReady?: SliderReadyHandler
  onSelect?: SliderSelectedHandler
}

const DefOpts: Opts = {
  target: undefined,
}

export const useSlider = (opts: Opts = DefOpts) => {
  const target = opts.target || ref<Flicking>()
  const panels = ref<Panel[]>()
  const status = ref<Status>({ panels: [] })

  const isMoving = ref(false)
  const isNavigating = ref(false)
  const isBusy = computed(() => [isMoving.value, isNavigating.value].some(f => !!f))

  const state: SliderState = {
    panels,
    status,
    isMoving,
    isNavigating,
    isBusy,
  }

  const visiblePanels = ref([{
    index: -1,
    loading: false,
    toggled: false,
    removed: false,
  }])

  const selectedIdx = ref<number>()
  const selectedPanel = ref<Panel>()

  const onMoveStart = () => isMoving.value = true
  const onMoveEnd = () => isMoving.value = false

  const onVisibleChange = (e: any) =>
    visiblePanels.value = e.visiblePanels.map((p: any) => ({
      index: p._index as number,
      loading: p._loading as boolean,
      toggled: p._toggled as boolean,
      removed: p._removed as boolean,
    }))

  const onSelect = (e: any) => {
    const index = e.index as number
    const panel: any = e.panel
    selectedIdx.value = index
    selectedPanel.value = panel
    opts.onSelect?.(target.value, index, panel, e)
  }

  const execAsync = async (fn: () => Promise<any>) => {
    if (isBusy.value) return Promise.resolve()
    isNavigating.value = true
    await fn().catch((e: any) => {
      console.error('execAsync', e)
    })
    isNavigating.value = false
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
    opts.onReady?.(target.value, state, actions, e)
  }

  return { target, panels, status, onReady, isBusy, isMoving, isNavigating, visiblePanels, selectedIdx, selectedPanel, actions }
}
