import { FacetEntry, Facet, Filter, SelectItem } from '~/types'

export const facetEntryToSelectItem = (f: FacetEntry) => ({ text: f.label, value: f.id })

export const facetEntryToFitler = (f: Facet, e: FacetEntry): Filter => ({ identifier: f.identifier, value: e.id })

export const facetToSelectItems = (f: Facet) => f.entries.map(e => facetEntryToSelectItem(e))

export const selectItemToFacetEntry = (f: Facet, i: SelectItem) => f.entries.find(e => e.id === i.value)
