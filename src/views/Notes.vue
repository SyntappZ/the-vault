<template>
<div id="note-background">
  
  <CreateNote v-if="loaded"/>
</div>
  
</template>

<script>
import CreateNote from '../components/CreateNote'
export default {
  created() {
    this.$emit("changePage", 3);
  },
  components: {
    CreateNote
  },
  data() {
    return {
      loaded: true
    };
  },
  methods: {},
  computed: {}
};
</script>

<style scoped>
#note-background {
  width: 100%;
  height: 100vh;
  background-image: url('../background.svg');
  background-size:cover;
}
 

</style>