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

    <nav style="background-color: white !important; margin-left: 0%" class="navbar bg-body-tertiary">
        
        <div class="container-fluid">
          <form class="d-flex" role="search">
          <RouterLink style="margin: 7%; margin-left: 600%; margin-top: 12%; display: flex;" class="nav-link active" to="/saude">
            <a aria-current="page">Saúde</a>
            </RouterLink>

            <RouterLink to="/esporte">
            <a style="margin: 4%; margin-top: 34%; color: #030E43;" class="nav-link active" aria-current="page">Esportes</a>
            </RouterLink>

            <RouterLink to="/sobre">
            <a style="margin: 55%; margin-top: 51%; color: #030E43" class="nav-link active" aria-current="page">Sobre</a>
            </RouterLink>
            <RouterLink to="/">
            <a style="margin: 165%; margin-top: 80%; color: #030E43" class="nav-link active" aria-current="page">Sair</a>
            </RouterLink>

            </form>

        </div>

        <img id="logoImage" src="../assets/LogoBoasNovas.png" alt="Logo">
        
      </nav>    


      <nav style="background-color: #356AAF !important; height: 94px; margin-top: -2%" class="navbar bg-body-tertiary">
        
        <div style="margin-top: -0.5%; color: white; margin-left: -6.5%;" class="container-fluid">
          <form class="d-flex" role="search">
            <input style="visibility: hidden;" id="buscar" type="search">
            
            <a style="margin: 3%; margin-left: 157%; margin-top: 5%;" class="nav-link active" aria-current="page" href="#saudeMental">SAÚDE MENTAL</a>
            <a style="margin: 4%; margin-top: 5%;" class="nav-link active" aria-current="page" href="#vidaFitness" >VIDA FITNESS</a>
            <a  style="margin: 5%;" class="nav-link active" aria-current="page" href="#bemEstar" >BEM-ESTAR</a>

       
        </form>
          
        </div>
        
      </nav>    

      <h1 style="text-align: center; margin-top: 7%; color: #092553;">SAÚDE</h1>


      <h1 style="margin-left: 5.5%; margin-top: 5%; text-decoration: underline;" id="saudeMental">SAÚDE MENTAL</h1>

<div class="card mb-3" style="max-width: 1100px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="../assets/saude_mental.jpg"  id="imgCategorias" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h1 class="card-title">TÍTULO</h1>
        <p class="card-text">DESCRIÇÃO,DESCRIÇÃO,DESCRIÇÃO,DESCRIÇÃO,
DESCRIÇÃO,DESCRIÇÃO,DESCRIÇÃO,DESCRIÇÃO,
DESCRIÇÃO,DESCRIÇÃO,DESCRIÇÃO,DESCRIÇÃO,
DESCRIÇÃO,DESCRIÇÃO,DESCRIÇÃO,DESCRIÇÃO,
DESCRIÇÃO,DESCRIÇÃO,DESCRIÇÃO,DESCRIÇÃO,</p>
      </div>
    </div>
  </div>
</div>

<h1 style="margin-left: 42%; margin-top: 7%; text-decoration: none; color: black;" id="vidaFitness">VIDA FITNESS</h1>

<div style="margin-left: 9%; margin-top: 4%;" class="row row-cols-1 row-cols-md-2 g-4">
  <div class="col">
    <div class="card">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgMnMrDJUFnhY0E_ez6JPHxnTc5nVvpJIN6g&s" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgMnMrDJUFnhY0E_ez6JPHxnTc5nVvpJIN6g&s" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>

  <h1 style="margin-left: 35.5%; margin-top: -12%; text-decoration: none; color: black;" id="saudeMental">BEM-ESTAR</h1>

  <div class="col">
    <div class="card">
      <img src="https://www.singularpharma.com.br/wp-content/uploads/2023/03/mulher-bonita-sorridente-bebendo-agua-em-garrafa-fazendo-esportes-de-manha-no-parque-scaled.jpg.webp" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
        <img src="https://www.singularpharma.com.br/wp-content/uploads/2023/03/mulher-bonita-sorridente-bebendo-agua-em-garrafa-fazendo-esportes-de-manha-no-parque-scaled.jpg.webp" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div>

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

#logoImage{
    width: 20%;
    height: 0%;
    margin-top: -15%;
    margin-left: 3%;
    display: flex;
}
.container-fluid{
    text-decoration: underline;
    color: #030E43;
    margin-top: 4%;
    
}

#imgCategorias{
    max-width: 500px;
    height: 350px;
    border-radius: 3%;
}
.mb-3{
    margin-left: 5%;
    height: 350px;
    margin-top: 2%;
    border: none;
}

.card-body{
    margin-left: 24%;
    margin-top: 7%;
}

.card-text{
    margin-top: 3%;
}

.col{
    width: 27%;
    height: 700px;
    margin-left: 12%;
}


</style>