<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
    >
      <authenticator
        ref="amplifyAuthenticator"
        :auth-config="authConfig"
        class="ma-2 pa-2"
        :initstate="$route.params.method"
      />
    </v-row>
    <v-row
      justify="center"
      align="center"
    >
      <v-card>{{ $route.params }}</v-card>
    </v-row>
    <v-row
      justify="center"
      align="center"
    >
      <v-btn @click="forgot">
        Forgot
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { AmplifyEventBus } from "aws-amplify-vue";
import { components } from 'aws-amplify-vue'

export default {
  name: "Auth",

  components: {
    ...components
  },
  data() {
    return {
      authConfig: {},
      signInConfig: {},
      logger: null,
      state: null
    };
  },
  watch: {
    state: function(newVal, oldVal) {
      this.logger.info("State", newVal, oldVal);
    }
  },
  created() {
    this.logger = new this.$Amplify.Logger("AUTH_component");
    this.logger.info('comps', components)
    AmplifyEventBus.$on("authState", state => {
      if (this.$router.history.current.path != "/auth/" + state) {
        this.$router.push({ path: "/auth/" + state });
      }
      this.state = state;
    });
  },
  mounted() {
    if (
      this.$route.params != undefined &&
      this.$route.params.method != undefined
    ) {
      // this.$refs.amplifyAuthenticator.updateDisplayMap(this.$route.params.method)
      // this.logger.info("authM", this.$refs.amplifyAuthenticator);
      // this.$nextTick(() => {
      //   this.logger.info("authMNT", this.$refs.amplifyAuthenticator);
      //   // this.logger.info("emit", this.$route.params.method);
      //   AmplifyEventBus.$emit("authState", this.$route.params.method);
      // });
    }
  },
  methods: {
    forgot() {
      AmplifyEventBus.$emit("authState", "forgotPassword");
    }
  }
};
</script>

<style module>
.amplifyAuthBox {
  width: 460px;
}
</style>
