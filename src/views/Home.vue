<template>
  <div class="home page">
    <v-container fluid class="contianer">
      <v-layout row wrap>
        <v-flex>
          <div class="box sign-in">
             <v-responsive>
               <v-icon color="secondary" class="lock" >lock</v-icon>
             
              <v-container fill-height>
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
            </v-responsive>
          </div>
        </v-flex>
        <v-flex>
          <div class="box welcome">
            <v-responsive>
              <v-container fill-height>
                <v-layout align-center>
                  <v-flex>
                    <h3 class="display-3 white--text">Welcome to the vault</h3>

                    <span class="subheading" >
                    Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, 
                    ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare
                     assueverit ex eum, ne nam essent vocent admodum.</span>

                    <v-divider class="my-3"></v-divider>

                    <div class="title mb-3">Check out our newest features!</div>

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
  components: {}
};
</script>

<style scoped>
.sign-in {
  width: 500px;
  height: 60vh;
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

