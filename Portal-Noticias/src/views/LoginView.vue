<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const senha = ref('');
const emailValido = ref(true); // Validação de e-mail
const senhaValida = ref(true); // Validação de senha
const camposPreenchidos = ref(true); // Verificação de campos vazios
const erroEmailBloqueado = ref(''); // Mensagem de erro para e-mails bloqueados
const emailBloqueado = new Set(['adrilysilva@gmail.com']); // Lista de e-mails bloqueados
const router = useRouter();

const autenticar = async (e) => {
  e.preventDefault(); // Previne o comportamento de submit padrão do formulário
  
  // Resetar as validações anteriores
  emailValido.value = true;
  senhaValida.value = true;
  camposPreenchidos.value = true;
  erroEmailBloqueado.value = ''; // Reseta a mensagem de erro
  
  // Verificar se os campos estão vazios
  if (!email.value || !senha.value) {
    camposPreenchidos.value = false;
    alert("Todos os campos devem ser preenchidos.");
    return;
  }
  
  // Validar o formato do e-mail
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexEmail.test(email.value)) {
    emailValido.value = false;
    alert("Por favor, insira um e-mail válido.");
    return;
  }
  
  // Impedir a autenticação com e-mails bloqueados
  if (emailBloqueado.has(email.value)) {
    erroEmailBloqueado.value = `O e-mail ${email.value} não pode ser utilizado para login.`;
    return; // Interrompe o processo de login
  }

  // Validar a senha (exemplo: deve ter pelo menos 6 caracteres)
  if (senha.value.length < 6) {
    senhaValida.value = false;
    alert("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  const auth = getAuth();

  try {
    // Tentando autenticar com e-mail e senha
    const userCredential = await signInWithEmailAndPassword(auth, email.value, senha.value);
    const user = userCredential.user;
    alert("Usuário autenticado com sucesso!");

    // Redireciona para a página home após login bem-sucedido
    router.push('/usuarioHome');
  } catch (error) {
    // Exibe o erro caso falhe
    console.error("Erro ao autenticar:", error);
    let mensagemErro = "Erro ao autenticar. Tente novamente.";
    if (error.code === 'auth/invalid-email') {
      mensagemErro = "E-mail inválido.";
    } else if (error.code === 'auth/wrong-password') {
      mensagemErro = "Senha incorreta.";
    } else if (error.code === 'auth/user-not-found') {
      mensagemErro = "Usuário não encontrado.";
    }
    alert(mensagemErro);
  }
};

// Função para login com o Google
const loginComGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert(`Usuário autenticado com sucesso! Bem-vindo ${user.displayName}`);
    
    // Redireciona para a página home após login bem-sucedido
    router.push('/usuarioHome');
  } catch (error) {
    console.error("Erro ao autenticar com Google:", error);
    alert("Erro ao autenticar com Google. Tente novamente.");
  }
};

// Função para login com o Facebook
const loginComFacebook = async () => {
  const auth = getAuth();
  const provider = new FacebookAuthProvider();

  try {
    console.log("Tentando autenticar com o Facebook...");
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Usuário autenticado com sucesso!", user);
    alert(`Usuário autenticado com sucesso! Bem-vindo ${user.displayName}`);
    
    // Redireciona para a página home após login bem-sucedido
    router.push('/usuarioHome');
  } catch (error) {
    console.error("Erro ao autenticar com Facebook:", error);
    alert("Erro ao autenticar com Facebook. Tente novamente.");
  }
};

</script>

<template>
  <body>
  <form class="formulario" @submit="autenticar">
    <img id="logoImage" src="../assets/1.png" alt="Logo">

    <div class="mb-3">
      <label for="email" class="form-label">E-mail</label>
      <input 
        type="email" 
        class="form-control" 
        id="email" 
        name="email" 
        v-model="email" 
        required 
        :class="{'is-invalid': !emailValido}"
        aria-describedby="nameHelp"/>
    
    </div>

    <div class="mb-3">
      <label for="senha" class="form-label">Senha</label>
      <input 
        type="password" 
        class="form-control" 
        id="senha" 
        name="senha" 
        v-model="senha" 
        required
        :class="{'is-invalid': !senhaValida}"
      />

    </div>

    <!-- Exibição de erro de e-mail bloqueado -->
    <div v-if="erroEmailBloqueado" class="alert alert-danger">
      {{ erroEmailBloqueado }}
    </div>

    <div v-if="!camposPreenchidos" class="alert alert-danger">
      Todos os campos devem ser preenchidos.
    </div>

    <button type="submit" class="btn btn-primary" id="submit-btn">CONTINUAR</button>

    <div id="nameHelp" class="form-text">
      Não tem conta? <RouterLink to="/usuario"><u>Crie sua conta</u></RouterLink>
    </div>

    <hr class="linha1"> 
    <p class="paragrafo">OU</p>

    <!-- Botões de login com Google e Facebook -->
    <button type="button" class="btn btn-primary" style="margin-top: 2%; background-color: white; border: 1px solid #294e5b; color: #294e5b;" @click="loginComGoogle">
      Continuar com o <b>Google</b>

    </button>

    <img class="facebook" src="../assets/google.jpg" alt="Google logo">


  </form>
</body>
</template>

<style scoped>
   body {
      background-color: #f2f2f2 !important;
      width: 101% !important;
      height: 1500px;
      margin-top: -2%;
      display: flex;
      margin-left: -1%;
  }

  .formulario {
      width: 50%;
      height: 850px;
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
      margin-left: 30%;
      background-color: #294e5b;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: normal;
      font-size: 16px;
      width: 40%;
      height: 65px;
      border-radius: 0.5cap;
      border: 1px solid #294e5b;
      margin-top: 4%;
      color: white;
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
      margin-left: 35%;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: normal;
      color: #030E43;
      margin-top: 2%;
  }

.facebook {
  width: 5%;
  height: 35px;
  margin-left: 31%;
  margin-top: -7.5%;
  text-align: center;
  display:flex;
}

.linha1{
  width: 75%;
  margin-top: 5%;
}

.paragrafo{
  margin-left: 47%;
  margin-top: 5%;


}
</style>
