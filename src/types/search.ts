
export type FacetEntry = {id: string; label: string}

export type Facet = {
  identifier: string
  label: string
  entries: Array<FacetEntry>
}

export type FacetsResponse = {
  facets: Facet[]
}

export type Filter = {
  identifier: string
  value: string
}
