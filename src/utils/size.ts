export type SizeWH = {
  width: number
  height: number
}

export type SizeCss = {
  width: string
  height: string
}

const toCss = (size: SizeWH): SizeCss => {
  return {
    width: `${size.width}px`,
    height: `${size.height}px`,
  }
}

export const Size = {
  toCss,
}
