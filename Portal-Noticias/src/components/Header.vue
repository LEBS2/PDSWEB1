<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

<!Doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Home Usuário</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
  <body>

    <nav style="background-color: white !important; margin-left: 4%;" class="navbar bg-body-tertiary">
        
        <div class="container-fluid">
          <form class="d-flex" role="search">
            <RouterLink to="/loginAdmin">
            <a style="margin: 5%; margin-top: 25%; color: #030E43;" class="nav-link active" aria-current="page">Voltar</a>
            </RouterLink>
            <input style="margin-left: 5%; visibility: hidden;" id="buscar" type="search">
            
            <RouterLink style="margin: 3%; margin-left: 157%; margin-top: 5%;" class="nav-link active" to="/saude">
            <a aria-current="page">Saúde</a>
            </RouterLink>

            <RouterLink to="/esporte">
            <a style="margin: 4%; margin-top: 34%; color: #030E43;" class="nav-link active" aria-current="page" href="CategoriasView.vue">Esportes</a>
            </RouterLink>

            <RouterLink to="/sobre">
            <a style="margin: 55%; margin-top: 51%; color: #030E43" class="nav-link active" aria-current="page" href="SobreView.vue">Sobre</a>
            </RouterLink>
            <RouterLink to="/">
            <a style="margin: 165%; margin-top: 80%; color: #030E43" class="nav-link active" aria-current="page" href="SobreView.vue">Sair</a>
            </RouterLink>

        </form>
      
        </div>

        <img id="logoImage" src="../assets/LogoBoasNovas.png" alt="Logo">
        
      </nav>    

  </body>
</html>
  
</template>

<style scoped>

.formulario{
    width: 50%;
    height: 730px;
    border: 1px solid #030E43;
    border-radius: 5px;
    margin-left: 25%;
    margin-top: 5%;
    margin-bottom: 5%;
    background-color: white;
    border: white;
}

#imagemSelecionada{
    height: 60px;
}

img{
    width: 10%;
    height: 100%;
    margin-left: 42.5%;
    margin-top: -9%;
}

.form-label{
    margin-left: 12%;
    color: #030E43;
    margin-top: 2%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
}

.form-control{
    margin-left: 12%;
    width: 75%;
    height: 60px;
    border: 1px solid #030E43;
    border-radius: 5px;
    
}

.mb-4{
    margin-right: 20%;
    margin-top: 2%;
}

#UploadArquivos{
    width: 20%;
    height: 55px;
    left: 7%;
    margin-top: 12.75%;
    position: absolute;
    
}

.container-fluid{
    text-decoration: underline;
    color: #030E43;
    margin-top: 5%;
    margin-left: 0%;
    
}

.form-text{
    margin-left: 65%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    color: #030E43;
}

.form-text:hover{
    color: blue;
}

#buscar{
    height: 42px;
    margin-top: 0%;
    border-radius: 10px;
    border: 1px solid #030E43;
}

</style>