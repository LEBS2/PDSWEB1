<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

<!Doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Administrador</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

</head>

<body>

    <img clas style="visibility: hidden;" src="@/assets/imgFundoAdmin.jpg">


    <form class="formulario">

        <img id="logoImage" src="../assets/LogoBoasNovas.png" alt="Logo">

        <div class="mb-3">
            <label for="nome" class="form-label">Nome completo</label>
            <input type="text" class="form-control" id="nome" name="nome" required aria-describedby="nameHelp">
            <div class="invalid-feedback">
                Campo obrigatório.
            </div>
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" name="email" required aria-describedby="nameHelp">
            <div class="invalid-feedback">
                Campo obrigatório.
            </div>
        </div>

        <div class="mb-3">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" id="senha" name="senha" required aria-describedby="nameHelp">

        </div>

        <button type="submit" class="btn btn-primary" id="submit-btn">ENTRAR</button>
        <button type="submit" class="btn btn-primary" id="submit-btn2">CANCELAR</button>

    </form>

    <img clas style="visibility: hidden;" src="@/assets/imgFundoAdmin.jpg">


</body>

</html>
  
</template>

<style scoped>

body {
  background-image: url('@/assets/imgFundoAdmin.jpg');
}

.formulario{
    width: 50%;
    height: 730px;
    border: 1px solid #030E43;
    border-radius: 5px;
    margin-left: 25%;
    margin-top: -10%;
    margin-bottom: 5%;
    background-color: white;
    border: white;
}

#imagemSelecionada{
    height: 60px;
}

img{
    width: 35%;
    height: 190px;
    margin-left: 33%;
    margin-top: 7%;
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

.form-text{
    margin-left: 25%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
}

.btn-primary{
    margin-left: 16%;
    background-color: #030E43;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    width: 30%;
    height: 50px;
    border: #030E43;
    margin-top: 2%;
}

#submit-btn2{
    margin-left: 49%;
    margin-top: -11.5%;
    background-color: #D93939;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    width: 30%;
    height: 50px;
    border: #D93939;
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

.form-text:hover{
    color: blue;
}

</style>