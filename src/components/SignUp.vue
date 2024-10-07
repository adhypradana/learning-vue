<template>
    <img class="logo" src="../assets/logo.png"/>
    <h1>Welcome to Gensentials</h1>
    <h1>Don't have account?</h1>
    <h1><a>Sign Up Here</a></h1>
    <div class="register">
        <input v-model="name" type="text" placeholder="Enter your first name" style="text-align: center"/>
        <input v-model="email" type="text" placeholder="Enter your email" style="text-align: center"/>
        <input v-model="phone" type="text" placeholder="Enter your phone number" style="text-align: center"/>
        <button><b>Sign Up</b></button>

    </div>
</template>
<script setup>
import{ref} from "vue"
const name=ref('')
</script>

<style>
.logo{
    width:400px
}
.register input{
    width: 180px;
    height: 5px;
    padding: 15px;
    display: block;
    margin-bottom: 10px;
    margin-right: auto;
    margin-left: auto;
    border: 2px solid gray;
}
.register button {
    width: 160px;
    height: 30px;
    border: 2px solid grey;
    background: #686868;
    color: white;
    cursor: pointer;
}
.button{
    text-align: center;
    
}
</style>