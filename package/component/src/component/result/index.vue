<script lang="ts">
export default {
  name: "LayResult",
};
</script>

<script setup lang="ts">
import "./index.less";
import { useSlots } from "vue";

export interface LayResultProps {
  title?: string;
  status?: "success" | "failure";
  describe?: string;
}

const slots = useSlots();

const props = withDefaults(defineProps<LayResultProps>(), {
  title: "提交信息",
  status: "success",
  describe: "请核对并修改以下信息后，再重新提交。",
});
</script>

<template>
  <div class="result">
    <div :class="[status]">
      <svg
        v-if="status === 'failure'"
        viewBox="64 64 896 896"
        data-icon="close-circle"
        width="80px"
        height="80px"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        class=""
      >
        <path
          d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
        ></path>
        <path
          d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
        ></path>
      </svg>

      <svg
        v-else
        viewBox="64 64 896 896"
        data-icon="check-circle"
        width="80px"
        height="80px"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        class=""
      >
        <path
          d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
        ></path>
        <path
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
        ></path>
      </svg>
    </div>
    <h2 class="title">{{ title }}</h2>
    <p class="desc">
      {{ describe }}
    </p>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
