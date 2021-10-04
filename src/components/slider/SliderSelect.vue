<template>
  <div class="slider-select">
    <label :for="id" class="sronly">{{ description }}</label>
    <select :id="id" v-model="selected" class="slider-select-select">
      <option
        v-for="item in items"
        :key="item.text"
        :value="item"
        :selected="isSelected(item)"
      >
        {{ item.text }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue-demi'
import { SelectItem } from '../../types'
import { toJsonObect } from '../../logic/utils/obj'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Array as PropType<SelectItem[]>,
      required: true,
    },
  },
  emits: ['selection-changed'],
  setup(props, { emit }) {
    const id = ref(`select-${props.name.toLowerCase()}`)
    const description = ref(`Select ${props.name}`)

    const selected = ref(props.items[0])

    const isSelected = (item: SelectItem) =>
      item.value === selected.value.value

    watch(selected, (selection, _prev) => {
      emit('selection-changed', toJsonObect(selection))
    })
    return { id, description, selected, isSelected }
  },
})
</script>
