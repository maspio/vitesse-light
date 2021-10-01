/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
// eslint-disable-next-line import/named
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
  next: () => Promise<void>
  prev: () => Promise<void>
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
  const status = ref<Status>({
    panels: [],
  })
  const plugins: Array<any> = []

  const isMoving = ref(false)
  const isNavigating = ref(false)
  const isBusy = computed(() => [isMoving.value, isNavigating.value].some(f => !!f))

  // const currentPanel = computed(() => target.value?.currentPanel);
  const onMoveStart = (_e: any) => {
    isMoving.value = true
  }
  const onMoveEnd = (e: any) => {
    isMoving.value = false
  }
  const onNeedPanel = (e: any) => {
    const direction: 'PREV' | 'NEXT' = e.direction
    // console.log('onNeedPanel', { direction })
  }
  const onReachEdge = (e: any) => {
    const direction: 'PREV' | 'NEXT' = e.direction
    // console.log('onReachEdge', { direction })
  }
  const onVisibleChange = (e: any) => {
    const visiblePanelsRaw: Array<any> = e.visiblePanels
    const visiblePanels = visiblePanelsRaw.map(p => ({
      index: p._index as number,
      loading: p._loading as boolean,
      toggled: p._toggled as boolean,
      removed: p._removed as boolean,
    }))
    // console.log('onVisibleChange', { visiblePanels })
  }
  const onSelect = (e: any) => {
    const direction: 'PREV' | 'NEXT' = e.direction
    const index = e.index as number
    const panel: any = e.panel
    // console.log('onSelect', { direction, index, panel })
  }

  const execAsync = async (fn: () => Promise<any>) => {
    if (isBusy.value) return Promise.resolve()
    isNavigating.value = true
    await fn().catch((e: any) => {
      console.error('execAsync', e)
    })
    isNavigating.value = false
  }
  const prev = () => {
    return execAsync(target!.value!.prev)
  }
  const next = () => {
    const f = target!.value!
    return execAsync(f.next)
    // execAsync(() => f.moveTo(f.index + 1));
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
    const actions: SliderActions = {
      prev,
      next,
    }
    slider.on('moveStart', onMoveStart)
    slider.on('moveStart', onMoveEnd)
    slider.on('needPanel', onNeedPanel)
    slider.on('reachEdge', onReachEdge)
    slider.on('visibleChange', onVisibleChange)
    slider.on('select', onSelect)
    opts.onReady?.(slider, state, actions, e)
  }

  return { target, panels, status, plugins, onReady, isBusy, isMoving, prev, next }
}

// type UseSlider = ReturnType<typeof useSlider>
// type UseSliderRef = Ref<UseSlider>
// type UseSliderInjectionKey = InjectionKey<UseSliderRef>

// const UseSliderKey: UseSliderInjectionKey = Symbol('use-slider')

// export const useSliderProvider = (
// ) => {
//   const target = ref<Flicking>()
//   const slider: UseSlider = useSlider({ target })
//   const useSliderRef = ref(slider)
//   provide(UseSliderKey, useSliderRef)
//   return slider
// }

// export const useSliderInjected = () => inject(UseSliderKey)
