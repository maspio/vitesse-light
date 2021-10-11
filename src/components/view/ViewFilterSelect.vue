<template>
  <SingleSelect
    :name="'filter'"
    :placeholder="placeholder"
    :items="items"
    @selected="onSelected"
  ></SingleSelect>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue-demi'
import { useFetchViewFacets } from '~/logic'
import { SelectItem } from '~/types'
import { facetToSelectItems, selectItemToFacetEntry, facetEntryToFitler } from '~/utils'

export default defineComponent({
  props: {
    viewId: {
      type: String,
      required: true,
    },
    apiUrl: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const { facets } = useFetchViewFacets(props)
    const facet = computed(() => facets.value?.at(0))
    const items = computed(() => facet.value ? facetToSelectItems(facet.value) : [])
    const selected = ref<SelectItem>()
    const entry = computed(() => selected.value && facet.value ? selectItemToFacetEntry(facet.value, selected.value) : undefined)
    const filter = computed(() => entry.value && facet.value ? facetEntryToFitler(facet.value, entry.value) : undefined)
    const onSelected = (v: SelectItem) => selected.value = v
    watch(filter, f => emit('selected', f))
    return { items, onSelected }
  },
})
</script>
