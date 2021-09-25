<template>
  <div ref="target">
    <h1>Hello world</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useElementVisibility } from "@vueuse/core";

export default defineComponent({
  setup() {
    const target = ref(null);
    const targetIsVisible = useElementVisibility(target);

    return {
      target,
      targetIsVisible,
    };
  },
});
</script>
