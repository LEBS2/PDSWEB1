<script setup>
import { ref, onMounted, computed } from 'vue';
import Header from '@/components/Header.vue';

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
      <Header/>
  
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
  <div class="card-group">
    <div class="card" v-for="(noticia, index) in noticiasFiltradas.futebol" :key="index">
      <img :src="noticia.urlToImage" class="card-img-top" alt="Imagem da notícia">
      <div class="card-body">
        <a :href="noticia.url" target="_blank">
          <h5 class="card-title">{{ noticia.title }}</h5>
        </a>
        <p class="card-text">{{ noticia.description }}</p>
        <p class="card-text"><small class="text-body-secondary">Publicado em: {{ new Date(noticia.publishedAt).toLocaleDateString('pt-BR') }}</small></p>
      </div>
    </div>
  </div>
</div>

<!-- Exibir notícias do Brasileirão -->
<h2 id="brasileirao" style="text-align: center;">Brasileirão</h2>
<div v-if="noticiasFiltradas.brasileirao.length">
  <div class="card-group">
    <div class="card" v-for="(noticia, index) in noticiasFiltradas.brasileirao" :key="index">
      <img :src="noticia.urlToImage" class="card-img-top" alt="Imagem da notícia">
      <div class="card-body">
        <a :href="noticia.url" target="_blank">
          <h5 class="card-title">{{ noticia.title }}</h5>
        </a>
        <p class="card-text">{{ noticia.description }}</p>
        <p class="card-text"><small class="text-body-secondary">Publicado em: {{ new Date(noticia.publishedAt).toLocaleDateString('pt-BR') }}</small></p>
      </div>
    </div>
  </div>
</div>

<!-- Exibir notícias da Libertadores -->
<h2 id="libertadores" style="text-align: center;">Libertadores</h2>
<div v-if="noticiasFiltradas.libertadores.length">
  <div class="card-group">
    <div class="card" v-for="(noticia, index) in noticiasFiltradas.libertadores" :key="index">
      <img :src="noticia.urlToImage" class="card-img-top" alt="Imagem da notícia">
      <div class="card-body">
        <a :href="noticia.url" target="_blank">
          <h5 class="card-title">{{ noticia.title }}</h5>
        </a>
        <p class="card-text">{{ noticia.description }}</p>
        <p class="card-text"><small class="text-body-secondary">Publicado em: {{ new Date(noticia.publishedAt).toLocaleDateString('pt-BR') }}</small></p>
      </div>
    </div>
  </div>
</div>
</body>
</html>
</template>

<style scoped>
/* Estilo geral do corpo */
body {
  background-color: #f2f2f2;
  font-family: 'Arial', sans-serif; /* Fonte mais legível */
  margin: 0;
  padding: 0;
}

/* Títulos */
h1 {
  text-decoration: underline;
  text-align: center;
  margin-top: 7%;
  color: #092553;
  font-size: 2.5rem; /* Tamanho maior e mais imponente */
}

h2 {
  text-align: center;
  margin-top: 30px;
  font-size: 1.75rem;
  color: #356aaf; /* Cor consistente com o tema */
}

/* Barra de navegação superior */
.navbar {
  background-color: #356aaf !important;
  height: 94px;
  margin-top: -2%;
}

.navbar .nav-link {
  color: #fff !important;
  margin-right: 20px;
}

.navbar .nav-link:hover {
  text-decoration: underline;
}

/* Estilo para a pesquisa */
.container {
  margin-top: 4%;
}

input[type="search"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

/* Grid layout para os cards, responsivo */
.card-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 30px;
  padding: 0 5%;
}

/* Estilo base para os cards */
.card {
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.card-body {
  padding: 1rem;
}

.card-img-top {
  object-fit: cover;
  height: 200px;
  width: 100%;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #356aaf;
  margin-top: 1rem;
}

.card-text {
  font-size: 1rem;
  color: #666;
  margin-top: 0.5rem;
}

.card .text-muted {
  font-size: 0.9rem;
  color: #999;
}

.card a {
  text-decoration: none;
  color: inherit;
}

.card a:hover {
  text-decoration: underline;
}

/* Responsividade para telas menores */
@media (max-width: 1024px) {
  .card-group {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .card-group {
    grid-template-columns: 1fr;
  }
}
</style>
