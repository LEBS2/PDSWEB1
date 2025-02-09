<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import DAOService from '@/services/DAOService';

const dbService = new DAOService('usuario');

const nome = ref('');
const cpf = ref('');
const email = ref('');
const telefone = ref('');
const cep = ref('');
const senha = ref('');
const numeroCartao = ref('');

const addUser = async () => {
    const user = {
        nome: nome.value,
        cpf: cpf.value,
        email: email.value,
        telefone: telefone.value,
        cep: cep.value,
        senha: senha.value,
        numeroCartao: numeroCartao.value

    };

    const id = await dbService.insert(user);
    alert('Usuário cadastrado com sucesso!')
    console.log(id);
};

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

    <div class="formulario">

        <img id="logoImage" src="../assets/1.png" alt="Logo">

        <div class="mb-3">
            <label for="nome" class="form-label">Nome completo</label>
            <input type="text" class="form-control" id="nome" name="nome" v-model="nome" required aria-describedby="nameHelp">
            <div class="invalid-feedback">
                Campo obrigatório.
            </div>
        </div>

        <div class="mb-3">
            <label for="texto" class="form-label">CPF</label>
            <input type="text" class="form-control" id="texto" name="texto" v-model="cpf" required aria-describedby="nameHelp">
            <div class="invalid-feedback">
                Campo obrigatório.
            </div>
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" name="email" v-model="email" required aria-describedby="nameHelp">

        </div>

        <div class="mb-3">
            <label for="telefone" class="form-label">Telefone</label>
            <input type="tel" class="form-control" id="telefone" name="telefone" v-model="telefone" required aria-describedby="nameHelp">
            <div class="invalid-feedback">
                Campo obrigatório.
            </div>
        </div>

        <div class="mb-3">
            <label for="cep" class="form-label">CEP</label>
            <input type="tel" class="form-control" id="cep" name="cep" v-model="cep" required aria-describedby="nameHelp">
            <div class="invalid-feedback">
                Campo obrigatório.
            </div>
        </div>

        <div class="mb-3">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" id="senha" name="senha" v-model="senha" required aria-describedby="nameHelp">

        </div>

        <div id="descricaoTXT">
            <label style="color: white; font-size: 20px; margin-left: 16%;" for="description"
                class="form-label">ASSINATURA (CONTEÚDO EXCLUSIVO)</label>
            <div class="editor-container">
                <div class="toolbar">

                </div>
                <div id="editor" contenteditable="false">

                    30 dias por apenas R$ 4,99 

                </div>
            </div>
        </div><br>

        <div id="FormasPagamentos">
            <label style="color: white; font-size: 20px; margin-left: 16%;" for="description"
                class="form-label">CARTÃO DE CRÉDITO</label>
            <div class="editor-container">
               
                <div id="escolherFormaPagamento" contenteditable="false">

                    <div id="cartao" contenteditable="false">

                        Faremos uma cobrança no seu cartão 
    
                    </div>
                    <br>

                    <div style="font-size: 20px; margin-left: 12%;" contenteditable="false">

                        Número do cartão 
    
                    </div>

                        <input id="numeroCartao" v-model="numeroCartao" type="text" class="form-control"><br>

                        <div style="font-size: 16px; margin-left: 12%;" contenteditable="false">

                            Aceitamos: 
        
                        </div><br>

                        <div style="margin-left: 11%;">

                            <img class="logoCartoes" src="../assets/visa-logo.webp">

                            <img class="logoCartoes" src="../assets/mastercard-logo.jpg">
    
                            <img style="width: 15%;height: 35%;" class="logoCartoes" src="../assets/logo-elo.svg">
    

                        </div>

                </div>
            </div>
        </div>

        <RouterLink to="/usuarioHome">
        <button type="submit" class="btn btn-primary" id="submit-btn" @click="addUser()">CADASTRAR</button>
        </RouterLink>

        <RouterLink to="/">
        <button type="submit" class="btn btn-primary" id="submit-btn2">CANCELAR</button>
        </RouterLink>
    
    </div>

</body>

</html>
  
</template>

<style scoped>
 body {
      background-color: #f2f2f2 !important;
      height: 2500px;
      display: flex;
  }

  .formulario {
      width: 60%;
      height: 1800px;
      border: 1px solid black !important;
      border-radius: 5px;
      margin-left: 22%;
      margin-top: 7%;
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

#descricaoTXT {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-left: 12%;
    padding: 2px;
    background-color: #bf732f;
    color: #bf732f;
    width: 75%;
}

.editor-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.toolbar {
    margin-bottom: 10px;
}

#editor {
    min-height: 20px;
    border: 1px solid #ccc;
    padding: 10px;
    border: none;
    margin-left: 33%;
}

#FormasPagamentos {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-left: 12%;
    padding: 2px;
    background-color: #294e5b;
    color: #294e5b;
    width: 75%;
}

.editor-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.toolbar {
    margin-bottom: 10px;
}


#cartao {
    min-height: 20px;
    border: 1px solid #294e5b;
    padding: 10px;
    overflow-y: auto;
    outline: none; /* Remove outline ao focar */
    border: none;
    margin-left: 11%;
}

.logoCartoes{
    width: 10%;
    height: 30px;
    margin-left: 0%;
    margin-top: -7%;
}

#numeroCartao{
    width: 76%;
    margin-left: 12%;
    background-color: white;
}

</style>