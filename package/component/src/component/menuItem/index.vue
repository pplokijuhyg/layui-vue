<script lang="ts">
export default {
  name: "LayMenuItem",
};
</script>

<script setup lang="ts">
import { computed, ComputedRef, inject, ref, Ref, useSlots } from "vue";
import { DropdownContext, dropdownInjectionKey } from "../dropdown/interface";
import useLevel from "../menu/useLevel";
import LayTooltip from "../tooltip/index.vue";

export interface LayMenuItemProps {
  id: string;
  title?: string;
}

const slots = useSlots();
const props = defineProps<LayMenuItemProps>();
const { level } = useLevel();
const selectedKey: Ref<string> = inject("selectedKey") as Ref<string>;
const isTree = inject("isTree") as ComputedRef<boolean>;
const isCollapse = inject("isCollapse") as ComputedRef<boolean | string>;
const theme = inject("menuTheme") as Ref<string>;
const dropdownCtx = inject<DropdownContext | undefined>(
  dropdownInjectionKey,
  undefined
);

const selectHandle = function () {
  selectedKey.value = props.id;
  dropdownCtx?.hide();
};

const needTooltip = computed(
  () =>
    isTree.value &&
    (isCollapse.value === true || isCollapse.value === "true") &&
    level.value === 1
);
</script>

<template>
  <li
    class="layui-nav-item"
    :class="[selectedKey === id ? 'layui-this' : '']"
    @click="selectHandle()"
  >
    <template v-if="needTooltip">
      <lay-tooltip position="right" :isDark="theme !== 'light'">
        <a href="javascript:void(0)">
          <i v-if="slots.icon">
            <slot name="icon"></slot>
          </i>
        </a>
        <template #content>
          <span v-if="slots.title">
            <slot name="title"></slot>
          </span>
        </template>
      </lay-tooltip>
    </template>

    <template v-else>
      <a href="javascript:void(0)">
        <i v-if="slots.icon" class="layui-sub-menu-icon">
          <slot name="icon"></slot>
        </i>
        <span v-if="slots.title">
          <slot name="title"></slot>
        </span>
        <span v-else>
          <slot></slot>
        </span>
      </a>
    </template>
  </li>
</template>
