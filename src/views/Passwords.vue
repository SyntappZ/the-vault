<template>
  <div class="passwordPage page">
    <passwordCreator
    

      ref="edit"
      :changePassword="editOpen"
      :passwordDialog="passwordDialog"
      v-on:dialogToggle="closeDialog()"
      
    />
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
        <v-flex class="cards" xs12 sm6 md4 lg3 v-for="password in passwords" :key="password.id">
          <v-card :data-id="password.id" flat class="card text-xs-center ma-3">
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
              <v-btn @click="edit(password.id)" flat color="grey">
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
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline primary white--text">{{ this.name }}</v-card-title>
            <p class="show title primary--text text-xs-center mt-3">{{ text }}</p>

            <v-divider></v-divider>

            <v-card-text
              id="copy-pass"
              ref="input"
              class="pass-text text-xs-center"
              color="grey--text"
            >{{ this.pass }}</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn @click="doCopy" color="primary" flat="flat">
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
import PasswordCreator from "@/components/PasswordCreate.vue";
import db from "@/components/firebaseInit";
export default {
  components: {
    PasswordCreator
  },

  beforeCreate() {
    this.$emit("changePage", 2);
  },
  created() {
     db.collection("Passwords").onSnapshot(res => {
       const changes = res.docChanges();
      
      changes.forEach(change => {
        if(change.type === 'added') {
         this.passwords.push({
            ...change.doc.data(),
            id: change.doc.id
         })
         
        }
        else if(change.type === 'removed') {
           
// let card = cards.querySelector('[data-id=' + change.doc.id + ']')
this.passwords.forEach(password => {
 if(password.id === change.doc.id) {
   console.log(password.length)
  }
})
    
      
          
         
        }
      })


     })
   
  
  },

  data() {
    return {
      passwords: [],
      page: 2,
      color: "",
      dialog: false,
      name: "",
      pass: "",
      passwordDialog: false,
      text: "Password",
      editOpen: false
    };
  },
  methods: {
    getPassword(name, password) {
      this.dialog = true;
      this.name = name;
      this.pass = password;
    },
    closeDialog() {
      this.passwordDialog = false;
      this.editOpen = false;
    },
    doCopy() {
      let input = this.$refs.input;

      this.$copyText(this.pass, input);
      this.text = "Copied!";

      setTimeout(() => {
        this.text = "Password";
      }, 2000);
    },
    edit(id) {
      this.passwordDialog = true;
      this.editOpen = true;
      
      this.$refs.edit.editPassword(id);
      
    }
  },
  computed: {}
};
</script>


<style scoped>
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

@media screen and (min-height: 800px) {
}
</style>
