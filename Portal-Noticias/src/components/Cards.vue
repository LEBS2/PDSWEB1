<script setup>
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
  <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!-- Incluindo o Bootstrap -->
  </head>

  <h1 style="margin-top: 4%; text-decoration: underline;">FUTEBOOL</h1>

  <!-- Campo de pesquisa (usando input type="search") -->
  <div class="container mb-4" style="margin-top: 4%;">
    <input 
      v-model="searchQuery" 
      type="search" 
      class="form-control" 
      placeholder="Pesquisar notícias..." 
      aria-label="Pesquisar notícias">
  </div>

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

  <h1 style="margin-top: 4%; text-decoration: underline;">SAÚDE MENTAL</h1>

  <!-- Exibir notícias de Saúde Mental filtradas -->
  <div v-if="noticiasFiltradasSaudeMental.length">
    <div class="card mb-4" style="max-width: 1200px; margin: 0 auto;" v-for="(noticia, index) in noticiasFiltradasSaudeMental" :key="index">
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

</template>

<style scoped>
/* ------------------------------
   Estilo Global e Títulos
------------------------------ */

/* Título principal da página */
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

@media (max-width: 768px) {
  .card {
    margin-bottom: 20px;
    margin-top: 20px;
  }

  h1 {
    font-size: 2rem; /* Ajuste o tamanho do título em telas menores */
  }

  .card-body {
    text-align: center; /* Centraliza o texto em telas menores */
  }

  .col-md-4, .col-md-8 {
    max-width: 100%;
    flex: 1;
  }

  .card-title {
    font-size: 1.6rem; /* Ajusta o tamanho do título em telas pequenas */
  }

  .card-text {
    font-size: 0.9rem;
  }
}
</style>
