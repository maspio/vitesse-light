import { SelectItem, View } from '../types'

export const viewToSelectItem = (v: View): SelectItem => ({ text: v.name, value: v.id })
