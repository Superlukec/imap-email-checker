<template>
  <div class="home-page">
    <div class="box">
      <h2>Dobro jutro!</h2>
      <div>Imate 3 neprebrana sporočila</div>    
      <Messages />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Messages from '@/components/Messages.vue'; // @ is an alias to /src

@Component({
  components: {
    Messages,
  },
})
export default class Home extends Vue {
}
</script>

<style lang="scss">

  @import '~@/assets/mixin';

  .home-page {
    flex-grow: 1;
    background-image: url('~@/assets/bg1.jpg');
    background-size: cover;
  }

  .box {
    background: white;  
    @include material-shadow($z-depth: 1);
    padding: 10px;
    margin: 10px;
  }

  h2 {
      font-weight: 400;
  }

  
</style>
