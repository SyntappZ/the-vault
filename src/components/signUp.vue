<template>
  <v-layout row justify-center>
    <v-dialog v-model="signUpDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Sign Up</span>
          <v-spacer></v-spacer>
          <v-avatar class="primary" size="70">
            <v-icon color="white" x-large>account_circle</v-icon>
          </v-avatar>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex lg12>
                <v-text-field
                  v-model="username"
                  :error-messages="usernameError"
                  label="Username"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field v-model="email" label="Email" :error-messages="emailErrors" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Password*"
                  :type="show ? 'text' : 'password'"
                  :error-messages="passwordErrors"
                  v-model="password"
                  @click:append="show = !show"
                  :append-icon="show ? 'visibility' : 'visibility_off'"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*Password must contain uppercase and number</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="closeSignUpDialog">Close</v-btn>
          <v-btn color="primary" :disabled="isDisabled" flat @click="register">Sign Up</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import firebase from "firebase";
export default {
  props: ["signUpDialog"],
  data() {
    return {
      show: false,
      username: "",
      email: "",
      password: "",
      accounts: [],
     
    };
  },
  methods: {
    closeSignUpDialog() {
     
      this.$emit("closeSignUpDialog");
      
    },

    register(e) {
      e.preventDefault();

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          user.user.updateProfile({
            displayName:
              this.username.charAt(0).toUpperCase() + this.username.slice(1)
          });
          
        });

     this.$emit('updateUser', this.username)
      this.$emit("closeSignUpDialog");
    }
  },
  computed: {
    usernameError() {
      if (this.username.length > 0 && this.username.length < 3) {
        return "3 Characters Minimum";
      }
    },
    emailErrors() {
      let regex = new RegExp(/@/);

      if (this.email.length > 0 && regex.test(this.email) === false) {
        return "Email not valid";
      }
    },
    passwordErrors() {
      let uppercase = /[A-Z]/.test(this.password);
      let numbers = /[0-9]/.test(this.password);
      let space = /[ ]/.test(this.password);
      if (this.password.length > 0) {
        if (space) {
          return "No Spaces Allowed";
        }

        if (this.password.length < 8) {
          return "To Weak";
        }

        if (!uppercase || !numbers) {
          return "To Weak";
        }
      }
    },
    isDisabled() {
      if (
        this.password.length === 0 ||
        this.email.length < 3 ||
        this.emailErrors === "Email not valid" ||
        this.passwordErrors === "To Weak" ||
        this.passwordErrors === "No Spaces Allowed" ||
        this.username.length < 3
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
</style>

