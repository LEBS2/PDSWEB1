<script setup>
import { ref, onMounted, computed } from 'vue';

// Defina sua chave de API aqui
const apiKey = 'cf3c67159394429bb05f26501010b6b6';  // Substitua 'YOUR_API_KEY' pela chave da sua API

// Variáveis para armazenar as notícias
const noticiasFutebol = ref([]);
const noticiasBrasileirao = ref([]);
const noticiasLibertadores = ref([]);

// Variáveis para armazenar os termos de pesquisa
const searchQuery = ref('');

// Função para buscar as notícias
const fetchNoticias = async () => {
  try {
    // URLs da NewsAPI para notícias relacionadas a Futebol, Brasileirão e Libertadores
    const responseFutebol = await fetch(`https://newsapi.org/v2/everything?q=futebol&language=pt&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`);
    const responseBrasileirao = await fetch(`https://newsapi.org/v2/everything?q=brasileirao&language=pt&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`);
    const responseLibertadores = await fetch(`https://newsapi.org/v2/everything?q=libertadores&language=pt&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`);
    
    // Obter os dados em formato JSON
    const dataFutebol = await responseFutebol.json();
    const dataBrasileirao = await responseBrasileirao.json();
    const dataLibertadores = await responseLibertadores.json();

    // Filtrar e garantir que todas as notícias possuam os campos necessários
    noticiasFutebol.value = filterNoticias(dataFutebol.articles);
    noticiasBrasileirao.value = filterNoticias(dataBrasileirao.articles);
    noticiasLibertadores.value = filterNoticias(dataLibertadores.articles);
  } catch (error) {
    console.error('Erro ao carregar as notícias', error);
  }
};

// Função para filtrar notícias, garantindo que os campos essenciais estão presentes
const filterNoticias = (noticias) => {
  return noticias.filter(noticia => noticia.title && noticia.description && noticia.urlToImage && noticia.url);
};

// Chamar a função de buscar notícias quando o componente for montado
onMounted(fetchNoticias);

// Computed para filtrar as notícias de acordo com a pesquisa
const noticiasFiltradas = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return {
    futebol: noticiasFutebol.value,
    brasileirao: noticiasBrasileirao.value,
    libertadores: noticiasLibertadores.value
  };

  const filtrarNoticias = (noticias) => {
    return noticias.filter(noticia => {
      const title = noticia.title.toLowerCase();
      const description = noticia.description ? noticia.description.toLowerCase() : '';
      return title.includes(query) || description.includes(query);
    });
  };

  return {
    futebol: filtrarNoticias(noticiasFutebol.value),
    brasileirao: filtrarNoticias(noticiasBrasileirao.value),
    libertadores: filtrarNoticias(noticiasLibertadores.value)
  };
});
</script>

<template>
  <html lang="pt">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Home Usuário - Esportes</title>
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
        <img id="logoImage" src="../assets/1.png" alt="Logo">
      </nav>    

      <nav style="background-color: #356AAF !important; height: 94px; margin-top: -2%" class="navbar bg-body-tertiary">
        <div style="margin-top: -0.5%; color: white; margin-left: -6.5%;" class="container-fluid">
          <form class="d-flex" role="search">
            <input style="visibility: hidden;" id="buscar" type="search">
            <a style="margin: 3%; margin-left: 157%; margin-top: 5%;" class="nav-link active" aria-current="page" href="#futebol">FUTEBOL</a>
            <a style="margin: 4%; margin-top: 5%;" class="nav-link active" aria-current="page" href="#brasileirao">BRASILEIRÃO</a>
            <a style="margin: 5%;" class="nav-link active" aria-current="page" href="#libertadores">LIBERTADORES</a>
          </form>
        </div>
      </nav>    

      <h1 style="text-decoration: underline; text-align: center; margin-top: 7%; color: #092553;">ESPORTES</h1>

      <!-- Campo de pesquisa -->
      <div class="container mb-4" style="margin-top: 4%;">
        <input 
          v-model="searchQuery" 
          type="search" 
          class="form-control" 
          placeholder="Pesquisar notícias..." 
          aria-label="Pesquisar notícias">
      </div>

      <!-- Exibir notícias de Futebol -->
      <h2 id="futebol" style="text-align: center;">Futebol</h2>
      <div v-if="noticiasFiltradas.futebol.length">
        <div class="card mb-4" style="max-width: 1200px; margin: 0 auto;" v-for="(noticia, index) in noticiasFiltradas.futebol" :key="index">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="noticia.urlToImage" class="img-fluid rounded-start" alt="Imagem da notícia">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <a :href="noticia.url" target="_blank">
                  <h1 class="card-title">{{ noticia.title }}</h1>
                </a>
                <p class="card-text">{{ noticia.description }}</p>
                <p><small>Publicado em: {{ new Date(noticia.publishedAt).toLocaleDateString('pt-BR') }}</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Exibir notícias do Brasileirão -->
      <h2 id="brasileirao" style="text-align: center;">Brasileirão</h2>
      <div v-if="noticiasFiltradas.brasileirao.length">
        <div class="card mb-4" style="max-width: 1200px; margin: 0 auto;" v-for="(noticia, index) in noticiasFiltradas.brasileirao" :key="index">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="noticia.urlToImage" class="img-fluid rounded-start" alt="Imagem da notícia">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <a :href="noticia.url" target="_blank">
                  <h1 class="card-title">{{ noticia.title }}</h1>
                </a>
                <p class="card-text">{{ noticia.description }}</p>
                <p><small>Publicado em: {{ new Date(noticia.publishedAt).toLocaleDateString('pt-BR') }}</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Exibir notícias da Libertadores -->
      <h2 id="libertadores" style="text-align: center;">Libertadores</h2>
      <div v-if="noticiasFiltradas.libertadores.length">
        <div class="card mb-4" style="max-width: 1200px; margin: 0 auto;" v-for="(noticia, index) in noticiasFiltradas.libertadores" :key="index">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="noticia.urlToImage" class="img-fluid rounded-start" alt="Imagem da notícia">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <a :href="noticia.url" target="_blank">
                  <h1 class="card-title">{{ noticia.title }}</h1>
                </a>
                <p class="card-text">{{ noticia.description }}</p>
                <p><small>Publicado em: {{ new Date(noticia.publishedAt).toLocaleDateString('pt-BR') }}</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
</template>

<style scoped>
  /* O estilo pode ser o mesmo utilizado para as notícias de saúde. Caso queira adicionar ou modificar algo, altere aqui */
</style>
