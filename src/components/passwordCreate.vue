<template>
  <div class="create-password">
    <v-layout row justify-center>
      <v-dialog v-model="passwordDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Add Password</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Website Name" v-model="website" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <div>
                  <v-avatar :class="strengthColor">
                    <v-icon dark>lock</v-icon>
                  </v-avatar>
                </div>

                <v-flex xs12>
                  <v-text-field
                    label="Password"
                    :type="show ? 'text' : 'password'"
                    v-model="password"
                    v-on:input="strengthChecker"
                    @click:append="show = !show"
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-btn @click="generate" class="primary" flat round>Generate</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="dialogToggle">Close</v-btn>
            <v-btn color="primary" flat>Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ["passwordDialog"],
  components: {},
  data() {
    return {
      website: "",
      password: "",
      show: false,
      strength: 0,
      color: 0
    };
  },
  methods: {
    dialogToggle() {
      this.$emit("dialogToggle");
      this.password = "";
    },
    generate() {
      let password = "",
        character;

      for (let i = 0; i < 16; i++) {
        password.indexOf(
          (character = String.fromCharCode(
            Math.floor(Math.random() * 94) + 33
          )),
          Math.floor(password.length / 94) * 94
        ) < 0;
        password += character;
      }
      this.password = password;
    },

    strengthChecker() {
      if (this.password.match(/[a-zA-Z0-9][a-zA-Z0-9]+/)) {
        this.strength += 1;
      }
      if (this.password.match(/[~<>?]+/)) {
        this.strength += 1;
      }
      if (this.password.match(/[!@£$%^&*(){}]+/)) {
        this.strength += 1;
      }
      if (this.password.length > 8) {
        this.strength += 1;
      }
      switch (this.strength) {
        case 0:
          this.color = 20;
          break;
        case 1:
          this.color = 40;
          break;
        case 2:
          this.color = 60;
          break;
        case 3:
          this.color = 80;
          break;
        case 4:
          this.color = 100;
          break;
      }
      console.log(this.color)
    }
  },

  computed: {
    strengthColor() {
      if(this.color < 60) {
        return 'red'
      }
      if(this.color > 60 && this.color < 100) {
        return 'orange'
      }
      if(this.color >= 100) {
        return 'green'
      }
    }
  }
};
</script>

<style>
</style>

 


