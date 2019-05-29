<template>
  <div class="notes page">
    <div class="wrap">
      <div class="notes-list">
       <div>
        
          
   
    
   

    <v-btn flat @click="create">create</v-btn>
    
 
       </div>
      </div>


      <div class="notes-area">
     
  <v-container class="note" fluid grid-list-md>
    <form>
       <v-text-field
      v-model="title"
      label="Title"
      data-vv-name="name"
      required
    ></v-text-field>
    <h3 class="text-lg-right pb-3 font-weight-thin">
      <v-icon>date_range</v-icon>
      {{ date }}
      </h3>
       
      
   
    <v-divider></v-divider>
      <v-textarea
  
      name="input-7-1"
      
      label="Note"
      flat
      auto-grow
      value=""
    ></v-textarea>
    </form>
  </v-container>
    
  

      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$emit("changePage", 3);
  },
  components: {},
  data() {
    return {
      title: '',
      
    };
  },
  methods: {
      create() {

      }
  },
  computed: {
    date() {
      let today = new Date();
      let date = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear() 
      
        return date
    }
  }
};
</script>

<style scoped>
  .wrap {
    
    width:100%;
    height:100vh;
    display:flex;
    justify-content: space-around;
  }
  .notes-list {
    width:20%;
    height: 100vh;
    background-color: rgb(32, 32, 32);
  }
  .notes-area {
    
    width:80%;
    height: 100vh;
    border-radius: 5px;
  }
  .note {
    margin-top:100px;
    width:60%;
    background-color:#fff;
    height:80vh;
    border-radius:10px;

  }
 

</style>