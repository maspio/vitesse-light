<template>
  <SliderSelect
    name="Department"
    :items="departmentFilters"
    @selection-changed="onFilterChanged"
  ></SliderSelect>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { departmentFilters } from '~/logic/mock/departments'

export default defineComponent({
  emits: ['selection-changed'],
  setup(_props, { emit }) {
    const onFilterChanged = (selection: any) => {
      emit('selection-changed', selection)
    }
    return {
      departmentFilters,
      onFilterChanged,
    }
  },
})
</script>
