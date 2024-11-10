<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
import Cards from '@/components/Cards.vue';

</script>

<template>

    <Header/>

    <Cards/>

    <button type="button" class="btn btn-primary" id="submit-btn2">ADICIONAR NOTÍCIAS</button> 
  
</template>

<style scoped>

#submit-btn2{
    margin-left: 43%;
    margin-top: 3%;
    background-color: #004AAD;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    border:#004AAD;
    width: 15%;
    height: 45px;
    margin-bottom: 2%;
}

</style>
