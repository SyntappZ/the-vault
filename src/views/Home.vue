<template>
  <div class="home page">
    <signUp v-on:updateUser="updateUser" v-on:closeSignUpDialog="closeSignUpDialog()" :signUpDialog="signUpDialog"/>
    <v-container fluid class="contianer">
      <v-layout row wrap>
        <v-flex>
          <div class="box sign-in" v-if="userSignedIn == false">
            <v-icon color="secondary" class="lock">lock</v-icon>

            <v-container >
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
            <v-icon color="secondary" class="lock">lock</v-icon>

            <v-container >
              <v-layout align-center>
                <v-flex>
                <h1 class="my-4">Welcome Back {{ userName }} </h1>
                
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
                    <h3 class="display-3 white--text">Welcome To The Vault</h3>

                    <span class="subheading">
                      Create and store strong passwords and never have to worry about
                      forgetting them, you will get a strength check on your password or you can use the password generator and automatically get a strong password.
                    </span>

                    <v-divider class="my-5"></v-divider>

                    <div class="title mb-3">Create password now!</div>

                    <v-btn flat round class="my-3 primary" large>create</v-btn>
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
      if(user) {
        this.userSignedIn = true;
      if(this.userName === '') {
        this.userName = user.displayName
      }
       
      }else{
        this.userSignedIn = false;
       
        console.log('user logged out!')
        
      }
    })
   
    
  
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
      userName: ''
     
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
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
       

        // this.email = '';
        // this.password = '';
    },
    signOut() {
     
      firebase.auth().signOut()
     
    },
    updateUser(name) {
      
     this.userName = name.charAt(0).toUpperCase() + name.slice(1)
     this.$emit('updateUser', name)
    }

  },

  computed: {
    emailErrors() {
      let regex = new RegExp(/@/);

      if (this.email.length > 0 && regex.test(this.email) === false) {
        return "Email not valid";
      }
    },
    passwordErrors() {
      if (this.password.length > 0 && this.password.length < 6) {
        return "To short";
      }
    },
   
  }
};
</script>

<style scoped>
.sign-in {
  width: 500px;
  height: 70vh;
  margin: 25vh auto 0 150px;
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
}
@media screen and (min-height: 800px) {
  .sign-in {
    margin: 25vh auto 0 250px;
  }
  .welcome {
    margin: 150px auto;
  }
}
</style>

