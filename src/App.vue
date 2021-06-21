<template>
<div class="container">
  <div id="nav" v-if="$store.getters.isAuthenticated">
    <router-link to="/">Hakkında</router-link> |
    <router-link to="/movies">Movies</router-link>|
    <router-link to="/categories"> Categories</router-link>|
    <router-link to="/addMovie">AddMovie</router-link>|
    <router-link to="/addCategory" > AddCategory</router-link>|
  </div>
  <div id="nav" v-if="!$store.getters.isAuthenticated">
   
    <router-link to="/login">Giriş Yap</router-link>|
    <router-link to="/register" > Kayıt ol</router-link>|
  </div>
  <router-view/>

</div>
  
</template>
<script>
export default({
created(){
      if(this.$store.getters.isAuthenticated)
      {
        console.log("Giriş yapıldı!");
          
      }
    
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
