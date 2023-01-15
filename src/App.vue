<template>
  <div>
    <div style="background-color:#0A53DE" class=" p-2 md:p-0 md:h-12 items-center md:h-12 md:flex">
     <router-link to="/"><div class="ml-2 cursor-pointer text-2xl text-white">
      Talkfs.com
    </div></router-link>
      <div class=" flex-grow text-center text-white">
        <p>Advanced Tracking Mode if you login, so create an account ---></p>
      </div>
     <router-link to="/login"><div class="rounded-md mt-1 md:mt-0 cursor-pointer md:hover:scale-75  bg-white w-full md:w-24 flex items-center justify-center md:m-2 md:mr-2">Login</div></router-link>
     <router-link to="/signup"><div class="rounded-md mt-1 md:mt-0 cursor-pointer md:hover:scale-75 bg-white w-full md:w-24 flex items-center justify-center md:m-2 md:mr-12">Sign Up</div></router-link>
    </div>
  <router-view>

  </router-view>
  </div>
</template>


<script>

  import axios from 'axios';

  export default {
    mounted(){}
  }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
