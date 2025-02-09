<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Importando Firebase Auth
import DAOService from '@/services/DAOService'; // Sua DAOService configurada
import { getDocs, collection } from 'firebase/firestore';  // Importando funções do Firestore
import { firestore } from '@/firebase'; // Importando o Firestore

const email = ref('');
const senha = ref('');
const router = useRouter();
const auth = getAuth(); // Instanciando o Firebase Auth
const dbService = new DAOService('administrador'); // Coleção 'administrador'

// Função para validar o formato do e-mail
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Função para autenticar o administrador e registrar no Firebase Auth
const loginAdmin = async () => {
  try {
    // Validação para verificar se os campos estão preenchidos
    if (!email.value || !senha.value) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Validação do formato do e-mail
    if (!validateEmail(email.value)) {
      alert("E-mail inválido!");
      return;
    }

    console.log("Tentando autenticar com o e-mail:", email.value); // Verificando as credenciais

    // Certifique-se de que os valores de e-mail e senha são válidos
    if (email.value.trim() === '' || senha.value.trim() === '') {
      alert('Por favor, preencha o e-mail e a senha corretamente.');
      return;
    }

    // Autenticação no Firebase Auth
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, senha.value);
      const user = userCredential.user;

      console.log('Usuário autenticado no Firebase Auth:', user); // Verificando o retorno do Firebase Auth

      // Agora, buscar o administrador no Firestore para verificar se existe
      const querySnapshot = await dbService.search('email', email.value);
      if (querySnapshot.length === 0) {
        alert("E-mail não encontrado.");
        return;
      }

      const admin = querySnapshot[0]; // Pega o primeiro resultado do Firestore

      // Registrar a atividade de login no Firestore (opcional, para registrar o login)
      await dbService.update(admin.id, {
        ultima_autenticacao: new Date().toISOString(), // Registrando a data da última autenticação
      });

      alert("Login bem-sucedido!");
      router.push("/PaginaInicial"); // Redireciona após login bem-sucedido
    } catch (error) {
      // Se a autenticação no Firebase Auth falhar, capturamos o erro
      console.error("Erro ao autenticar no Firebase Auth:", error.message); // Exibe mensagem do erro
      if (error.code === 'auth/invalid-email') {
        alert("O e-mail fornecido é inválido.");
      } else if (error.code === 'auth/wrong-password') {
        alert("A senha está incorreta.");
      } else {
        alert("Erro de autenticação. Tente novamente.");
      }
    }
  } catch (error) {
    // Caso ocorra algum erro inesperado
    console.error("Erro ao tentar autenticar:", error);
    alert("Erro ao tentar fazer login. Tente novamente.");
  }
};
</script>

<template>

  <body>
  <form class="formulario">
    <img id="logoImage" src="../assets/1.png" alt="Logo">

    <!-- Campo de E-mail -->
    <div class="mb-3">
      <label for="email" class="form-label">E-mail</label>
      <input type="email" class="form-control" id="email" name="email" v-model="email" required aria-describedby="nameHelp">
     
    </div>

    <!-- Campo de Senha -->
    <div class="mb-3">
      <label for="senha" class="form-label">Senha</label>
      <input type="password" class="form-control" id="senha" name="senha" v-model="senha" required aria-describedby="nameHelp">
    </div>

    <a style="color: #294e5b;margin-left: 69.5%; font-size: 15px; text-decoration: none; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;" href="#">Esqueceu a senha?</a>

    <!-- Botão Entrar -->
    <button type="button" @click="loginAdmin" class="btn btn-primary" id="submit-btn">ENTRAR</button>

    <!-- Botão Cancelar -->
    <RouterLink to="/">
      <button type="button" class="btn btn-primary" id="submit-btn2">CANCELAR</button>
    </RouterLink>
  </form>
</body>

</template>
  
  <style scoped>
   body {
      background-color: #f2f2f2 !important;
      width: 110% !important;
      height: 800px;
      margin-top: -2%;
      display: flex;
      margin-left: -1%;
  }

  .formulario {
      width: 50%;
      height: 660px;
      border: 1px solid black !important;
      border-radius: 5px;
      margin-left: 25%;
      margin-top: 6%;
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
      margin-top: 4%;
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
      margin-top: 2%;
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