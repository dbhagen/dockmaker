<template>
  <div
    class="green"
  >
    <v-card-title>
      Dockerfile
    </v-card-title>
    <vue-scroll>
      <draggable
        :class="$style.dragArea +' pa-2 ma-2 list-group'"
        :list="dockerfile"
        group="blocks"
        @change="log"
      >
        <v-card
          v-for="block in dockerfile"
          :key="`${block.TAG}_${block.lineNumber}`"
          class="list-group-item pa-2 ma-2"
        >
          <v-card-title v-text="block.TAG" />
          <v-card-text v-text="block.Description" />
          <div
            v-for="(uiItem,uiItemIndex) in block.UI"
            :key="uiItem.Name+uiItemIndex"
          >
            <v-menu
              offset-y
              disabled
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-if="uiItem.Type=='TEXTFIELD'"
                  v-on="on"
                  @keyup="performUIFunction(uiItem.Function,$event.target.value)"
                  @focus="performUIFunction(uiItem.Function,$event.target.value)"
                />
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in searchitems"
                  :key="index"
                  @click="logger.info('click', $event.target)"
                >
                  <v-list-item-title>{{ item.repo_name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          {{ block.UI }}
        </v-card>
      </draggable>
    </vue-scroll>
  </div>
</template>
<script>
import draggable from 'vuedraggable';

export default {
  name: 'DockerfileBlocks',
  components: {
    draggable,
  },
  props: {
    dockerfile: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      logger: null,
    };
  },
  created() {
    this.logger = new this.$Amplify.Logger('dockerfileBLOCKS_component');
  },
  methods: {
    log(msg) {
      this.logger.info(msg);
    },
  },
};
</script>
<style module>
.dragArea {
  /* background-color: #DDD; */
  /* height: 100%; */
}
</style>
