<template>
  <button class="icon-btn mx-2 !outline-none" @click="toggleDark">
    <carbon-moon v-if="isDark" />
    <carbon-sun v-else />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { isDark, toggleDark } from "~/logic";

export default defineComponent({
  setup() {
    return { isDark, toggleDark };
  },
});
</script>

