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
    <Navbar :Name="Name" />

    <v-content class="background-img">
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
      skew: "skewX(0)",
      width: "",
      margin: "",
      Name: ""
    };
  },

  methods: {
    updatePage(page) {
      if (window.innerWidth <= 1024) {
        if (page === 1) {
          this.color = "rgba(255, 255, 255, 0.725)";
          this.skew = "skewX(30deg)";
          this.width = "0%";
          this.margin = "0";
        }
      } else {
        if (page === 1) {
          this.color = "rgba(255, 255, 255, 0.725)";
          this.skew = "skewX(30deg)";
          this.width = "70%";
          this.margin = "-300px";
        }
      }

      if (page === 2) {
        this.color = "rgba(255, 255, 255, 0.725)";
        this.skew = "skewX(0)";
        this.width = "100%";
        this.margin = "0";
      }
      if (page === 3) {
        this.color = "rgba(255, 255, 255, 0.725)";
        this.skew = "skewX(0)";
        this.width = "100%";
        this.margin = "0";
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
  width: 0;
  height: 100vh;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  transform: skewX(0);
  transition: 0.3s ease-in-out;
}
html {
  overflow: hidden;
}
.background-img {
  background: url("/bg.jpg");
  background-size: cover;
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

@media (max-height:  800px) {
  html {
    overflow-y: auto;
  }
}
</style>
