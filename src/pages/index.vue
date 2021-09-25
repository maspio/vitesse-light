<template>
  <div>
    Vitesse Light
    <dark-toggle />
    <div class="w-full"><Flicking></Flicking></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FlickingSync from "~/components/FlickingSync.vue";

export default defineComponent({
  components: { FlickingSync },
  setup() {
    return {};
  },
});
</script>


