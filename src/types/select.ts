export type SelectItem = {
  text: string
  value: string
  selected?: boolean
}



export interface SelectionItem<T> {
  value: T
  display: string
  onClick?: () => void
}