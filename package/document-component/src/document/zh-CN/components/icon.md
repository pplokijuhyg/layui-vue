::: anchor
:::

::: title 基本介绍
:::

::: describe 语义化的矢量图形。使用图标组件，你需要安装 `@layui/icons-vue` 图标组件包
:::

::: title 基础使用
:::

::: demo 使用 `lay-icon` 标签, 创建图标组件

<template>
  <lay-icon type="layui-icon-face-smile"></lay-icon>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title 图标颜色
:::

::: demo 使用 `color` 属性设置颜色

<template>
  <lay-icon type="layui-icon-face-smile" color="red"></lay-icon> &nbsp;
  <lay-icon type="layui-icon-face-smile" color="orange"></lay-icon> &nbsp;
  <lay-icon type="layui-icon-face-smile" color="green"></lay-icon> &nbsp;
  <lay-icon type="layui-icon-face-smile" color="cyan"></lay-icon> &nbsp;
  <lay-icon type="layui-icon-face-smile" color="blue"></lay-icon> &nbsp;
  <lay-icon type="layui-icon-face-smile" color="black"></lay-icon> &nbsp;
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title 图标尺寸
:::

::: demo 使用 `size` 属性设置尺寸

<template>
  <lay-icon type="layui-icon-star" size="26px" color="red"></lay-icon>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::


::: title 图标组件
:::

<br>

::: describe 在 0.2.4 版本后, 图标支持组件化的调用方式, 首先你需要安装 `@layui/icons-vue` 依赖。
:::

```
npm install @layui/icons-vue
```

::: describe 接下来, 你可以像之前使用组件一样去创建图标。
:::

```vue
<template>
  <AlignCenterIcon></AlignCenterIcon>
  <DiamondIcon></DiamondIcon>
</template>

<script setup>
  import { AlignCenterIcon, DiamondIcon } from '@layui/icons-vue';
</script>
```

::: title 图标列表
:::

::: demo

<template>
  <ul class="site-doc-icon">
    <li v-for="(layIcon, index) of LayIconList" @click="copy(layIcon.class)">
        <i :class="[`layui-icon ${layIcon.class}`]"></i>
        <div class="doc-icon-name">{{ layIcon.name }}</div>
        <div class="doc-icon-code">&amp;#x{{ iconsUnicode[index] }};</div>
        <div class="doc-icon-fontclass">{{ layIcon.class }}</div>
    </li>
  </ul>
</template>

<script setup>
  import { onMounted, nextTick, reactive } from 'vue'
  import { useClipboard, usePermission } from "@vueuse/core";
  import { layer } from '@layui/layer-vue';
  import { LayIconList } from '@layui/icons-vue';

  const iconsUnicode = reactive([]);

  function copy(iconClass) {
    const { isSupported, copy, copied } = useClipboard()
    const permissionWrite = usePermission('clipboard-write')
    if (isSupported && permissionWrite.value === 'granted') {
      copy(iconClass)
      copied.value = true
    } else {
      let inputEl = document.createElement('input')
      inputEl.value = iconClass
      document.body.appendChild(inputEl)
      inputEl.select() 
      document.execCommand('Copy') 
      inputEl.remove()
      copied.value = true
    }
    if (copied.value) {
      layer.msg(`复制成功 &nbsp<span style="color:#5FB878;" >${ iconClass }</span>`, 
        {
          icon: 1, 
          time: 1500, 
          offset:['15%','50%'], 
          isHtmlFragment: true 
        }, 
        () => { }
      )
    } else {
      layer.msg('复制失败', { icon: 2, time: 1500, }, () => { })
    }
  } 

  function getIconUnicode(iconClass){
    const iconEl = document.querySelector(`.site-doc-icon > li > .${iconClass}`);
    const iconBeforeContent = window?.getComputedStyle(iconEl)?.content;
    return iconBeforeContent;
  } 

  onMounted(() => {
    nextTick(() => {
      LayIconList?.forEach((icon) => {
        // unicode 10进制转16进制
        const unicode = getIconUnicode(icon.class).charCodeAt(1).toString(16); 
        iconsUnicode.push(unicode)
      });
    })    
  })
</script>

<style>
.site-doc-icon {
  margin-bottom: 50px;
  font-size: 0;
}
.site-doc-icon li .doc-icon-name,
.site-doc-icon li .doc-icon-code {
  color: #c2c2c2;
}
.site-doc-icon li .doc-icon-fontclass {
  height: 40px;
  line-height: 20px;
  padding: 0 5px;
  font-size: 13px;
  color: #333;
}
.site-doc-icon li {
  display: inline-block;
  vertical-align: middle;
  width: 16.5%;
  height: 105px;
  line-height: 25px;
  padding: 20px 0;
  margin-right: -1px;
  margin-bottom: -1px;
  border: 1px solid #e2e2e2;
  font-size: 14px;
  text-align: center;
  color: #666;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
}
.site-doc-icon li:hover{
  background-color: #F6F6F6;
}
.site-doc-icon li:hover{
  background-color:red;
}
.site-doc-icon li .layui-icon {
  display: inline-block;
  font-size: 32px;
}
.anim .site-doc-icon {
  margin-bottom: 50px;
  font-size: 0;
}
.anim .site-doc-icon li {
  width: 50%;
}
.anim .site-doc-icon li {
  display: inline-block;
  vertical-align: middle;
  width: 16.5%;
  height: 105px;
  line-height: 25px;
  padding: 20px 0;
  margin-right: -1px;
  margin-bottom: -1px;
  border: 1px solid #e2e2e2;
  font-size: 14px;
  text-align: center;
  color: #666;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
}
.anim .site-doc-icon li .layui-anim {
  width: 125px;
  height: 125px;
  line-height: 125px;
  margin: 0 auto 10px;
  text-align: center;
  background-color: var(--global-primary-color);
  cursor: pointer;
  color: #fff;
  border-radius: 50%;
}
.anim .site-doc-icon li .code {
  white-space: nowrap;
}
</style>
:::

::: title 图标属性
:::

::: table

| 属性   | 描述 | 默认值            |
| ------ | ---- | ----------------- |
| type   | 图标 | `layui-icon-home` |
| prefix | 前缀 | `layui-icon`      |
| color  | 颜色 | --                |
| size   | 尺寸 | --                |

:::

::: contributor icon
::: 

::: previousNext icon
:::