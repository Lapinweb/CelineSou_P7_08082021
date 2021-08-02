<template>
  <Header/>

  <main class="container my-4 pb-5">
    <div class="row">
      <div class="col-12">
        <router-view></router-view>
      </div>
    </div>
  </main>

  <Footer/>
</template>

<script>
import Header from "./components/Header"
import Footer from "./components/Footer"

export default {
  name: "App",
  components: {
    Header,
    Footer
    }
}

</script>


<style lang="scss">
#app {
  min-height: 100vh;
  background: url('./assets/images/icon.png') center fixed no-repeat;
  background-size: cover;
}
</style>
