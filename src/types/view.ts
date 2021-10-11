type ViewType = 'search' | 'collection'

export type View = {
  name: string
  id: string
  type: ViewType
}

export type FacetEntry = {id: string; label: string}

export type Facet = {
  identifier: string
  label: string
  entries: Array<FacetEntry>
}

export type FacetsResponse = {
  facets: Facet[]
}
