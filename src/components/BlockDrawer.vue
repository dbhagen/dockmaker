<template>
  <div>
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
  </div>
</template>

<script>
import github from 'octonode';
import draggable from 'vuedraggable';
import { mapState } from 'vuex';

import AmplifyStore from '@/store'; // eslint-disable-line

export default {
  name: 'BlockDrawer',
  components: {
    draggable,
  },
  data() {
    return {
      logger: null,
      blocks: [],
      blocksIndex: [],
      githubClient: null,
    };
  },
  computed: mapState({
    githubAPIKeyState: () => AmplifyStore.state.githubApiKey,
  }),
  created() {
    this.logger = new this.$Amplify.Logger('BLOCK-DRAWER_component');
    this.githubApiKey = this.githubAPIKeyState;
    if (this.githubApiKey) {
      this.githubClient = github.client(this.githubApiKey);
    } else {
      this.githubClient = github.client();
    }
  },
  mounted() {
    this.getBlocks();
  },
  activated() {
    if (this.blocksIndex) {
      this.$emit('got-blocks', this.blocksIndex);
    } else {
      this.getBlocks();
    }
  },
  methods: {
    log(msg) {
      this.logger.info(msg);
    },
    async getBlocks() {
      const ghrepo = this.githubClient.repo('dbhagen/dockmaker-blocks');
      this.blocks = [];
      this.blocksIndex = [];
      const blockTemplates = await ghrepo.contentsAsync('', 'master').then((files) => files[0].filter((file) => file.name.endsWith('block.json')));
      blockTemplates.forEach((file) => {
        ghrepo.contentsAsync(file.name, 'master').then((fileRef) => {
          const blockFileContent = JSON.parse(atob(fileRef[0].content));
          blockFileContent.id = this.blocks.length;
          blockFileContent.name = blockFileContent.TAG;
          this.$set(this.blocks, blockFileContent.id, blockFileContent);
          this.$set(this.blocksIndex, this.blocksIndex.length, blockFileContent.TAG);
        }).error((err) => {
          if (err.statusCode === 404) {
            this.logger.error('err', err);
          }
        });
      });
      this.$emit('got-blocks', { target: this });
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
