<template>
  <div :class="$style.codewindow + ' pa-2 ma-2'">
    <h3>{{ title }}</h3>
    <pre>{{ valueString }}</pre>
  </div>
</template>
<script>
const props = {
  name: 'raw-displayer',
  title: {
    required: true,
    type: String,
  },
  value: {
    required: true,
  },
};
export default {
  props,
  computed: {
    valueString() {
      return JSON.stringify(this.value, null, 2);
    },
  },
};
</script>
<style module>
pre {
  text-align: start;
}
.codewindow {
  background-color: #DDD;
}
</style>
