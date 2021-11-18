<template>
  <div id="app">
    <nav class="main-nav">
      <h1>TurboMail 🚀</h1>
      <!--<router-link to="/" class="nav-link" active-class="active" exact>Home</router-link>
      <router-link to="/about" class="nav-link" active-class="active">About</router-link>-->
      <div class="ms-auto" @click="logout">
        <i class="fas fa-sign-out-alt"></i>
      </div>
    </nav>    
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'App',  
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
})
</script>

<style lang="scss">
@import '~normalize.css/normalize.css';
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,500;0,900;1,400&display=swap');
@import '~@fortawesome/fontawesome-free/css/all.min.css';
@import '~@/assets/colors';
@import '~@/assets/mixin';

// helpers
.form-control {
  display: block;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid rgba($color: #333, $alpha: .3);
  font-size: .9rem;
  width: calc(100% - 20px);
  border-radius: 3px;
}

.d-flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.justify-content-center {
  justify-content: center;
}

.h-100 {
  height: 100%;
}

.ms-auto {
  margin-left: auto;
}

.ms-2 {
  margin-left: 8px;
}

.me-auto {
  margin-right: auto;
}

.me-2 {
  margin-right: 8px;
}

.mt-1 {
  @include mt(1);
}

// buttons
.btn {
  border: none;
  background: none;
  padding: 5px 10px;
  border-radius: 3px;  
  cursor: pointer;
  //font-size: .8rem;
}

.btn-primary {
  background: $main-blue;
  color: $white;
  border: 1px solid rgba(#fff, .1);

  &:hover {
    background: rgba($main-blue, .8);
  }
}

.btn-secondary {
  @extend .btn-primary;
  background: $white;
  color: $text-color;
  border: 1px solid rgba($text-color, .1);

  &:hover {
    color: #fff;
  }
}

// main style
html, body {
  height: 100%;
  margin: 0;
}
body {
  font-family: Roboto;
  font-size: 16px;
  color: $text-color;
}
#app {
  height: 100%;  
  display: flex;
  flex-direction: column;
}
.main-nav {  
  background: $main-blue;
  display: flex;
  align-items: center;
  padding: 10px;
  color: #fff;
  h1 {
    font-weight: 100;
    margin: 0;
    margin-right: 2rem;
  }
  a {
    color: #fff;
    text-decoration: none;
    margin: 0 10px 0 10px;
  }
  .active {
    font-weight: 900;
  }
}
</style>
