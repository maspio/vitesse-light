<template>
  <div>
    <!-- :options="{ align: 'prev', circular: true }" -->
    <Flicking
      ref="target"
      @ready="onReady"
      :options="{
        align: 'prev',
        bound: true,
        horizontal: true,
        needPanelThreshold:3,
        moveType: 'snap',
      }"
      class="no-margin-padding"
    >
      <div
        v-for="idx in list"
        class="flicking-panel no-margin-padding"
        :key="idx"
      >
        {{ idx }}
      </div>
    </Flicking>
    <span
      ><button @click="prev">prev</button>
      <button @click="next">next</button></span
    >
    <div class="block is-flex is-justify-content-center">
      <span class="button mr-2 is-info is-outlined" @click="prepend"
        >Prepend</span
      >
      <span class="button mr-2 is-info is-outlined" @click="append"
        >Append</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Flicking from "@egjs/vue3-flicking";

export default defineComponent({
  components: {
    Flicking,
  },
  setup() {
    const list = ref([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const isBusy = ref(false);
    const isMoving = ref(false);
    const length = computed(() => list.value.length || 0);

    const target = ref<Flicking>();
    // const currentPanel = computed(() => target.value?.currentPanel);
    const onMoveStart = (e: any) => {
      isMoving.value = true;
    };
    const onMoveEnd = (e: any) => {
      isMoving.value = false;
    };
    const onNeedPanel = (e: any) => {
      const direction: "PREV" | "NEXT" = e.direction;
      console.log("onNeedPanel", { direction });
    };
    const onReachEdge = (e: any) => {
      const direction: "PREV" | "NEXT" = e.direction;
      console.log("onReachEdge", { direction });
    };
    const onVisibleChange = (e: any) => {
      const visiblePanelsRaw: Array<any> = e.visiblePanels;
      const visiblePanels = visiblePanelsRaw.map((p) => ({
        index: p._index as number,
        loading: p._loading as boolean,
        toggled: p._toggled as boolean,
        removed: p._removed as boolean,
      }));
      console.log("onVisibleChange", { visiblePanels });
    };
    const onSelect = (e: any) => {
      const direction: "PREV" | "NEXT" = e.direction;
      const index = e.index as number;
      const panel: any = e.panel;
      console.log("onSelect", { direction, index, panel });
    };
    const onReady = (e: any) => {
      console.log("ready", e);
      const slider = target.value!;
      slider.on("moveStart", onMoveStart);
      slider.on("moveStart", onMoveEnd);
      slider.on("needPanel", onNeedPanel);
      slider.on("reachEdge", onReachEdge);
      slider.on("visibleChange", onVisibleChange);
      slider.on("select", onSelect);
    };

    const execAsync = async (fn: () => Promise<any>) => {
      if (isBusy.value) return Promise.resolve();
      isBusy.value = true;
      await fn();
      isBusy.value = false;
    };
    const prev = () => {
      execAsync(target.value!.prev);
    };
    const next = () => {
      const f = target.value!;
      execAsync(f.next);
      // execAsync(() => f.moveTo(f.index + 1));
    };
    const maxIndex = () => list.value.length - 1;
    const getAt = (i: number) => list.value[i];
    const last = () => getAt(maxIndex());

    const prepend = () => {
      list.value.splice(0, 0, ...[getAt(0) - 2, getAt(0) - 1]);
    };
    const append = () => {
      let nextNum = last() + 1;
      const newList = "."
        .repeat(10)
        .split(".")
        .map(() => nextNum++);
      list.value.push(...newList);
    };
    return {
      target,
      list,
      prev,
      next,
      onReady,
      prepend,
      append,
      length,
    };
  },
});
</script>

<style>
@import "@egjs/vue3-flicking/dist/flicking.css";

.no-margin-padding {
  padding: 0px;
  margin: 0px;
}

.flicking-viewport {
  height: 240px;
  border-color: red;
  border-width: medium;
}
.flicking-panel {
  height: 240px;
  width: 180px;
  border-color: blue;
  border-width: medium;
  border-style: solid;
}
</style>
