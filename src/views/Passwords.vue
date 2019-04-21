<template>
  <div class="passwordPage page">
    <h1 class="subheading grey--text">VAULT</h1>

    <v-container class="my-5">
      <v-layout>
        <v-btn class="font-weight-light" color="grey" flat round>
          <span>add password</span>
          <v-icon small>add</v-icon>
        </v-btn>
      </v-layout>
      <v-divider class="my-3"></v-divider>
      <v-layout scrollable row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="password in passwords" :key="password.name">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar :class="`${ password.strength }`" size="100">
                <img src="/lock-default.png">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ password.name }}</div>
              <v-divider class="my-3"></v-divider>
              <v-chip :class="`${ password.strength }`" text-color="white">{{ password.strength }}</v-chip>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>create</v-icon>
                <span>Edit</span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="getPassword(password.name, password.pass)" flat color="grey">
                <v-icon small left>lock_open</v-icon>
                <span>Show</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-dialog  v-model="dialog" max-width="290">
          <v-card>
            <v-card-title> {{ this.name }} </v-card-title>
            
            <v-divider></v-divider>
  
            <v-chip  color="secondary white--text" >{{ this.pass }}</v-chip>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="primary" flat="flat" >
                <span>Copy</span>
              </v-btn>

              <v-btn color="primary" flat="flat" @click="dialog = false">
                <span>Close</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$emit("changePage", 2);
  },
  data() {
    return {
      passwords: [
        {
          name: "Google",
          pass: "jeff",
          strength: "strong"
        },
        {
          name: "Facebook",
          pass: "badman",
          strength: "weak"
        },
        {
          name: "Twitter",
          pass: "badman",
          strength: "medium"
        },
        {
          name: "FFC",
          pass: "terrymcdoodle",
          strength: "medium"
        },
        {
          name: "Github",
          pass: "unclebob",
          strength: "strong"
        }
      ],
      page: 2,
      color: "",
      dialog: false,
      name: '',
      pass: ''
    };
  },
  methods: {
    getPassword(name, password) {
      this.dialog = true
      this.name = name
      this.pass = password;
    }
  },
  computed: {}
};
</script>


<style scoped>
.password-wrap {
   overflow-y: auto;
}

.strong {
  background-color: green;
}
.medium {
  background-color: orange;
}
.weak {
  background-color: red;
}
</style>
