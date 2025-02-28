<script lang="ts">
export default {
  name: "LayTransfer",
};
</script>

<script setup lang="ts">
import "./index.less";
import LayInput from "../input/index.vue";
import LayScroll from "../scroll/index.vue";
import LayButton from "../button/index.vue";
import LayCheckbox from "../checkbox/index.vue";
import { computed, Ref, ref, useSlots, watch } from "vue";
import { BooleanOrString, Recordable } from "../../types";

export interface LayTransferProps {
  id?: string;
  title?: string[];
  width?: string;
  height?: string;
  showSearch?: BooleanOrString;
  dataSource: Recordable[];
  modelValue?: Recordable[];
}

const slots = useSlots();

const props = withDefaults(defineProps<LayTransferProps>(), {
  id: "id",
  title: () => ["主列表", "副列表"],
  dataSource: () => [],
  showSearch: false,
  modelValue: () => [],
  width: "200px",
  height: "360px",
});

const emits = defineEmits(["update:modelValue", "change"]);

const leftDataSource: Ref<any[]> = ref([...props.dataSource]);
const rightDataSource: Ref<any[]> = ref([]);
const _leftDataSource: Ref<any[]> = ref([...props.dataSource]);
const _rightDataSource: Ref<any[]> = ref([]);
const leftSelectedKeys: Ref<string[]> = ref([]);
const rightSelectedKeys: Ref<string[]> = ref([]);
const allLeftChecked = ref(false);
const allRightChecked = ref(false);
const hasLeftChecked = ref(false);
const hasRightChecked = ref(false);

const allLeftChange = (isChecked: boolean) => {
  if (isChecked) {
    const datasources = leftDataSource.value.filter((item: any) => {
      return !item.disabled;
    });
    const ids = datasources.map((item) => {
      return item[props.id];
    });
    leftSelectedKeys.value = [...ids];
  } else {
    leftSelectedKeys.value = [];
  }
};

watch(
  () => props.modelValue,
  () => {
    let targetDataSource: any[] = [];

    props.dataSource.forEach((ds) => {
      if (props.modelValue.includes(ds[props.id])) {
        targetDataSource.push(ds);
      }
    });

    leftDataSource.value = props.dataSource.filter(
      (item) => !props.modelValue.includes(item[props.id])
    );

    _leftDataSource.value = props.dataSource.filter(
      (item) => !props.modelValue.includes(item[props.id])
    );

    rightDataSource.value = [...targetDataSource];
    _rightDataSource.value = [...targetDataSource];
  },
  { immediate: true }
);

watch(
  leftSelectedKeys,
  () => {
    if (
      leftDataSource.value.length === leftSelectedKeys.value.length &&
      leftDataSource.value.length != 0
    ) {
      allLeftChecked.value = true;
    } else {
      allLeftChecked.value = false;
    }
    if (leftSelectedKeys.value.length > 0 && leftDataSource.value.length != 0) {
      hasLeftChecked.value = true;
    } else {
      hasLeftChecked.value = false;
    }
  },
  { deep: true }
);

const allRightChange = (checked: any) => {
  if (checked) {
    const datasources = rightDataSource.value.filter((item: any) => {
      return !item.disabled;
    });
    const ids = datasources.map((item) => {
      return item[props.id];
    });
    rightSelectedKeys.value = [...ids];
  } else {
    rightSelectedKeys.value = [];
  }
};

watch(
  rightSelectedKeys,
  () => {
    if (
      rightDataSource.value.length === rightSelectedKeys.value.length &&
      rightDataSource.value.length > 0
    ) {
      allRightChecked.value = true;
    } else {
      allRightChecked.value = false;
    }
    if (
      rightSelectedKeys.value.length > 0 &&
      rightDataSource.value.length != 0
    ) {
      hasRightChecked.value = true;
    } else {
      hasRightChecked.value = false;
    }
  },
  { deep: true }
);

const add = () => {
  if (leftSelectedKeys.value.length === 0) {
    return;
  }

  let targetKeys: any[] = [];

  leftDataSource.value.forEach((item) => {
    if (leftSelectedKeys.value.indexOf(item[props.id]) != -1) {
      targetKeys.push(item[props.id]);
    }
  });

  rightDataSource.value.forEach((item) => {
    targetKeys.push(item[props.id]);
  });

  emits("change", targetKeys);
  emits("update:modelValue", targetKeys);

  leftSelectedKeys.value = [];
};

const remove = () => {
  if (rightSelectedKeys.value.length === 0) {
    return;
  }

  let targetKeys: any[] = [];

  rightDataSource.value.forEach((item) => {
    if (rightSelectedKeys.value.indexOf(item[props.id]) == -1) {
      targetKeys.push(item[props.id]);
    }
  });

  emits("change", targetKeys);
  emits("update:modelValue", targetKeys);

  rightSelectedKeys.value = [];
};

const searchLeft = (e: any) => {
  if (e === "") {
    leftDataSource.value = _leftDataSource.value;
  }
  leftDataSource.value = _leftDataSource.value.filter((item) => {
    if (item.title.indexOf(e) != -1) {
      return item;
    }
  });
};

const searchRight = (e: any) => {
  if (e === "") {
    rightDataSource.value = _rightDataSource.value;
  }
  rightDataSource.value = _rightDataSource.value.filter((item) => {
    if (item.title.indexOf(e) != -1) {
      return item;
    }
  });
};

const boxStyle = computed(() => {
  return {
    width: props.width,
    height: props.height,
  };
});
</script>

<template>
  <div>
    <div class="layui-transfer layui-form layui-border-box">
      <div class="layui-transfer-box" :style="boxStyle">
        <div class="layui-transfer-header">
          <LayCheckbox
            v-model="hasLeftChecked"
            :is-indeterminate="!allLeftChecked"
            skin="primary"
            value="all"
            @change="allLeftChange"
          >
            {{ title[0] }}
          </LayCheckbox>
        </div>
        <div class="layui-transfer-search" v-if="showSearch">
          <lay-input
            prefix-icon="layui-icon-search"
            @input="searchLeft"
            placeholder="关键词搜索"
          ></lay-input>
        </div>
        <ul class="layui-transfer-data">
          <li v-for="dataSource in leftDataSource" :key="dataSource">
            <LayCheckbox
              v-model="leftSelectedKeys"
              skin="primary"
              :disabled="dataSource.disabled"
              :value="dataSource[id]"
            >
              <slot v-if="slots.item" name="item" :data="dataSource"></slot>
              <template v-else>{{ dataSource.title }}</template>
            </LayCheckbox>
          </li>
        </ul>
        <div class="layui-transfer-footer" v-if="slots.leftFooter">
          <slot name="leftFooter"></slot>
        </div>
      </div>
      <div class="layui-transfer-active">
        <div class="layui-transfer-button-group">
          <LayButton
            type="primary"
            :disabled="leftSelectedKeys.length == 0"
            @click="add"
            ><i class="layui-icon layui-icon-next"></i
          ></LayButton>
          <LayButton
            type="primary"
            :disabled="rightSelectedKeys.length == 0"
            @click="remove"
            ><i class="layui-icon layui-icon-prev"></i
          ></LayButton>
        </div>
      </div>
      <div class="layui-transfer-box" :style="boxStyle">
        <div class="layui-transfer-header">
          <LayCheckbox
            v-model="hasRightChecked"
            :is-indeterminate="!allRightChecked"
            skin="primary"
            value="all"
            @change="allRightChange"
          >
            {{ title[1] }}
          </LayCheckbox>
        </div>
        <div class="layui-transfer-search" v-if="showSearch">
          <lay-input
            prefix-icon="layui-icon-search"
            @input="searchRight"
            placeholder="关键词搜索"
          ></lay-input>
        </div>
        <ul class="layui-transfer-data">
          <li v-for="dataSource in rightDataSource" :key="dataSource">
            <LayCheckbox
              skin="primary"
              v-model="rightSelectedKeys"
              :disabled="dataSource.disabled"
              :value="dataSource[id]"
            >
              <slot v-if="slots.item" name="item" :data="dataSource"></slot>
              <template v-else>{{ dataSource.title }}</template>
            </LayCheckbox>
          </li>
        </ul>
        <div class="layui-transfer-footer" v-if="slots.rightFooter">
          <slot name="rightFooter"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
