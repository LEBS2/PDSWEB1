<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, computed } from 'vue';

// Defina sua chave de API aqui
const apiKey = 'cf3c67159394429bb05f26501010b6b6';  // Substitua 'YOUR_API_KEY' pela chave da sua API

// Variáveis para armazenar as notícias
const noticiasFutebol = ref([]);
const noticiasSaudeMental = ref([]);

// Variáveis para armazenar os termos de pesquisa
const searchQuery = ref('');

// Função para buscar as notícias
const fetchNoticias = async () => {
  try {
    // URL da NewsAPI para notícias de Futebol
    const responseFutebol = await fetch(`https://newsapi.org/v2/everything?q=football&apiKey=${apiKey}`);
    const responseSaudeMental = await fetch(`https://newsapi.org/v2/everything?q=mental+health&apiKey=${apiKey}`);
    
    // Obter os dados em formato JSON
    const dataFutebol = await responseFutebol.json();
    const dataSaudeMental = await responseSaudeMental.json();

    // Armazenar os artigos nas variáveis reativas
    noticiasFutebol.value = dataFutebol.articles;
    noticiasSaudeMental.value = dataSaudeMental.articles;
  } catch (error) {
    console.error('Erro ao carregar as notícias', error);
  }
};

// Chamar a função de buscar notícias quando o componente for montado
onMounted(fetchNoticias);

// Computed para filtrar as notícias de acordo com a pesquisa
const noticiasFiltradasFutebol = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return noticiasFutebol.value;

  return noticiasFutebol.value.filter(noticia => {
    const title = noticia.title.toLowerCase();
    const description = noticia.description ? noticia.description.toLowerCase() : '';
    
    // Verifica se o termo de pesquisa está em qualquer parte do título ou descrição
    return title.includes(query) || description.includes(query);
  });
});

const noticiasFiltradasSaudeMental = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return noticiasSaudeMental.value;

  return noticiasSaudeMental.value.filter(noticia => {
    const title = noticia.title.toLowerCase();
    const description = noticia.description ? noticia.description.toLowerCase() : '';
    
    // Verifica se o termo de pesquisa está em qualquer parte do título ou descrição
    return title.includes(query) || description.includes(query);
  });
});

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


      <nav style="background-color: #356AAF !important; height: 70px; margin-top: -2%" class="navbar bg-body-tertiary">
        
        <div style="margin-top: -0.5%; color: white; text-decoration: none; margin-left: -6.5%;" class="container-fluid">
          <form class="d-flex" role="search">
            <input style="visibility: hidden;" id="buscar" type="search">
            
            <a style="margin: 3%; margin-left: 157%; margin-top: 5%;" class="nav-link active" aria-current="page" href="#futebol">FUTEBOL</a>
            <a style="margin: 4%; margin-top: 5%;" class="nav-link active" aria-current="page" href="#brasileirao">BRASILEIRÃO</a>
            <a  style="margin: 5%;" class="nav-link active" aria-current="page" href="#libertadores">LIBERTADORES</a>

       
        </form>
          
        </div>
        
      </nav>    

      <h1 style="text-decoration: underline; text-align: center; margin-top: 5%; color: #092553; margin-left: 8%">ESPORTES</h1>

      <!-- Campo de pesquisa (usando input type="search") -->
  <div class="container mb-4" style="margin-top: 4%;">
    <input 
      v-model="searchQuery" 
      type="search" 
      class="form-control" 
      placeholder="Pesquisar notícias..." 
      aria-label="Pesquisar notícias">
  </div>
  
<br><br><br><br>
 <!-- Exibir notícias de Futebol filtradas -->
 <div v-if="noticiasFiltradasFutebol.length">
    <div class="card mb-4" style="max-width: 1200px; margin-top: 5%;" v-for="(noticia, index) in noticiasFiltradasFutebol" :key="index">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="noticia.urlToImage" class="img-fluid rounded-start" alt="Imagem da notícia">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h1 class="card-title">{{ noticia.title }}</h1>
            <p class="card-text">{{ noticia.description }}</p>
          </div>
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

h1 {
text-align: center;
font-size: 2.5rem;
font-weight: bold;
margin-top: 4%;
}

/* ------------------------------
Estilo do Card
------------------------------ */

.card {
margin-top: -3% !important;
margin-left: 5.5%;
margin-bottom: 30px; /* Aumenta o espaço entre os cards */
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adiciona sombra para destacar os cards */
border-radius: 8px; /* Bordas arredondadas para os cards */
border: none;
width: 100%; /* Garante que os cards ocupem toda a largura disponível */
height: 500px; /* Aumenta a altura dos cards */
}

/* Card com imagem e conteúdo */
.card-body {
padding: 20px;
overflow-y: auto; /* Permite o conteúdo rolar se for maior que o espaço disponível */

}

.card-title {
font-size: 1.8rem;
font-weight: bold;
margin-bottom: 15px;
}

.card-text {
font-size: 1rem;
color: #555;
line-height: 1.5;
}

/* ------------------------------
Estilo da Imagem dentro do Card
------------------------------ */
img {
width: 100%; /* A imagem ocupa 100% da largura do seu container */
height: 500px; /* A imagem ocupa 100% da altura do seu container */
object-fit: cover; /* A imagem preenche o espaço sem distorcer, cortando se necessário */
border-radius: 8px 0 0 8px; /* Bordas arredondadas para o lado esquerdo da imagem */
}

/* ------------------------------
Estilo para colunas dentro do card
------------------------------ */
.row {
display: flex;
gap: 20px; /* Espaçamento entre imagem e conteúdo */
}

.col-md-4 {
max-width: 35%;
flex: 1;
height: 100%; /* Garante que a coluna de imagem tenha a mesma altura do card */
}

.col-md-8 {
flex: 2;
}

/* ------------------------------
Estilos de Responsividade
------------------------------ */


</style>