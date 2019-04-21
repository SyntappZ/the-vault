<template>
  <div class="passwords page">
    <h1 class="subheading grey--text">VAULT</h1>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="password in passwords" :key="password.name">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100">
                <img :src="password.img">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ password.name }}</div>
              <v-divider class="my-3"></v-divider>
              <div class="grey--text">{{ password.strength }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>create</v-icon>
                <span>Edit</span>
              </v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>add</v-icon>
                <span>Show</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  
  beforeCreate() {
      this.$emit('changePage', 2)
    
  },
  data() {
    return {
      passwords: [
        {
          name: "google",
          password: "jeff",
          strength: this.strength,
          img: "/lock-default.png"
        }
      ],
      strength: "",
      page: 2,
      color: 'red'
     
    };
  },
  methods: {
    
  },
  computed: {}
};
</script>
