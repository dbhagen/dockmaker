<template>
  <v-container
    fluid
    class="ma-0 pa-1 fill-height"
    style="height: 100%;"
  >
    <multipane
      class="custom-resizer"
      layout="vertical"
    >
      <div
        v-if="showBlocks"
        class="pane"
        :style="{ width: '400px', maxWidth: '600px' }"
      >
        <dockerfile-blocks
          :dockerfile="dockerfile"
        />
      </div>
      <multipane-resizer v-if="showBlocksDebug" />
      <div
        v-if="showBlocksDebug"
        class="pane"
      >
        <rawDisplayer
          :value="blocks"
          title="Blocks"
        />
      </div>
      <multipane-resizer v-if="showCode" />
      <div
        v-if="showCode"
        :style="{width: '400px', maxWidth: '600px' }"
        class="pane"
      >
        <dockerfile-code
          v-if="showCode"
          :code="code"
        />
      </div>
    </multipane>
    <rawDisplayer
      v-if="false"
      :value="dockerfile"
      title="dockerfile"
    />
    <portal
      to="destination"
      :order="1"
    >
      <block-drawer
        ref="blockdrawer"
        @got-blocks="gotBlocks($event.target)"
      />
      <div>
        <v-switch v-model="showBlocks" />
        <v-switch v-model="showBlocksDebug" />
        <v-switch v-model="showCode" />
        {{ debug }}
      </div>
    </portal>
  </v-container>
</template>

<script>
// /* eslint-disable no-unused-vars */
// import {
//   DockerHubRepo,
//   DockerManifestList,
//   fetchManifestList,
//   queryRepo,
//   queryTags,
//   queryTopRepos,
//   Tag,
// } from 'docker-hub-utils';
// /* eslint-enable no-unused-vars */
import github from 'octonode';
import { Multipane, MultipaneResizer } from 'vue-multipane';
import { mapState } from 'vuex';

import blockDrawer from '@/components/BlockDrawer';
import dockerfileBlocks from '@/components/dockerfileBlocks';
import dockerfileCode from '@/components/dockerfileCode';
import rawDisplayer from '@/components/raw-displayer.vue';
import AmplifyStore from '@/store';

export default {
  name: 'Blocks',
  components: {
    rawDisplayer,
    blockDrawer,
    dockerfileBlocks,
    dockerfileCode,
    Multipane,
    MultipaneResizer,
  },
  data() {
    return {
      logger: null,
      showBlocks: true,
      showBlocksDebug: true,
      showCode: false,
      defaultDockerfile: 'FROM amazonlinux:2',
      dockerfileSetTimeout: null,
      getBlocksTimeout: null,
      code: 'test',
      blocks: [],
      blocksIndex: [],
      debug: '',
      githubClient: null,
      githubApiKey: null,
      previousBlockMenuScroll: {
        x: null,
        y: null,
      },
      dockerfile: [],
      searchitems: [],
    };
  },
  computed: mapState({
    githubAPIKeyState: () => AmplifyStore.state.githubApiKey,
    storedDockerfile: () => AmplifyStore.state.dockerfile,
    computedBlocks() {
      return this.$refs.blockdrawer;
    },
  }),
  watch: {
    // '$vuetify.theme.dark': function (newVal, oldVal) { // eslint-disable-line func-names
    // this.$refs.editor.theme = newVal ? 'vs-dark' : 'vs';
    // },
  },
  async created() {
    this.logger = new this.$Amplify.Logger('BLOCKS_component');
    // const dockerRepo = await queryTopRepos({ lastUpdatedSince: new Date() });
    this.githubApiKey = this.githubAPIKeyState;
    if (this.githubApiKey) {
      this.githubClient = github.client(this.githubApiKey);
    } else {
      this.githubClient = github.client();
    }
    this.code = this.storedDockerfile ? this.storedDockerfile : this.defaultDockerfile;
  },
  mounted() {
    // this.getBlocksTimeout = setTimeout(() => {
    // this.logger.info('updated', this.$refs.blockdrawer);
    //   if (this.$refs.blockdrawer) {
    //     this.logger.info('updated');
    //     this.blocksIndex = this.$refs.blockdrawer.blocksIndex;
    //   } else {
    //     if (this.getBlocksTimeout) {
    //       clearTimeout(this.getBlocksTimeout)
    //     }
    //     this.get
    //   }
    // }, 10);
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
    convertDockerfile() {
      if (this.$refs.blockdrawer) {
        if (this.dockerfileSetTimeout) { clearTimeout(this.dockerfileSetTimeout); }

        const dockerfileLines = this.code.split('\n');
        // eslint-disable-next-line no-unused-vars
        const firstItems = dockerfileLines.reduce((result, line, lineNumber) => {
          const firstWord = line.split(/ /)[0];
          if (firstWord.length > 0 && firstWord.substr(0, 1).match(/[a-z]/i)) {
            result.push({ TAG: firstWord, line, lineNumber: lineNumber + 1 });
          }
          return result;
        }, []);
        this.mapFileLinesToBlocks(firstItems);
      } else if (!this.dockerfileSetTimeout) {
        this.dockerfileSetTimeout = setTimeout(this.convertDockerfile, 10);
      }
    },
    mapFileLinesToBlocks(firstItems) {
      this.logger.info('FI', Object.values(firstItems));
      this.dockerfile = Object.values(firstItems).map((item) => {
        this.logger.info('IT', item.TAG, this.blocksIndex);
        return item;
      });
    },
    gotBlocks(event) {
      this.blocksIndex = event.blocksIndex;
      this.convertDockerfile();
    },
    performUIFunction(func, test) {
      const funcSub = `this.${func.replace("'query': ''", `'query': '${test}'`)}`; // eslint-disable-line
      // eval(funcSub); // eslint-disable-line no-eval
    },
    ApiQueryReturnsJson(args) {
      this.logger.info('API', args, `https://cors-anywhere.herokuapp.com/${args.uri}`);
      if (args.query) {
        const queryAppend = args.queryAppend.replace('$1', args.query);
        this.axios.get(`https://cors-anywhere.herokuapp.com/${args.uri}${queryAppend}`, { crossdomain: true }).then((response) => {
          this.searchitems = response.data.results;
          this.logger.info('res', response.data);
        });
      } else {
        this.axios.get(`https://cors-anywhere.herokuapp.com/${args.uri}`, { crossdomain: true }).then((response) => {
          this.searchitems = response.data.results;
          this.logger.info('res', response.data);
        });
      }
    },
  },
};
</script>

<style lang="scss">
.custom-resizer {
  width: 100%;
  height: 100%;
}
.custom-resizer > .pane {
  padding: 0px;
  margin: 0px;
  overflow: hidden;
  min-width: 250px;
}
.custom-resizer > .multipane-resizer {
  margin: 0; left: 0;
  position: relative;
  &:before {
    display: block;
    content: "";
    width: 3px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -1.5px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  &:hover {
    &:before {
      border-color: #999;
    }
  }
}
</style>

<docs>
** test
```vue
testing
```
</docs>
