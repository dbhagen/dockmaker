<template>
  <v-card class="grey pa-2 ma-2">
    <v-card-title>{{ title }}</v-card-title>
    <pre class="$style.pre">{{ valueString }}</pre>
  </v-card>
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
.pre {
  text-align: start;
}
</style>
