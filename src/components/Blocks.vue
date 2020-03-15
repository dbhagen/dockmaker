<template>
  <v-container>
    <v-row
      class="grey lighten-5"
      align="stretch"
      justify="space-around"
    >
      <v-col>
        <h3>Dockerfile</h3>
        <draggable
          class="dragArea list-group"
          :list="list2"
          group="people"
          @change="log"
        >
          <v-card
            v-for="element in list2"
            :key="element.name"
            class="list-group-item pa-2 ma-2"
          >
            <v-card-title v-text="element.name" />
            <v-card-text v-text="element.name + ' test new'" />
          </v-card>
        </draggable>
      </v-col>

      <v-col>
        <rawDisplayer
          :value="list2"
          title="List 2"
        />
      </v-col>
    </v-row>
    <portal
      to="destination"
      :order="1"
    >
      <v-card
        tile
        flat
        class="pa-2 ma-2"
      >
        <h3>Dockerfile Components</h3>
        <draggable
          class="dragArea list-group"
          :list="list1"
          :group="{ name: 'people', pull: 'clone', put: false }"
          @change="log"
        >
          <v-card
            v-for="element in list1"
            :key="element.name"
            class="list-group-item pa-2 ma-2"
          >
            <v-card-title v-text="element.name" />
            <v-card-text v-text="element.name + ' test content'" />
          </v-card>
        </draggable>
      </v-card>
    </portal>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable';

import rawDisplayer from './raw-displayer.vue';

export default {
  name: 'Blocks',
  components: {
    draggable,
    rawDisplayer,
  },
  data() {
    return {
      logger: null,
      previousBlockMenuScroll: {
        x: null,
        y: null,
      },
      list1: [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 },
        { name: 'John2', id: 8 },
        { name: 'Joao3', id: 9 },
        { name: 'Jean4', id: 10 },
        { name: 'Gerard5', id: 11 },
        { name: 'John6', id: 12 },
        { name: 'Joao7', id: 13 },
        { name: 'Jean8', id: 14 },
        { name: 'Gerard9', id: 15 },
      ],
      list2: [
        { name: 'Juan', id: 5 },
        { name: 'Edgard', id: 6 },
        { name: 'Johnson', id: 7 },
      ],
    };
  },
  created() {
    this.logger = new this.$Amplify.Logger('BLOCKS_component');
  },
  deactivated() {
    // Set scroll position before deactivation for return
  },
  activated() {
    // reset scroll position after activation
  },
  methods: {
    log(msg) {
      this.logger.info(msg);
    },
  },
};
</script>

<style module>
</style>

<docs>
** test
```vue
testing
```
</docs>
