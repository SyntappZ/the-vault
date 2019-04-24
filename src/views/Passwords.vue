<template>

  <div class="passwordPage page">
    <passwordCreator :passwordDialog="passwordDialog" v-on:dialogToggle="closeDialog()"/>
    <h1 class="subheading grey--text">VAULT</h1>

    <v-container class="my-5">
      <v-layout>
        <v-btn @click="passwordDialog = true" class="font-weight-light" color="grey" flat round>
          <span>add password</span>
          <v-icon small>add</v-icon>
        </v-btn>
      </v-layout>
      <v-divider class="my-3"></v-divider>
      <v-layout scrollable row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="password in passwords" :key="password.website">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar :class="`${ password.strength }`" size="100">
                <img src="/lock-default.png">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ password.website }}</div>
              <v-divider class="my-3"></v-divider>
              <v-chip :class="`${ password.strength }`" text-color="white">{{ password.strength }}</v-chip>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>create</v-icon>
                <span>Edit</span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="getPassword(password.website, password.password)" flat color="grey">
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
            <v-card-title  class="headline" > {{ this.name }} </v-card-title>
            
            <v-divider></v-divider>
  
            <v-card-text  class="pass-text text-xs-center" color="grey--text" >{{ this.pass }}</v-card-text>

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
 import PasswordCreator from "@/components/passwordCreate.vue";
export default {
 components: {
   PasswordCreator
 },
  beforeCreate() {
    this.$emit("changePage", 2);
  },
  data() {
    return {
      passwords: [
        {
          website: "Google",
          password: "jeff",
          strength: "strong"
        },
        {
          website: "Facebook",
          password: "badman",
          strength: "weak"
        },
       
      ],
      page: 2,
      color: "",
      dialog: false,
      name: '',
      pass: '',
      passwordDialog: false,
    };
  },
  methods: {
    getPassword(name, password) {
      this.dialog = true
      this.name = name
      this.pass = password;
    },
    closeDialog() {
      this.passwordDialog = false
    },
       addPassword(newPassword) {
        console.log(newPassword)
       }
  },
  computed: {}
};
</script>


<style scoped>
.password-wrap {
   overflow-y: auto;
}
.pass-text {
  letter-spacing: 3px;
  font-weight: 700;
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
