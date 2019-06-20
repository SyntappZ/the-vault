<template>
  <div class="home page">
   
    <signUp
      v-on:updateUser="updateUser"
      v-on:closeSignUpDialog="closeSignUpDialog()"
      :signUpDialog="signUpDialog"
    />
    <v-container fluid class="contianer">
      <v-layout justify-space-around row wrap>
        <v-flex>
          <div class="box sign-in" v-if="!userSignedIn">
            <v-icon color="secondary" class="lock">lock</v-icon>

            <v-container>
              <v-layout align-center>
                <v-flex>
                  <form>
                    <v-text-field
                      v-model="email"
                      :error-messages="emailErrors"
                      label="E-mail"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      :error-messages="passwordErrors"
                      label="Password"
                      required
                      :type="show ? 'text' : 'password'"
                      @click:append="show = !show"
                      :append-icon="show ? 'visibility' : 'visibility_off'"
                    ></v-text-field>
                  </form>
                  <v-btn @click="signIn" flat round class="my-3 secondary" large>Login</v-btn>
                  <h3>
                    Don't have an account?
                    <span @click="openSignUp" class="sign-up">sign up</span>
                  </h3>
                </v-flex>
              </v-layout>
            </v-container>
          </div>

          <div class="box sign-in" v-else>
            
            <v-avatar class="avatar-wrap" size="150">
              <img class="avatar" src="/lock-default.png">
            </v-avatar>

            <v-container>
              <v-layout align-center>
                <v-flex>
                  <h1 class="my-4">Welcome Back {{ userName }}</h1>
                  <v-btn @click="signOut" flat round class="my-3 secondary" large>Sign Out</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
        </v-flex>
       
        <v-flex>
          <div class="box welcome">
            <v-responsive>
              <v-container fill-height>
                <v-layout align-center>
                  <v-flex>
                    <h3 class="mb-3 display-3 white--text">Welcome To The Vault</h3>

                    <span class="subheading font-weight-thin font-italic white--text">
                      Create and store strong passwords and never have to worry about
                      forgetting them, you will get a strength check on your password or you can use the password generator and automatically get a strong password.
                    </span>

                    <v-divider class="my-5"></v-divider>

                    <div class="white--text title mb-3">Create password now!</div>

                    <v-btn
                      :disabled="!userSignedIn"
                      @click="createPassword"
                      flat
                      round
                      class="my-3 primary"
                      large
                    >create</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-responsive>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import signUp from "@/components/SignUp.vue";
import firebase from "firebase";
export default {
  created() {
    this.$emit("changePage", 1);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userSignedIn = true;

        if (this.userName === "") {
          this.userName = user.displayName;
        }
        this.id = user.uid;
      } else {
        this.userSignedIn = false;

       
      }
    });
  },
  mounted() {
    this.$root.$on("openUp", () => {
      this.signUpDialog = true;
    });
  },

  components: {
    signUp
  },
  data() {
    return {
      email: "",
      password: "",
      signUpDialog: false,
      show: false,
      userSignedIn: false,
      userName: "",
      avatar: `https://api.adorable.io/avatars/167/`,
      id: ""
    };
  },

  methods: {
    openSignUp() {
      this.signUpDialog = true;
    },
    closeSignUpDialog() {
      this.signUpDialog = false;
    },
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password);
    },
    signOut() {
      firebase.auth().signOut();
      this.userSignedIn = false;
    },
    updateUser(name) {
      this.userName = name.charAt(0).toUpperCase() + name.slice(1);
      this.$emit("updateUser", name);
    },
    createPassword() {
      this.$router.push("/Passwords");
    }
  },

  computed: {
    emailErrors() {
      let regex = new RegExp(/@/);
      let dotCom = new RegExp(/[.]/);
      if (this.email.length > 0) {
        if (
          regex.test(this.email) === false ||
          dotCom.test(this.email) === false
        ) {
          return "Email not valid";
        }
      }
    },
    passwordErrors() {
      if (this.password.length > 0 && this.password.length < 6) {
        return "To short";
      }
    }
  }
};
</script>

<style scoped>
.sign-in {
  width: 500px;
  height: 70vh;
 
}
.welcome {
  width: 600px;
  height: 600px;
  margin: 50px auto;
}
.sign-up {
  font-weight: 300;
  padding-left: 15px;
  cursor: pointer;
}


 

.lock {
  font-size: 80px;
  width: 120px;
  height: 120px;
  border: solid 3px;
  border-radius: 50%;
  margin-top: 100px;
}
.avatar-wrap {
  margin-top:100px;
}
.avatar {
  border: black 1px solid;
  
}
@media screen and (min-height: 800px) {
}
</style>

