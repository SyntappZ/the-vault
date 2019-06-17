<template>
  <v-app>
    <div
      :style="{ 
      backgroundColor: this.color, 
      transform: this.skew,
      width: this.width,
      marginLeft: this.margin,
      
      }"
      id="background"
    ></div>
    <Navbar :Name="Name" :dark="dark" :nav="nav"/>

    <v-content class="secondary">
      <transition name="page-animate">
        <router-view v-on:updateUser="updateUser" v-on:changePage="updatePage($event)"></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",

  components: {
    Navbar
  },

  created() {},
  data() {
    return {
      page: 1,
      color: "#fff",
      skew: "skewX(30deg)",
      width: "50%",
      margin: "0",
      dark: true,
      nav: false,
      Name: ""
    };
  },

  methods: {
    updatePage(page) {
      if (page === 1) {
        this.color = "#fff";
        this.skew = "skewX(30deg)";
        this.width = "50%";
        this.margin = "0";
        this.dark = true;
        this.nav = false;
      }
      if (page === 2) {
        this.color = "#eee";
        this.skew = "skewX(0)";
        this.width = "100%";
        this.margin = "0";
        this.dark = false;
        this.nav = false;
      }
      if (page === 3) {
        this.color = "#eee";
        this.skew = "skewX(0)";
        this.width = "100%";
        this.margin = "0";
        this.dark = false;
        this.nav = false;
      }
    },
    updateUser(name) {
      this.Name = name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
};
</script>

<style>
#background {
  width: 50%;
  height: 100vh;
  position: absolute;
  background-color: #fff;
  transform: skewX(30deg);
  transition: 0.3s ease-in-out;
}
html {
  overflow: hidden;
}

.page-animate-enter-active {
  animation: coming 0.2s;
  animation-delay: 0.3s;
  opacity: 0;
}

.page-animate-leave-active {
  animation: going 0.3s;
}
.page {
  text-align: center;
  position: fixed;
  width: 100%;
}

@keyframes coming {
  from {
    opacity: 0;
    transform: scale(1.1);
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes going {
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    transform: scale(0.9);
    opacity: 0;
  }
}

@media screen and (min-height: 800px) {
}
</style>
