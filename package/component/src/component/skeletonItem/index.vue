<script lang="ts">
export default {
  name: "LaySkeletonItem",
};
</script>

<script setup lang="ts">
import { withDefaults } from "vue";
import { LayIcon } from "@layui/icons-vue";

export interface LaySkeletonProps {
  type?: string;
}

const props = withDefaults(defineProps<LaySkeletonProps>(), {
  type: "p",
});
</script>

<template>
  <div
    :class="['lay-skeleton-item', `lay-skeleton-type--${type}`]"
    v-bind="$attrs"
  >
    <div v-if="type === 'image'">
      <lay-icon type="layui-icon-picture"></lay-icon>
    </div>
  </div>
</template>
