<template>
  <div class="slider-select">
    <label :for="id" class="sronly">{{ desc }}</label>
    <select :id="id" v-model="selectedItem" class="slider-select-select">
      <option
        v-for="item in selectItems"
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
import { defineComponent, ref, computed, watch, PropType } from 'vue-demi'
import { SelectItem } from '../../types'
import { toJsonObect } from '../../utils'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    items: {
      type: Array as PropType<SelectItem[]>,
      required: true,
    },
    selected: {
      type: Object as PropType<SelectItem>,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const id = computed(() => `select-${props.name.toLowerCase()}`)
    const desc = computed(() => `Select ${props.description || props.name}`)
    const placeholder = props.placeholder ? { text: props.placeholder, value: '' } : null

    const selectItems = computed(() => [placeholder, ...props.items].filter(i => i))
    const selectedItem = ref(props.selected || placeholder)

    const isSelected = (item: SelectItem) =>
      item.value === selectedItem.value?.value

    watch(selectedItem, (selection, _prev) => {
      emit('selected', toJsonObect(selection))
    })
    return { id, desc, selectItems, selectedItem, isSelected }
  },
})
</script>
