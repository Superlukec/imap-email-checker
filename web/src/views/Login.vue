<template>
    <div class="h-100 d-flex align-items-center justify-content-center login-bg">

        <div class="box-login">

            <h2 style="margin: 0">Log In</h2>

           
            <input type="text" class="form-control" v-model="username" placeholder="Username">

            
            <input type="password" class="form-control" v-model="password" placeholder="Password">

            <button class="btn btn-primary mt-1" @click="login">Log In</button>

        </div>

        
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { userService } from "../_services/user.service";

export default Vue.extend({
    
    data() {
        return {
            username: '',
            password: ''
        }
    },
    
    methods: {
        login() {

            userService.login(this.username, this.password)
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.token));
                this.$router.push('/');
            })
            .catch(error => {
                console.log(error);
            })

            /*
            axios.post('/api/login', {
                username: this.username,
                password: this.password
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })*/
        }
    }
})

</script>

<style lang="scss">

    @import '~@/assets/colors';
    @import '~@/assets/mixin';

    .login-bg {
        background: rgba($color: $main-blue, $alpha: .1)
    }

    .box-login{
        background: #fff;
        width: 250px;
        padding: 30px 60px;
        @include material-shadow($z-depth: 1);
    }
    

</style>