<template>
  <v-app>
     <div id="background"></div>
    <Toolbar />
    <v-content class="secondary">
      <transition name="page-animate">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue'

export default {
  name: 'App',
  components: {
   Toolbar
  },
  data () {
    return {
      
    }
  },
 
}
</script>

<style>
   #background {
    width:50%;
    height:100vh;
    position: absolute;
    background-color:#fff;
    transform: skewX(30deg);
    transition: .3s ease-in-out;
  }
  html {
    overflow-y: hidden;
  }

  .page-animate-enter-active {
    animation: coming .2s;
    animation-delay: .3s;
    opacity: 0;
  }

  .page-animate-leave-active {
    animation: going .5s;

  }
  .page {
    text-align:center;
    position: fixed;
    width:100%;
  }

@keyframes coming {
  from {
   transform: translateY(30px)
 }

 to {
   transform: translateY(0);
   opacity: 1;
 }
 }

@keyframes going {
 from {
   transform: translateX(0)
 }

 to {
   transform: translateX(50px);
   opacity: 0;
 }
}


</style>
