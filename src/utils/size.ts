export type SizeWH = {
  width: number
  height: number
}

export type SizeCss = {
  width: string
  height: string
  [key: string]: any;
}

const toCss = (size: SizeWH): SizeCss => {
  return {
    width: `${size.width}px`,
    height: `${size.height}px`,
    ['content-visibility']: `auto`,
    ['contain-intrinsic-size']: `${size.width}px ${size.height}px`
  }
}

const toCssString = (size: SizeWH): string => {
  const css = toCss(size)
  return `width: ${css.width}px; height: ${css.height}px; `
}

export const Size = {
  toCss,
  toCssString,
}
