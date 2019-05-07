<template>
  <div id="passwordPage" class="page">
    <passwordCreator
      ref="edit"
      :changePassword="editOpen"
      :passwordDialog="passwordDialog"
      v-on:dialogToggle="closeDialog()"
    />
    <h1 class="subheading grey--text">VAULT</h1>

    <v-container class="my-5">
      <v-layout justify-space-between>
        <v-btn @click="passwordDialog = true" class="font-weight-light" color="grey" flat round>
          <span>add password</span>
          <v-icon small>add</v-icon>
        </v-btn>

        <div>
          <v-toolbar flat class="password-counter">
           
              <v-flex ma-3>
                <v-overflow-btn :items="dropdown"  label="Show"></v-overflow-btn>
              </v-flex>
          
            <v-toolbar-title class="subheading">favorites</v-toolbar-title>

            <v-icon right color="pink">favorite</v-icon>
            <span class="pink--text">{{ favoriteCount }}</span>

            <v-divider class="ml-3" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-toolbar-title class="subheading">Passwords</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-avatar size="35" class="green white--text ml-4 ma-2">{{ this.strong }}</v-avatar>
            <v-avatar size="35" class="orange white--text ma-2">{{ this.medium }}</v-avatar>
            <v-avatar size="35" class="red white--text ma-2">{{ this.weak }}</v-avatar>
          </v-toolbar>
        </div>
      </v-layout>
      <v-divider class="my-3"></v-divider>
      <v-layout id="cards" row wrap>
        <v-flex class="cards" xs12 sm6 md4 lg3 v-for="password in passwords" :key="password.id">
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2}`"
              flat
              class="card text-xs-center ma-3"
            >
              <v-flex xs12 sm3>
                <v-btn
                  @click="isFavorite(password.id, password.favorite)"
                  flat
                  icon
                  :color="password.favorite"
                >
                  <v-icon>favorite</v-icon>
                </v-btn>
              </v-flex>
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
                <v-btn
                  @click="edit(password.id, password.website, password.password)"
                  flat
                  color="grey"
                >
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
          </v-hover>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline primary white--text">{{ this.name }}</v-card-title>
            <p class="show subheading title black--text text-xs-center mt-3">{{ text }}</p>

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
  mounted() {},
  updated() {},
  created() {
    db.collection("Passwords").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === "added") {
          this.passwords.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        } else if (change.type === "modified") {
          this.passwords.map(password => {
            if (password.id === change.doc.id) {
              password.website = change.doc.data().website;
              password.password = change.doc.data().password;
              password.strength = change.doc.data().strength;
              password.favorite = change.doc.data().favorite;
            }
          });
        } else if (change.type === "removed") {
          let removedPassword = this.passwords.filter(
            password => password.id != change.doc.id
          );

          this.passwords = removedPassword;
        }
      });
    });
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
      editOpen: false,
      updateID: "",
      dropdown: [
        { text: "All", callback: () => console.log("list") },
        { text: "Favorites", callback: () => console.log("favorite") }
      ]
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
    edit(id, website, password) {
      this.passwordDialog = true;
      this.editOpen = true;
      this.$refs.edit.editPassword(id, website, password);
      this.updateID = id;
    },
    isFavorite(favoriteID, favoriteColor) {
      this.$refs.edit.changeFavorite(favoriteID, favoriteColor);
    }
  },
  computed: {
    strong() {
      return this.passwords.filter(password => password.strength === "strong")
        .length;
    },
    medium() {
      return this.passwords.filter(password => password.strength === "medium")
        .length;
    },
    weak() {
      return this.passwords.filter(password => password.strength === "weak")
        .length;
    },
    favoriteCount() {
      return this.passwords.filter(password => password.favorite === "pink")
        .length;
    }
  }
};
</script>


<style scoped>
.pass-text {
  letter-spacing: 3px;
  font-weight: 700;
}
.password-counter {
  border-radius: 50px;
  background-color: rgb(255, 255, 255);
}
#cards {
  background-color: rgb(233, 233, 233);
}
#passwordPage {
  overflow-y: auto;
  height: 100vh;
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
