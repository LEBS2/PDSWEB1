<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <!Doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Página inicial</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="CSS/PaginaInicial.css">
</head>
  <body>

    <nav style="background-color: white !important;" class="navbar bg-body-tertiary">
        
        <div class="container-fluid">
          <form class="d-flex" role="search">
            <a style="margin: 5%; margin-top: 4%;" class="nav-link active" aria-current="page" href="CadNoticias.html">Voltar</a>
            <input id="buscar" type="search">
            
            <a style="margin: 3%; margin-left: 157%; margin-top: 5%;" class="nav-link active" aria-current="page" href="PaginaInicial.html">Início</a>
            <a style="margin: 4%; margin-top: 5%;" class="nav-link active" aria-current="page" href="Categorias.html">Categorias</a>
            <a style="margin: 5%;" class="nav-link active" aria-current="page" href="#">Sobre</a>


        </form>
          <a  style="margin: 5.75%;" class="nav-link active" aria-current="page" href="Login.html">Sign out</a>
          
        </div>

        <img id="logoImage" src="../assets/LogoBoasNovas.png" alt="Logo">
        
      </nav>    
    <button type="button" class="btn btn-primary" id="submit-btn2">ADICIONAR NOTÍCIAS</button>

  </body>
</html>

</template>

<style scoped>

#submit-btn2{
    margin-left: 40%;
    margin-top: 27%;
    background-color: #004AAD;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    border:#004AAD;
    width: 15%;
    height: 45px;
}

.container-fluid{
    color: #030E43;
    margin-top: -3%;
    
}

#buscar{
    height: 42px;
    margin-top: 2%;
    border-radius: 10px;
    border: 1px solid #030E43;
}

img{
    width: 10%;
    height: 100%;
    margin-left: 42.5%;
    margin-top: -13%;
}

a:hover{
    text-decoration: underline;
}

</style>
