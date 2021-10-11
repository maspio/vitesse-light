<template>
  <div class="select-list">
    <div class="title">
      {{ title }}
    </div>
    <div class="items">
      <div
        v-for="item of items"
        :key="item.value"
        class="item"
        :class="{ active: value === item.value }"
        @click="
          () => {
            value = item.value;
            item.onClick?.();
          }
        "
      >
        <carbon:checkmark
          class="text-green-500"
          :class="{ 'opacity-0': value !== item.value }"
        />
        {{ item.display || item.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useVModel } from "@vueuse/core";
import type { SelectionItem } from '../../types';

export default defineComponent({
  props: {
    modelValue: {
      type: [Object, String, Number] as PropType<any>,
    },
    title: {
      type: String,
    },
    items: {
      type: Array as PropType<SelectionItem<any>[]>,
    },
  },
  setup(props, { emit }) {
    const value = useVModel(props, "modelValue", emit, { passive: true });

    return { value };
  },
});
</script>

<style lang="postcss" scoped>
.select-list {
  @apply py-2;
}
.item {
  @apply flex rounded whitespace-nowrap py-1 px-4 cursor-default hover:(bg-gray-400 bg-opacity-10);
  svg {
    @apply mr-1 -ml-2 my-auto;
  }
}
.title {
  @apply text-xs uppercase opacity-50 tracking-widest px-7 py-1;
}
</style>