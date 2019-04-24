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
                  <v-progress-circular
                    :rotate="360"
                    :size="100"
                    :width="15"
                    :value="scorePassword"
                    :color="color"
                  >{{ strength }}</v-progress-circular>
                </div>

                <v-flex xs12>
                  <v-text-field
                    label="Password"
                    :type="show ? 'text' : 'password'"
                    v-model="password"
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
            <v-btn color="primary" flat @click="addPassword" :disabled="isDisabled">Add</v-btn>
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
      value: 0,
      passwordDetails: []
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

      for (let i = 0; i < 20; i++) {
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
    addPassword() {
      this.passwordDetails.push({website: this.website, password: this.password, strength: this.strength.toLowerCase()})
      this.website = '';
      this.password = '';
      
       this.$emit("addPassword", this.passwordDetails);
      
    }
  },

  computed: {
    scorePassword() {
      let score = 0;
      if (this.password === "") return score;

      let letters = {};

      for (let i = 0; i < this.password.length; i++) {
        letters[this.password[i]] = (letters[this.password[i]] || 0) + 1;
        score += 5.0 / letters[this.password[i]];
      }
      let variations = {
        digits: /\d/.test(this.password),
        lower: /[a-z]/.test(this.password),
        upper: /[A-Z]/.test(this.password),
        special: /\W/.test(this.password)
      };

      let variationsCount = 0;
      for (let check in variations) {
        variationsCount += variations[check] === true ? 1 : 0;
      }
      score += (variationsCount - 1) * 10;

      return parseInt(score);
    },

    strength() {
      if (this.scorePassword < 50) {
        return "Weak";
      } else if (this.scorePassword >= 50 && this.scorePassword < 100) {
        return "Medium";
      } else {
        return "Strong";
      }
    },
    color() {
      if (this.strength === "Weak") {
        return "red";
      } else if (this.strength === "Medium") {
        return "orange";
      } else {
        return "green";
      }
    },
    isDisabled() {
      return this.password.length > 3 && this.website.length > 2 ? false : true;
    }
  }
};
</script>

<style>
</style>

 


