<!-- Page annotation -->
<template>
  <div>
    <h2>{{iid}}</h2>
  </div>
</template>

<script>
export default {
  name:"detail",
  data(){
    return {
      iid: null
    }
  },
  created(){
    this.iid=this.$route.params.iid
  }
}
</script>

<style  scoped>

</style>
