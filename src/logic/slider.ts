
import { ref, computed, Ref } from 'vue-demi'
// eslint-disable-next-line import/named
import Flicking, { Status, Panel } from '@egjs/vue3-flicking'

export type UseSliderState = {
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
}

export type SliderReadyHandler = (slider: Flicking, state: UseSliderState, actions: SliderActions, e: any) => void

type Opts = {
  target?: Ref
  onReady?: SliderReadyHandler
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
  const dirPage = (dir: -1 | 1 = 1) => {
    const status: Status = target.value.getStatus()

    if (Number.isNaN(status.index) || !status.panels.length) return Promise.resolve()
    const idx = status.index || 0
    const visLength = visiblePanels.value.length
    const idxDiff = Math.max(visLength - 1, 1)
    let nextIdx = idx + dir * idxDiff
    nextIdx = Math.min(Math.max(0, nextIdx), status.panels.length - 1)
    // eslint-disable-next-line no-console
    // console.log('nextPage', { idx, nextIdx, visLength })
    return execAsync(() => target.value.moveTo(nextIdx))
  }
  const prevPage = () => dirPage(-1)
  const nextPage = () => dirPage(1)

  const actions: SliderActions = {
    prev,
    prevPage,
    next,
    nextPage,
  }

  const onReady = (e: any) => {
    const slider = target.value! as Flicking
    const state: UseSliderState = {
      panels,
      status,
      isMoving,
      isNavigating,
      isBusy,
    }

    slider.on('moveStart', onMoveStart)
    slider.on('moveStart', onMoveEnd)
    slider.on('visibleChange', onVisibleChange)
    slider.on('select', onSelect)
    opts.onReady?.(slider, state, actions, e)
  }

  return { target, panels, status, onReady, isBusy, isMoving, isNavigating, visiblePanels, selectedIdx, selectedPanel, actions }
}
