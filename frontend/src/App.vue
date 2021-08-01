<template>
  <header>
      <nav class="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
  </header>

  <main>
    <router-view/>
  </main>

  <footer>

  </footer>
</template>

<style lang="scss">
body {
  margin: 0;
}

#app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}

</style>
