<template>
<nav>
     <v-toolbar color="transparent" id="nav" flat app>
    <v-toolbar-side-icon @click="drawer = !drawer" class="dark--text"></v-toolbar-side-icon>
    <v-toolbar-title class="dark--text  pl-5"  > {{ title }} </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn @click.native="changePage(0)" to="/" class="white--text" flat>
           <v-icon class="mr-2">home</v-icon>
           <span>Home</span>
      </v-btn>
      <v-btn @click.native="changePage(1)"  to="/Passwords" class="white--text" flat>
          <v-icon class="mr-2">lock</v-icon>
           <span>Vault</span>
      </v-btn>
      <v-btn @click.native="changePage(2)" to="/Notes" class="white--text" flat>
          <v-icon class="mr-2">notes</v-icon>
           <span>Notes</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>

   <v-navigation-drawer
    app
    id="third"
    dark
    temporary
    
    v-model="drawer">
     <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/default.png">
          </v-avatar>
          <p
           class="white--text subheading mt-3 text-md-center"> {{ name }} </p>
        </v-flex>
       
      </v-layout>


    <v-list>
      <v-list-tile
        v-for="page in pages"
        :key="page.title"
       router :to="page.link"
      >
        <v-list-tile-action>
          <v-icon>{{ page.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ page.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</nav>
 

  
</template>



<script>
export default {
    data() {
        return {
            title: 'Password Vault',
            pages: [
                { title: 'Home', icon: 'home', link: '/' },
                { title: 'Vault', icon: 'lock', link: '/Passwords'},
                { title: 'Notes', icon: 'note', link: '/Notes'}
            ],
            drawer: false,
            name: 'John Smith'
        }
    },
   methods: {
    changePage(num) {
      
      let background = document.querySelector('#background');
      if(this.pages[num].link === '/Passwords') {
        background.style.transform = 'skewX(0deg)'
        background.style.width = '100%'
        background.style.height = '93vh'
        background.style.marginTop = '8vh'
       
      }
      if(this.pages[num].link === '/') {
        background.style.transform = 'skewX(30deg)'
        background.style.width = '50%'
        background.style.height = '100vh'
        background.style.marginTop = '0'
       
      }
    
    }
    
   
   }
}
</script>

<style>
   #nav {
        background-color: rgb(119, 144, 160);
    }
    
</style>



