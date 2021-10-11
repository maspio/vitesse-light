import { View } from '~/types'

export const viewToSelectItem = (v: View) => ({ text: v.name, value: v.id })
