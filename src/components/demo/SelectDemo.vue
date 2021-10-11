

<template>
  <div class="text-sm">
    <SelectList v-model="slideScale" title="Scale" :items="items" />
  </div>
</template>
<script lang="ts">
import { defineComponent, watchEffect } from "vue";
import type { SelectionItem } from "~/types";

import { useStorage } from "@vueuse/core";

export default defineComponent({
  setup() {
    const slideScale = useStorage<number>("slidev-scale", 0);
    const items: SelectionItem<number>[] = [
      {
        display: "Fit",
        value: 0,
      },
      {
        display: "1:1",
        value: 1,
      },
    ];
    watchEffect(() => console.log('slideScale', slideScale.value))
    return { slideScale, items };
  },
});
</script>
