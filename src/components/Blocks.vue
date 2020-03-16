<template>
  <v-container>
    <v-row
      class="grey lighten-5"
      align="stretch"
      justify="space-around"
    >
      <v-col cols="3">
        <h3>Dockerfile</h3>
        <draggable
          :class="$style.dragArea +' list-group'"
          :list="dockerfile"
          group="blocks"
          @change="log"
        >
          <v-card
            v-for="block in dockerfile"
            :key="block.TAG"
            class="list-group-item pa-2 ma-2"
          >
            <v-card-title v-text="block.TAG" />
            <v-card-text v-text="block.Description" />
            <div
              v-for="uiItem in block.UI"
              :key="uiItem.Name"
            >
              <v-text-field
                v-if="uiItem.Type=='TEXTFIELD'"
                @keyup="performUIFunction(uiItem.Function,$event.target.value)"
                @focus="performUIFunction(uiItem.Function,$event.target.value)"
              />
              {{ uiItem }}
            </div>
            {{ block.UI }}
          </v-card>
        </draggable>
      </v-col>

      <v-col cols="3">
        <div>
          {{ debug }}
        </div>
        <rawDisplayer
          :value="blocks"
          title="Blocks"
        />
      </v-col>
      <v-col cols="3">
        <rawDisplayer
          :value="dockerfile"
          title="dockerfile"
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
          :list="blocks"
          :group="{ name: 'blocks', pull: 'clone', put: false }"
          @change="log"
        >
          <v-card
            v-for="block in blocks"
            :key="block.TAG"
            class="list-group-item pa-2 ma-2"
          >
            <v-card-title v-text="block.TAG" />
            <v-card-text v-text="block.Description" />
          </v-card>
        </draggable>
      </v-card>
    </portal>
  </v-container>
</template>

<script>
import github from 'octonode';
import draggable from 'vuedraggable';
import { mapState } from 'vuex';

import rawDisplayer from '@/components/raw-displayer.vue';
import AmplifyStore from '@/store';

export default {
  name: 'Blocks',
  components: {
    draggable,
    rawDisplayer,
  },
  data() {
    return {
      logger: null,
      blocks: [],
      debug: '',
      githubClient: null,
      githubApiKey: null,
      previousBlockMenuScroll: {
        x: null,
        y: null,
      },
      dockerfile: [
      ],
      list2: [
      ],
    };
  },
  computed: mapState({
    githubAPIKeyState: () => AmplifyStore.state.githubApiKey,
  }),
  watch: {},
  created() {
    this.logger = new this.$Amplify.Logger('BLOCKS_component');
    this.githubApiKey = this.githubAPIKeyState;
    if (this.githubApiKey) {
      this.githubClient = github.client(this.githubApiKey);
    } else {
      this.githubClient = github.client();
    }

    this.getBlocks();
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
    async getBlocks() {
      const ghrepo = this.githubClient.repo('dbhagen/dockmaker-blocks');
      const blockTemplates = await ghrepo.contentsAsync('', 'master').then((files) => files[0].filter((file) => file.name.endsWith('block.json')));
      blockTemplates.forEach((file) => {
        ghrepo.contentsAsync(file.name, 'master').then((fileRef) => {
          const blockFileContent = JSON.parse(atob(fileRef[0].content));
          blockFileContent.id = this.blocks.length;
          blockFileContent.name = blockFileContent.TAG;
          this.$set(this.blocks, this.blocks.length, blockFileContent);
        }).error((err) => {
          if (err.statusCode === 404) {
            this.logger.error('err', err);
          }
        });
      });
    },
    performUIFunction(func, test) {
      const funcSub = `this.${func.replace("'query': ''", `'query': '${test}'`)}`;
      eval(funcSub); // eslint-disable-line no-eval
    },
    ApiQueryReturnsJson(args) {
      this.logger.info('API', args, args.uri);
      this.axios.get(args.uri, { crossdomain: true }).then((response) => {
        this.debug = response;
        this.logger.info(response);
      });
    },
  },
};
</script>

<style module>
.dragArea {
  background-color: #DDD;
  height: 100%;
}
</style>

<docs>
** test
```vue
testing
```
</docs>
