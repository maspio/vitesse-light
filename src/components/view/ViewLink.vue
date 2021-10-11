<template>
  <div class="absolute-bottom-right">
    <a :href="item.link" target="_blank" class="rel">
      <ViewLinkIcon></ViewLinkIcon>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi'
import { ShelfItem } from '../../types'

export default defineComponent({
  props: {
    item: { type: Object as PropType<ShelfItem>, required: true },
  },
})
</script>
