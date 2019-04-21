<template>
  <div class="home page">
    <v-container fluid class="contianer">
      <v-layout row wrap>
        <v-flex>
          <div class="box sign-in">
             
               <v-icon color="secondary" class="lock" >lock</v-icon>
             
              <v-container>
                <v-layout align-center>
                  <v-flex>
                    <form>
                       <v-text-field
                        v-model="email"
                        :error-messages="emailErrors"
                        label="E-mail"
                        required
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        :error-messages="passwordErrors"
                        label="Password"
                        required
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                      ></v-text-field>
                     
                    </form>
                    <v-btn flat round class="my-3 secondary" large>Login</v-btn>
                    <h3>Don't have an account?<span class="sign-up">sign up</span></h3>
                    
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

                    <span class="subheading" >Create and store strong passwords and never have to worry about 
                    forgetting them, you will get a strength check on your password or you can use the password generator and automatically get a strong password.
                    </span>

                    <v-divider class="my-3"></v-divider>

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
export default {

  created() {
      this.$emit('changePage', 1)
    
  },
  components: {},
  data() {
    return {
      email: '',
      password: '',
     
    }
    
  },

  methods: {
      
 },
  
 


 computed: {
   emailErrors() {
     let regex = new RegExp(/@/)

     if(this.email.length > 0 && regex.test(this.email) === false) {
       return 'Email not valid'
     }
   },
   passwordErrors() {
     if(this.password.length > 0 && this.password.length < 6) {
       return 'To short'
     }
   },
 
 }
};
</script>

<style scoped>
.sign-in {
  width: 500px;
  height: 70vh;
  margin: 100px auto;
}
.welcome {
  width: 600px;
  height: 600px;
  margin: 50px auto;
}
.sign-up {
  font-weight: 300;
  padding-left:15px;
  cursor: pointer;
}
.lock {
  font-size: 80px;
  width:120px;
  height:120px;
  border:solid 3px;
  border-radius:50%;
}
</style>

