import { FacetEntry, Facet } from '~/types'

export const facetEntryToSelectItem = (f: FacetEntry) => ({ text: f.label, value: f.id })

export const facetToSelectItems = (f: Facet) => f.entries.map(e => facetEntryToSelectItem(e))
