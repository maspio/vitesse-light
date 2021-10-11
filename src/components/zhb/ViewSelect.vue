<template>
  <div>
    <SingleSelect
      v-if="items && items.length"
      :name="'views'"
      :items="items"
      :selected="selected"
      @selected="onSelection"
    ></SingleSelect>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-console */
import { defineComponent } from 'vue-demi'
import { SelectItem } from '~/types'
import { viewToSelectItem } from '~/utils'
import { useFetchViews } from '~/logic'
import { toJsonObect } from '~/logic/utils/obj'

export default defineComponent({
  props: {
    viewTypes: {
      type: String,
      required: false,
    },
    viewIds: {
      type: String,
      required: false,
    },
    apiUrl: {
      type: String,
      default: 'http://localhost/api/views',
    },
  },
  emits: ['selected'],
  setup(props, { emit }) {
    // views
    const { views } = useFetchViews(props)
    // select
    const items = computed<SelectItem[]>(() => views.value.map(viewToSelectItem))
    const selected = ref<SelectItem>()
    watch(views, (v) => { if (v && v.length) selected.value = viewToSelectItem(v[0]) })
    // event
    const onSelection = (item: SelectItem) => {
      const v = toJsonObect(views.value.find(v => v.id === item.value))
      emit('selected', v)
    }
    return { items, selected, onSelection }
  },
})
</script>
