### 介绍

    此脚本可批量剔除web项目中的国际化内容为对应的内容

### 示例一

```
<div>{{ $t('home') }}</div>

<!-- 替换后为 -->
<div>首页</div>
```

### 示例二

```javascript
const title = this.$t('order.orderNumber')

// 替换后为
const title = '订单号'
```

### 准备

需准备一份后缀名为 mjs 的国际化文件，用于替换文件中的国际化，内容格式如下

```javascript
export default [
  home: '首页',
  login: '登录'
  order: {
      orderNumber: '订单号'
  }
]
```

### Installation

```bash
 npm install @bellacocool/i18n-remove
```

### Use

执行`i18nrm`，根据提示输入即可

```bash
 i18nrm
```

### Other

- About log

```
文件 /Users/xuexingwei/Desktop/code/admin-base/src/views/agent/components/DialogAgent.vue 替换了0处，1处没有被替换
文件 /Users/xuexingwei/Desktop/code/admin-base/src/views/home/components/fillInPrincipal.vue 替换了38处
文件 /Users/xuexingwei/Desktop/code/admin-base/src/views/home/components/willExpire.vue 替换了14处
文件 /Users/xuexingwei/Desktop/code/admin-base/src/views/home/index.vue 替换了16处
文件 /Users/xuexingwei/Desktop/code/admin-base/src/views/issue/index.vue 替换了0处，1处没有被替换
文件 /Users/xuexingwei/Desktop/code/admin-base/src/views/issue/issueWait.vue 替换了0处，1处没有被替换
文件 /Users/xuexingwei/Desktop/code/admin-base/src/views/login/emailCode.vue 替换了6处，1处没有被替换
文件 /Users/xuexingwei/Desktop/code/admin-base/src/views/systemSetting/seal/index.vue 替换了2处
文件 /Users/xuexingwei/Desktop/code/admin-base/src/views/user/index.vue 替换了14处
```
