<template>
  <SingleSelect
    :name="'filter'"
    placeholder="Alle Fachbereiche"
    :items="items"
    @selected="onSelected"
  ></SingleSelect>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { Facets } from '~/logic/mock'
import { SelectItem } from '~/types'
import { facetToSelectItems, selectItemToFacetEntry, facetEntryToFitler } from '~/utils'

export default defineComponent({
  emits: ['selected'],
  setup(_props, { emit }) {
    const facet = Facets.zhbFacets.facets[0]
    const items = facetToSelectItems(facet)
    const selected = ref<SelectItem>()
    const entry = computed(() => selected.value ? selectItemToFacetEntry(facet, selected.value) : undefined)
    const filter = computed(() => entry.value ? facetEntryToFitler(facet, entry.value) : undefined)
    const onSelected = (v: SelectItem) => selected.value = v
    watch(filter, f => emit('selected', f))
    return { items, onSelected }
  },
})
</script>
