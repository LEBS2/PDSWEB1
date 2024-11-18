<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

<img id="logoImage" src="../assets/LogoBoasNovas.png" alt="Logo">


<button type="submit" class="btn btn-primary" id="submit-btn">ADMINISTRADOR</button>
<button style="margin-left: 4%;" type="submit" class="btn btn-primary" id="submit-btn">CLIENTE</button>

</template>

<style scoped>

#logoImage{
    width: 35%;
    height: 100%;
    margin-left: 30%;
    margin-top: 1%;
}

.btn-primary{
    margin-left: 18%;
    background-color: #004AAD;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    width: 35%;
    height: 230px;
    border: #004AAD;
    margin-top: 1%;
    color:white;
    font-size: 32px;
    border-radius: 5px;
    
}

#submit-btn2{
    margin-left: 63%;
    margin-top: 10%;
    background-color: #004AAD;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    width: 40%;
    height: 65px;
    border: #004AAD;
    color:white;
}


</style>