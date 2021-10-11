
import { ref, Ref } from 'vue-demi'

import { logger } from './log'
const log = logger('slider')

type SliderStatus = {
  index?: number
  panels: Array<{
    index: number
    html?: string
  }>
}

export interface ArrayRange {
  from: number
  to: number
  length: number
  total: number
  right: number
}

export const ArrayRangeDefault = { from: 0, to: 0, length: 0, total: 0, right: 0 }

export type SliderActions = {
  prev: () => Promise<void>
  prevPage: () => Promise<void>
  next: () => Promise<void>
  nextPage: () => Promise<void>
  toPage: (index: number) => Promise<void>
}

export type ReadyHandler = (slider: HTMLElement, actions: SliderActions) => void
export type SliderClickHandler = (index: number) => void
export type RangeChangeHandler = (range: ArrayRange) => void

type Opts = {
  target?: Ref
  onReady?: ReadyHandler
  onClick?: SliderClickHandler
  onRangeChanged?: RangeChangeHandler
}

const DefOpts: Opts = {
  target: undefined,
}

export const useSlider = (opts: Opts = DefOpts) => {
  const target = opts.target || ref<HTMLElement>()

  const navigating = ref(false)
  const visible = ref<ArrayRange>(ArrayRangeDefault)
  const selectedIdx = ref<number>()

  const onRangeChanged = (e: any) => {
    const vps = e.visiblePanels.map((p: any) => ({
      index: p._index as number,
      loading: p._loading as boolean,
      toggled: p._toggled as boolean,
      removed: p._removed as boolean,
    }))
    if (vps.length) {
      const status: SliderStatus = target.value.getStatus()
      const total = status.panels.length
      const from = vps[0].index
      const to = vps[vps.length - 1].index
      const length = to - from
      const right = total - to
      visible.value = { from, to, length, total, right }
    }
    if (opts.onRangeChanged) opts.onRangeChanged(visible.value)
  }

  const onClick = (e: any) => {
    const index = e.index as number
    selectedIdx.value = index
    opts.onClick?.(index)
  }

  const execAsync = async (fn: () => Promise<any>) => {
    if (navigating.value) return Promise.resolve()
    navigating.value = true
    await fn().catch((e: any) => {
      log.error('execAsync', e)
    })
    navigating.value = false
  }

  const prev = () => execAsync(target.value.prev)
  const next = () => execAsync(target.value.next)
  const toPage = (index: number) => {
    const status: SliderStatus = target.value.getStatus()
    if (Number.isNaN(status.index) || !status.panels.length) return Promise.resolve()
    return execAsync(() => target.value.moveTo(index))
  }
  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(min, v), max)
  const dirPage = (dir: -1 | 1 = 1) => {
    const status: SliderStatus = target.value.getStatus()
    const visLength = visible.value.length
    const idx = status.index || 0
    const maxIdx = status.panels.length - 1
    const nextIdx = clamp(idx + dir * visLength, 0, maxIdx)
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

  const onReady = () => {
    const slider = target.value
    slider.on('visibleChange', onRangeChanged)
    slider.on('select', onClick)
    opts.onReady?.(target.value, actions)
  }

  return { target, onReady, visiblePanels: visible, selectedIdx, actions }
}
