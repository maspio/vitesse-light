/* eslint-disable no-console */
// eslint-disable-next-line import/named
import { ref, computed, Ref } from 'vue'
// eslint-disable-next-line import/named
import Flicking, { Status, Panel } from '@egjs/vue3-flicking'

type Opts = {
  target?: Ref
}

const DefOpts: Opts = {
  target: undefined,
}

export const useSlider = (opts: Opts = DefOpts) => {
  const target = opts.target || ref<Flicking>()
  const panels = ref<Array<Panel>>([])
  const status = ref<Status>({
    panels: [],
  })
  const plugins: Array<any> = []

  const isMoving = ref(false)
  const isNavigating = ref(false)
  const isBusy = computed(() => [isMoving.value, isNavigating.value].some(f => !!f))

  // const currentPanel = computed(() => target.value?.currentPanel);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onMoveStart = (_e: any) => {
    isMoving.value = true
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onMoveEnd = (e: any) => {
    isMoving.value = false
  }
  const onNeedPanel = (e: any) => {
    const direction: 'PREV' | 'NEXT' = e.direction
    console.log('onNeedPanel', { direction })
  }
  const onReachEdge = (e: any) => {
    const direction: 'PREV' | 'NEXT' = e.direction
    console.log('onReachEdge', { direction })
  }
  const onVisibleChange = (e: any) => {
    const visiblePanelsRaw: Array<any> = e.visiblePanels
    const visiblePanels = visiblePanelsRaw.map(p => ({
      index: p._index as number,
      loading: p._loading as boolean,
      toggled: p._toggled as boolean,
      removed: p._removed as boolean,
    }))
    console.log('onVisibleChange', { visiblePanels })
  }
  const onSelect = (e: any) => {
    const direction: 'PREV' | 'NEXT' = e.direction
    const index = e.index as number
    const panel: any = e.panel
    console.log('onSelect', { direction, index, panel })
  }
  const onReady = (e: any) => {
    console.log('ready', e)
    const slider = target.value!
    slider.on('moveStart', onMoveStart)
    slider.on('moveStart', onMoveEnd)
    slider.on('needPanel', onNeedPanel)
    slider.on('reachEdge', onReachEdge)
    slider.on('visibleChange', onVisibleChange)
    slider.on('select', onSelect)
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
    execAsync(target!.value!.prev)
  }
  const next = () => {
    const f = target!.value!
    execAsync(f.next)
    // execAsync(() => f.moveTo(f.index + 1));
  }

  return { target, panels, status, plugins, onReady, isBusy, isMoving, prev, next }
}
