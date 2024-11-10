<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>

<!Doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>

    <form class="formulario">

        <img id="logoImage" src="../assets/LogoBoasNovas.png" alt="Logo">

        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" name="email" required aria-describedby="nameHelp">
            <div class="invalid-feedback">
                Campo obrigatório.
            </div>
        </div>

        <button type="submit" class="btn btn-primary" id="submit-btn">CONTINUAR</button>
        <div id="nameHelp" class="form-text">Não tem conta?  <u>Crie sua conta</u></div>

        <hr class="linha1"> <hr class="linha2">

        <p class="paragrafo">OU</p>

        <button type="submit" class="btn btn-primary" id="submit-btn2">Continuar com o <b>facebook</b></button>

        <img class="facebook" src="../assets/ícone-do-logotipo-de-facebook.webp">
        
        <button type="submit" class="btn btn-primary" id="submit-btn2">Continuar com o <b>Google</b></button>

        <img class="facebook" src="../assets/google.jpg">
        
        <button type="submit" class="btn btn-primary" id="submit-btn2">Continuar com o <b>Apple</b></button>

        <img class="facebook" src="../assets/apple_logo_icon.webp">
       
    </form>

</body>

</html>
 
</template>

<style scoped>

.formulario{
    width: 50%;
    height: 895px;
    border: 1px solid #030E43;
    border-radius: 5px;
    margin-left: 25%;
    margin-top: 5%;
    margin-bottom: 5%;
    
}

#imagemSelecionada{
    height: 60px;
}

img{
    width: 35%;
    height: 250px;
    margin-left: 33%;
    margin-top: 4%;
}

.form-label{
    margin-left: 12%;
    color: #030E43;
    margin-top: -2%;
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

.form-text{
    margin-left: 32.75% !important;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    margin-top: 2%;
    font-size: 16px;
}

.btn-primary{
    margin-left: 34%;
    background-color: #356FB5;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    width: 30%;
    height: 50px;
    border: #030E43;
    margin-top: 2%;
}

#submit-btn2{
    margin-left: 22%;
    margin-top: 2.5%;
    background-color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    width: 55%;
    height: 60px;
    border: 1px solid #030E43;
    color: #030E43;
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
    margin-top: 0%;
    
}

.form-text{
    margin-left: 65%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    color: #030E43;
}

.linha1{
    width: 32%;
    margin-left: 12%;
    margin-top: 5%;
}

.linha2{
    width: 32%;
    margin-left: 55%;
    margin-top: -2.5%;
}

.paragrafo{
    margin-left: 47.75%;
    margin-top: -4%;
    text-align: justify;
}

.facebook{
    width: 5%;
    height: 35px;
    margin-left: 26.5%;
    margin-top: -13%;
    text-align: center;
}

</style>
