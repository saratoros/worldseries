<template>
  <div class="wrapper">
    <h1>DISCOVER THE WORLD IN FILM</h1>
    <div class="circle" @click="start">Start</div>
  </div>
</template>

<script>

    export default {
        name: 'Home',
        props: {},
        data() {
            return {}
        }, methods: {
            start() {
              this.$router.push('browse')
            }

        }
    }
</script>


<style scoped>
  h1 {
    font-family: "Economica Bold";
    text-align: center;
  }

  .circle {
    width: 100px;
    height: 100px;
    line-height: 100px;
    border-radius: 50%;
    font-family: "Economica Bold";
    font-size: 30px;
    text-align: center;
    margin: 2em auto;
    background: #e30914;
    cursor: pointer;
  }

  .wrapper {
    margin-top: 35vh;
  }
</style>
