<template>
  <div>
    <p>hello</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted() {
    browser.runtime.sendMessage({});
  },
  computed: {
  },
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
