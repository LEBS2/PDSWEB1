<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DAOService from '@/services/DAOService'

// Inicializando o serviço com a coleção de administradores
const dbService = new DAOService('administrador')
const router = useRouter()

// Definindo as variáveis reativas para e-mail e senha
const email = ref('')
const senha = ref('')

const loginAdmin = async () => {
  try {
    // Usando a referência diretamente sem a necessidade do método getCollection
    const querySnapshot = await dbService.search('email', email.value);

    // Log para verificar o resultado da consulta
    console.log('Resultado da consulta:', querySnapshot);

    // Caso não encontre o e-mail
    if (querySnapshot.length === 0) {
      alert("E-mail não encontrado.");
      return;
    }

    // Recuperando o administrador encontrado
    const admin = querySnapshot[0];

    // Log do administrador encontrado para verificação
    console.log('Administrador encontrado:', admin);

    // Verificando a senha
    if (admin.senha === senha.value) {
      alert("Login bem-sucedido!");
      router.push("/PaginaInicial"); // Redireciona para a página inicial após sucesso
    } else {
      alert("Senha incorreta.");
    }
  } catch (error) {
    // Exibe o erro no console para diagnóstico
    console.error("Erro ao tentar autenticar: ", error);
    alert("Erro ao tentar fazer login. Tente novamente.");
  }
}

</script>

<template>
  <!DOCTYPE html>
  <html lang="pt-BR">

  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Login de Administrador</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>

  <body>

      <img class style="visibility: hidden;" src="@/assets/imgFundoAdmin.jpg">

      <form class="formulario">
          <img id="logoImage" src="../assets/LogoBoasNovas.png" alt="Logo">

          <!-- Campo de E-mail -->
          <div class="mb-3">
              <label for="email" class="form-label">E-mail</label>
              <input type="email" class="form-control" id="email" name="email" v-model="email" required aria-describedby="nameHelp">
              <div class="invalid-feedback">
                  Campo obrigatório.
              </div>
          </div>

          <!-- Campo de Senha -->
          <div class="mb-3">
              <label for="senha" class="form-label">Senha</label>
              <input type="password" class="form-control" id="senha" name="senha" v-model="senha" required aria-describedby="nameHelp">
          </div>

          <a style="margin-left: 65%; font-size: 14px;" href="#">Esqueceu a senha?</a>

          <!-- Botão Entrar -->
          <button type="button" @click="loginAdmin" class="btn btn-primary" id="submit-btn">ENTRAR</button>

          <!-- Botão Cancelar -->
          <RouterLink to="/">
              <button type="button" class="btn btn-primary" id="submit-btn2">CANCELAR</button>
          </RouterLink>
      </form>

  </body>
  </html>
</template>

<style scoped>
.formulario {
    width: 50%;
    height: 600px;
    border: 1px solid #030E43 !important;
    border-radius: 5px;
    margin-left: 25%;
    margin-top: -10%;
    margin-bottom: 5%;
    background-color: white;
    border: white;
}

#imagemSelecionada {
    height: 60px;
}

img {
    width: 35%;
    height: 190px;
    margin-left: 33%;
    margin-top: 7%;
}

.form-label {
    margin-left: 12%;
    color: #030E43;
    margin-top: 2%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
}

.form-control {
    margin-left: 12%;
    width: 75%;
    height: 60px;
    border: 1px solid #030E43;
    border-radius: 5px;
}

.mb-4 {
    margin-right: 20%;
    margin-top: 2%;
}

.form-text {
    margin-left: 25%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
}

.btn-primary {
    margin-left: 18%;
    background-color: #030E43;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    width: 30%;
    height: 50px;
    border: #030E43;
    margin-top: 2%;
}

#submit-btn2 {
    margin-left: 51%;
    margin-top: -11.5%;
    background-color: #D93939;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    width: 30%;
    height: 50px;
    border: #D93939;
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
