<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

<!Doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Usuário</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
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
        <img style="visibility: hidden;" id="logoImage" src="../assets/1.png" alt="Logo">
        
      </nav>    

    <div class="formulario">

        <img id="logoImage" src="../assets/1.png" alt="Logo">

        <h1 style="margin-left: 4%; margin-top: 3%;">SOBRE NÓS</h1>

        <p style="margin-left: 4%;">O site foi idealizado por dois jovens do Instituto Federal de <br> Pernambuco 
Campus Palmares com o intuito de criar uma ferramenta informativa, contento 
informações sobre esportes, economia e saúde. </p>

     </div>

     <form id="sobreNos">
        <img  id="sobreNos" src="../assets/imgFundoAdmin.jpg">

        <h1 style="margin-left: 4%; margin-top: -42%; color: white;">QUEM SOMOS?</h1>

        <img style="width: 17%; margin-left: 40%; height: 210px; border-radius: 50%; margin-top: 2%;" src="../assets/WhatsApp Image 2024-11-18 at 03.43.26.jpeg">

<p style="text-align: center; margin-left: -2%; margin-top: 2%; color: white;">Andrielly Firmino de Lima, estudante <br> do curso superior tecnólogo em  <br>  Análise e Desenvolvimento de  <br> Sistemas do IFPE Campus Palmares</p>


     </form>


     <div style="display: flex; justify-content: space-evenly; align-items: center; padding: 40px 10%; background-color: white; color: #333;">

<!-- Redes sociais -->
<div style="text-align: center;">
  <img class="logoCartoes" src="https://static.vecteezy.com/ti/vetor-gratis/p1/14414683-logotipo-preto-do-instagram-em-fundo-transparente-gratis-vetor.jpg" style="width: 30px; height: 30px;">
  <p style="font-size: 14px; margin-top: 8px;">boas.novas</p>
</div>

<div style="text-align: center;">
  <img class="logoCartoes" src="https://cdn-icons-png.flaticon.com/512/2111/2111774.png" style="width: 30px; height: 30px;">
  <p style="font-size: 14px; margin-top: 8px;">boas_novas</p>
</div>

<div style="text-align: center;">
  <img class="logoCartoes" src="https://cdn3.iconfinder.com/data/icons/social-media-2527/24/glyph_facebook_facebook_logo_logo_logotype_letter_f_social_media_social_media-512.png" style="width: 30px; height: 30px;">
  <p style="font-size: 14px; margin-top: 8px;">(81) 9.9021-3218</p>
</div>

</div>


</body>

</html>
  
</template>

<style scoped>

*{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.formulario{
    width: 50%;
    height: 350px;
    margin-left: 25%;
    margin-top: 8%;
    margin-bottom: 5%;
    background-color: white;
    border: 1px solid #030E43;

}

#logoImage{
    width: 30%;
    height: 200px !important;
    margin-left: 35%;
    margin-top: -15%;
    border: 1px solid #030E43;
    border-radius: 50%;
    height: 270px;

}

.container-fluid{
    text-decoration: underline;
    color: #030E43;
    margin-top: 0%;
    
}

#sobreNos{
    width: 100%;
    height: 550px;
    margin-left: 0%;
    margin-top: 5%;
    margin-bottom: 5%;
    border-radius: 2%;
}

.logoCartoes{
    width: 5%;
    height: 70px;
    margin-left: 18%;
    margin-top: 5%;
}

</style>