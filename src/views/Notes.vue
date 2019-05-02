<template>
  <div class="notes page">
    <h1 align="center">notes</h1>
  </div>
</template>

<script>
export default {
  created() {
    this.$emit("changePage", 3);
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style scoped>



</style>