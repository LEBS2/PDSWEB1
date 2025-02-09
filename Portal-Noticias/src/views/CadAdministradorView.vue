<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import DAOService from '@/services/DAOService';

const dbService = new DAOService('administrador');

const nome = ref('');
const email = ref('');
const senha = ref('');

const addAdmin = async () => {
    const admin = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    };

    const id = await dbService.insert(admin);
    alert('Administrador cadastrado com sucesso!')
    console.log(id);
};

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

        <img id="logoImage" src="../assets/1.png" alt="Logo">

        <div class="mb-3">
            <label for="nome" class="form-label">Nome completo</label>
            <input type="text" class="form-control" id="nome" name="nome" v-model="nome" required aria-describedby="nameHelp">
            <div class="invalid-feedback">
                Campo obrigatório.
            </div>
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" name="email" v-model="email" required aria-describedby="nameHelp">
            <div class="invalid-feedback">
                Campo obrigatório.
            </div>
        </div>

        <div class="mb-3">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" id="senha" name="senha" v-model="senha" required aria-describedby="nameHelp">

        </div>

        <RouterLink to="/PaginaInicial">
        <button type="submit" @click="addAdmin()" class="btn btn-primary" id="submit-btn">CADASTRAR</button>
        </RouterLink>

        <RouterLink to="/">
        <button type="submit" class="btn btn-primary" id="submit-btn2">CANCELAR</button>
        </RouterLink>
    
    </form>

    <img clas style="visibility: hidden;" src="@/assets/imgFundoAdmin.jpg">


</body>

</html>
  
</template>

<style scoped>
   body {
      background-color: #f2f2f2 !important;
  }

  .formulario {
      width: 40%;
      height: 800px;
      border: 1px solid black !important;
      border-radius: 5px;
      margin-left: 32%;
      margin-top: -16%;
      margin-bottom: 5%;
      background-color: #f2f2f2;
      border: #f2f2f2;
  }
  
  #imagemSelecionada {
      height: 60px;
  }
  
  img {
      width: 45%;
      height: 250px;
      margin-left: 28%;
      margin-top: 5%;
  }
  
  .form-label {
      margin-left: 12%;
      color: #030E43;
      margin-top: 2%;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: normal;
  }
  
  .form-control {
    background-color: #f2f2f2;
      margin-left: 12%;
      width: 75%;
      height: 60px;
      border: 1px solid black;
      border-radius: 5px;
      margin-top: 2%;
  }
  
  .mb-4 {
      margin-right: 20%;
      margin-top: 2%;
  }

  .mb-3 {
      margin-top: 2%;
  }
  
  .form-text {
      margin-left: 25%;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: normal;
  }
  
  .btn-primary {
      margin-left: 18%;
      background-color: #294e5b;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: normal;
      font-size: 16px;
      width: 30%;
      height: 60px;
      border-radius: 0.5cap;
      border: 1px solid #294e5b;
      margin-top: 3%;
  }
  
  #submit-btn2 {
    margin-left: 5%;
      background-color: #bf732f;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: normal;
      font-size: 16px;
      width: 30%;
      height: 60px;
      border-radius: 0.5cap;
      border: 1px solid #bf732f;
      margin-top: 3%;
  }
  
  #UploadArquivos {
      width: 20%;
      height: 55px;
      left: 7%;
      margin-top: 12.75%;
      position: absolute;
  }
  
  .container-fluid {
      text-decoration: underline;
      color: #030E43;
      margin-top: 0%;
  }
  
  .form-text {
      margin-left: 65%;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: normal;
      color: #030E43;
  }
  
  .form-text:hover {
      color: blue;
  }
  </style>