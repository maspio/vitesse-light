import { SizeWH } from './size'

type RatioStringLeft = `1x${string}`
type RatioStringRight = `${string}x1`

export type RatioString = RatioStringLeft | RatioStringRight

export type RatioXY = {
  rx: number
  ry: number
}

const parse = (ratio: RatioString): RatioXY => {
  const [x, y] = ratio.split('x')
  return {
    rx: Number.parseFloat(x),
    ry: Number.parseFloat(y),
  }
}

const stringify = (x: number, y: number): RatioString => {
  if (x > y) return `${x / y}x1`
  return `1x${y / x}`
}

const toSizeFromHeight = (ratio: RatioXY, height: number): SizeWH => {
  const scale = ratio.rx > 1 ? ratio.rx : 1 / ratio.ry
  return { height, width: height * scale }
}

const toSizeFromWidth = (ratio: RatioXY, width: number): SizeWH => {
  const scale = ratio.ry > 1 ? ratio.ry : 1 / ratio.rx
  return { height: width * scale, width }
}

// const toSize = (ratio: RatioXY, length: number): SizeWH => {
//   if (ratio.rx > 1 && ratio.ry === 1) return toSizeFromHeight(ratio, length)
//   if (ratio.ry > 1 && ratio.rx === 1) return toSizeFromWidth(ratio, length)
//   if (ratio.rx === 1 && ratio.ry === 1) return { width: length, height: length }
//   throw new Error(`invalid ratio values x=${ratio.rx} and y=${ratio.ry}`)
// }

export const Ratio = {
  parse,
  stringify,
  toSizeFromHeight,
  toSizeFromWidth,
}
