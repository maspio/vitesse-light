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
import { SelectItem, View } from '~/types'
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
    const view = ref<View>()
    watch(views, (v) => {
      if (v && v.length) {
        view.value = v[0]
        selected.value = viewToSelectItem(v[0])
      }
    })
    watch(view, v => emit('selected', v))
    // event
    const onSelection = (item: SelectItem) => {
      view.value = toJsonObect(views.value.find(v => v.id === item.value))
    }
    return { items, selected, onSelection }
  },
})
</script>
