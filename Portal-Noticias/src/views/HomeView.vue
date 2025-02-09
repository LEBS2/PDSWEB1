<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

<body>

<img id="logoImage" src="../assets/logoNova.png" alt="Logo">
  
<RouterLink to="/loginAdmin">
<button style="margin-left: 4%;" type="submit" class="btn-primary"><p style="margin-left: 25%;">ADMINISTRADOR</p></button>
</RouterLink>

<RouterLink to="/login">
<button style="margin-left: 4%; text-align: center;" type="submit" class="submit-btn"><p>CLIENTE</p></button>
</RouterLink>

</body>

</template>

<style scoped>
body{
    background-color: #294e5b;
    height: 660px; 
}

p{
    margin-left: 35%;
    font-size: 20px;
    margin-top: 7%;
    decoration: underline;
}

#logoImage{
    background-color: #294e5b;
    background-image: url('../assets/logoNova.png');
    background:no-repeat;
    width: 50%;
}

.btn-primary{
    margin-left: 60% !important;
    background-color: #294e5b;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    width: 27%;
    height: 80px;
    border: 1px solid white;
    margin-top: -32%;
    color:white;
    font-size: 32px;
    border-radius: 5px;
    display: flex
    
}

.submit-btn{
    margin-left: 60% !important;
    background-color: #294e5b;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    width: 27%;
    height: 80px;
    border: 1px solid white;
    margin-top: 5%;
    color:white;
    font-size: 32px;
    border-radius: 5px;
    display: flex
    
}




</style>