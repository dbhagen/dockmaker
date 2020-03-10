<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
    >
      <amplify-authenticator
        ref="amplifyAuthenticator"
        :auth-config="authConfig"
        class="ma-2 pa-2"
        :initstate="$route.params.method"
      />
    </v-row>
  </v-container>
</template>

<script>
import AmplifyStore from '../store/index';
import { AmplifyEventBus } from "aws-amplify-vue";

export default {
  name: "Auth",

  data() {
    return {
      authConfig: {
        signInConfig: {
          usernameAttributes: 'email'
        },
        signUpConfig: {
          hiddenDefaults: ['phone_number'],
          defaultCountryCode: "1",
          signUpFields: [
            {
              label: "Display Name",
              key: "name",
              required: true,
              displayOrder: 3,
              type: "string"
            },
          ]
        },
        confirmSignUpConfig: {},
        confirmSignInConfig: {},
        forgotPasswordConfig: {},
        mfaConfig: {},
        requireNewPasswordConfig: {},
        usernameAttributes: 'email'
      },
      signInConfig: {},
      logger: null,
      state: null
    };
  },
  computed: {
    mappedStateFromURL: function() {
      if (this.$route.params.method !== undefined) {
        const methodOrginal = this.$route.params.method;
        const method = methodOrginal.toLowerCase();
        const stateMap = {
          'signout': "signOut",
          'signedout': "signedOut",
          'signin': "signIn",
          'signup': "signUp",
          'confirmsignup': "confirmSignUp",
          'confirmsignin': "confirmSignIn",
          'forgotpassword': "forgotPassword",
          'signedin': "signedIn",
          'setmfa': "setMfa",
          'requirenewpassword': "requireNewPassword"
        };

        if (stateMap[method] === undefined) {
          return "signIn";
        } else {
          return stateMap[method];
        }
      } else {
        return "signIn";
      }
    },
    user: function() {
      return AmplifyStore.state.user
    },
  },
  // watch: {
  //   state: function(newVal, oldVal) {
  //     this.logger.info("State", newVal, oldVal);
  //   }
  // },
  created() {
    this.logger = new this.$Amplify.Logger("AUTH_component");
    AmplifyEventBus.$on("authState", async state => {
      if (state === "signedIn") {
        AmplifyStore.commit('setUser', await this.$Amplify.Auth.currentAuthenticatedUser());
        if (this.$router.history.current.path != '/') {
          this.$router.push({ path: '/'})
        }
      } else if (state === "signout" || state === "signOut") {
        this.$Amplify.Auth.signOut().then(() => {
          AmplifyStore.commit('setUser', null);
          if (this.$router.history.current.path != '/') {
            this.$router.push({ path: '/'})
          }
        });
      } else if (this.$router.history.current.path != "/auth/" + state) {
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
      // this.$refs.amplifyAuthenticator.$nextTick(() => {
      setTimeout(() => {
        AmplifyEventBus.$emit("authState", this.mappedStateFromURL);
      }, 1);
      // });
    }
  },
  methods: {}
};
</script>

<style module>
.amplifyAuthBox {
  width: 460px;
}
</style>
