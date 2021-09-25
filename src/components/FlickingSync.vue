<template>
  <div class="wrapper">
    <flicking
      ref="flicking0"
      :options="{ bound: true, bounce: 30, align: 'prev' }"
      :plugins="plugins"
    >
      <span className="button mr-2 is-white">🍎 Apple</span>
      <span className="button mr-2 is-white">🍉 Watermelon</span>
      <span className="button mr-2 is-white">🥝 Kiwi</span>
      <span className="button mr-2 is-white">...</span>
    </flicking>
    <flicking
      ref="flicking1"
      :options="{ bound: true, bounce: 30, align: 'prev' }"
    >
      <span className="button mr-2 is-white">🍔 Hamburger</span>
      <span className="button mr-2 is-white">🍕 Pizza</span>
      <span className="button mr-2 is-white">🍞 Bread</span>
      <span className="button mr-2 is-white">...</span>
    </flicking>
    <flicking
      ref="flicking2"
      :options="{ bound: true, bounce: 30, align: 'prev' }"
    >
      <span className="button mr-2 is-white">🥛 Milk</span>
      <span className="button mr-2 is-white">☕ Coffee</span>
      <span className="button mr-2 is-white">🍵 Green tea</span>
      <span className="button mr-2 is-white">...</span>
    </flicking>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Flicking from "@egjs/vue3-flicking";
import { Sync } from "@egjs/flicking-plugins";

export default defineComponent({
  components: {
    Flicking,
  },
  setup() {
    let plugins: Array<any> = [];
    const flicking0 = ref(null);
    const flicking1 = ref(null);
    const flicking2 = ref(null);
    onMounted(() => {
      plugins = [
        new Sync({
          type: "camera",
          synchronizedFlickingOptions: [
            {
              flicking: flicking0.value!,
              isClickable: false,
            },
            {
              flicking: flicking1.value!,
              isClickable: false,
            },
            {
              flicking: flicking2.value!,
              isClickable: false,
            },
          ],
        }),
      ];
    });
    return { plugins, flicking0, flicking1, flicking2 };
  },
});
</script>
