<script lang="ts">
export default {
  name: "LayTag",
};
</script>
<script lang="ts" setup>
import "./index.less";
import { LayIcon } from "@layui/icons-vue";
import { computed, ref } from "vue";
import { TinyColor } from "@ctrl/tinycolor";
import { tagType } from "./interface";

export interface LayTagProps {
  type?: tagType;
  color?: string;
  closable?: boolean;
  size?: string;
  bordered?: boolean;
  disabled?: boolean;
  shape?: "square" | "round";
  maxWidth?: string;
  variant?: "dark" | "light" | "plain";
}

const props = withDefaults(defineProps<LayTagProps>(), {
  size: "md",
  shape: "square",
  variant: "dark",
  bordered: true,
});

const emit = defineEmits(["close", "check", "update:checked"]);

const visible = ref(true);

const handleClose = (e: MouseEvent) => {
  if (props.disabled) return;
  //visible.value = false;
  emit("close", e);
};

const classTag = computed(() => [
  "layui-tag",
  `layui-tag-size-${props.size}`,
  `layui-tag-shap-${props.shape}`,
  {
    [`layui-tag-variant-${props.variant}`]: props.variant,
    [`layui-tag-variant-${props.variant}-bordered`]: props.bordered,
    [`layui-tag-${props.type}-bordered`]: props.bordered,
    [`layui-tag-${props.type}`]: props.type,
    "layui-tag-bordered": props.bordered,
    "layui-tag-disabled": props.disabled,
    "layui-tag-ellipsis": props.maxWidth,
  },
]);

const styleTag = computed(() => [
  {
    "max-width": props.maxWidth ?? "unset",
    ...useTagCustomStyle(props).value,
  },
]);

function useTagCustomStyle(props: LayTagProps) {
  return computed(() => {
    let styles: Record<string, string> = {};

    const tagColor = props.color;

    if (tagColor) {
      const color = new TinyColor(tagColor);
      if (props.variant === "dark") {
        const isDark = color.getBrightness() < 190;
        const textColor = isDark ? "#FFF" : "#000000";
        styles = {
          "--layui-tag-bg-color": tagColor,
          "--layui-tag-border-color": props.bordered ? tagColor : "transparent",
          "--layui-tag-hover-color": tagColor,
          "--layui-tag-text-color": textColor,
        };
      } else if (props.variant === "light") {
        styles = {
          "--layui-tag-bg-color": color.tint(90).toString(),
          "--layui-tag-border-color": props.bordered
            ? color.tint(50).toString()
            : "transparent",
          "--layui-tag-hover-color": color.tint(90).toString(),
          "--layui-tag-text-color": tagColor,
        };
      } else if (props.variant === "plain") {
        styles = {
          "--layui-tag-bg-color": "transparent",
          "--layui-tag-border-color": props.bordered ? tagColor : "transparent",
          "--layui-tag-hover-color": "transparent",
          "--layui-tag-text-color": tagColor,
        };
      }
    }

    return styles;
  });
}
</script>
<template>
  <span v-if="visible" :class="classTag" :style="styleTag">
    <span v-if="$slots.icon" class="layui-tag-icon">
      <slot name="icon" />
    </span>
    <span v-if="maxWidth" :style="styleTag" class="layui-tag-text">
      <slot />
    </span>
    <slot v-else />
    <span
      v-if="closable"
      class="layui-tag-close-icon"
      @click.stop="handleClose"
    >
      <slot name="close-icon">
        <lay-icon type="layui-icon-close"></lay-icon>
      </slot>
    </span>
  </span>
</template>
