<template>
  <div class="home page">
    <v-container fluid class="contianer">
      <v-layout row wrap>
        <v-flex>
          <div class="box sign-in"></div>
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

                    <v-btn flat round class="my-3 primary" large>See more</v-btn>
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
  border: solid 1px #000;
  margin: 100px auto;
}
.welcome {
  width: 600px;
  height: 600px;
  margin: 50px auto;
}
</style>

