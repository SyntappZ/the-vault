<template>
  <nav>
    <v-toolbar :style="{color: this.colorChange}" color="transparent" id="nav" flat app>
      <v-toolbar-side-icon :dark="nav" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="pl-5">
        THE
        <span class="vault">VAULT</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/" flat :dark="dark">
          <v-icon small class="mr-1">home</v-icon>
          <span class="font-weight-light">Home</span>
        </v-btn>
        <v-btn to="/Passwords" :dark="dark" flat>
          <v-icon small class="mr-1">lock</v-icon>
          <span class="font-weight-light">Passwords</span>
        </v-btn>
        <v-btn to="/Notes" :dark="dark" flat>
          <v-icon small class="mr-1">notes</v-icon>
          <span class="font-weight-light">Notes</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer app id="third" dark temporary v-model="drawer">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/default.png">
          </v-avatar>
          <p class="white--text subheading mt-3 text-md-center">{{ userName }}</p>
        </v-flex>
        <v-flex v-if="userSignedIn == false">
          <v-btn @click="opened" flat round>
            <span>Sign Up</span>
          </v-btn>
        </v-flex >
          <v-flex v-else>
          <v-btn @click="signOut" flat round>
            <span>Sign Out</span>
          </v-btn>
        </v-flex>
      </v-layout>

      <v-list>
        <v-list-tile v-for="page in pages" :key="page.title" router :to="page.link">
          <v-list-tile-action>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ page.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

     <v-layout column align-center>
        <v-btn class="my-4" flat round>Account details</v-btn>
       
     </v-layout>
    </v-navigation-drawer>
  </nav>
</template>



<script>
import firebase from 'firebase'
export default {
  props: ["nav", "dark", 'Name'],
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
       
        this.userSignedIn = true;

        this.userName = this.Name;
        
        if(this.userName === '') {
          this.userName = user.displayName
        }
      }else{
        this.userSignedIn = false;
        this.userName = ''
      }
    })
  },
  data() {
    return {
      pages: [
        { title: "Home", icon: "home", link: "/" },
        { title: "Passwords", icon: "lock", link: "/Passwords" },
        { title: "Notes", icon: "note", link: "/Notes" }
      ],
      drawer: false,
      userName: '',
      isLoggedIn: false,
      currentUser: false,
      userSignedIn: false
    };
  
  
  },
  methods: {
    opened() {
    if(this.$route.fullPath !== '/') {
       this.$router.push('/')
      setTimeout(() => {
        this.$root.$emit('openUp')
      }, 700);
    }else{
       this.$root.$emit('openUp')
    }
     
    
    this.drawer = false;
   
    },
   signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
      })
    }
  },
  computed: {
    colorChange() {
      return this.nav ? "#fff" : "#000";
    }
  }
};
</script>

<style>
.vault {
  font-weight: 300;
}
.nav-color {
  color: #333;
}
</style>




