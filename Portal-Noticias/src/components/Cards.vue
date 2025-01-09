<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import DAOService from '@/services/DAOService';

const dbService = new DAOService('noticias');

// Variáveis para capturar dados do formulário
const titulo = ref('');
const descricao = ref('');
const imagemUrl = ref(''); // Link da imagem

// Variáveis para armazenar as notícias
const noticiasFutebol = ref([]);
const noticiasSaudeMental = ref([]);
const noticiasPublicadas = ref([]); // Para armazenar notícias publicadas

// Chave da API
const apiKey = 'cf3c67159394429bb05f26501010b6b6'; // Substitua pela sua chave da API

// Função para buscar notícias
const fetchNoticias = async () => {
  try {
    const responseFutebol = await fetch(`https://newsapi.org/v2/everything?q=futebol+brasileiro&language=pt&sortBy=publishedAt&apiKey=${apiKey}`);
    const responseSaudeMental = await fetch(`https://newsapi.org/v2/everything?q=saúde+mental&language=pt&sortBy=publishedAt&apiKey=${apiKey}`);

    if (responseFutebol.ok && responseSaudeMental.ok) {
      const dataFutebol = await responseFutebol.json();
      const dataSaudeMental = await responseSaudeMental.json();
      
      noticiasFutebol.value = filterNoticias(dataFutebol.articles);
      noticiasSaudeMental.value = filterNoticias(dataSaudeMental.articles);
    }
  } catch (error) {
    console.error('Erro ao carregar as notícias:', error);
  }
};

// Filtra as notícias, removendo duplicatas e verificando título e link
const filterNoticias = (articles) => {
  const seen = new Set();
  return articles
    .filter(noticia => noticia.title && noticia.url) // Filtra notícias sem título ou link
    .filter(noticia => {
      const key = `${noticia.title}-${noticia.url}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

// Função para salvar notícia no banco de dados
const publicarNoticia = async () => {
  const noticia = {
    titulo: titulo.value,
    descricao: descricao.value,
    imagemUrl: imagemUrl.value,
  };

  const id = await dbService.insert(noticia);
  alert('Notícia publicada com sucesso!');
  console.log(id);
  
  // Após publicar, recarrega as notícias do banco
  carregarNoticiasCadastradas();
};

// Função para carregar as notícias cadastradas
const carregarNoticiasCadastradas = async () => {
  const noticias = await dbService.getAll();
  noticiasPublicadas.value = noticias;
};

// Função para formatar a data
const formatarData = (dataISO) => {
  const data = new Date(dataISO);
  return data.toLocaleString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });
};

// Chama a função de buscar notícias quando o componente for montado
onMounted(() => {
  fetchNoticias(); // Carregar notícias da NewsAPI
  carregarNoticiasCadastradas(); // Carregar as notícias cadastradas
});
</script>

<template>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!-- Incluindo o Bootstrap -->
  </head>

  <!-- Campo de pesquisa -->
  <div class="container mb-4" style="margin-top: 4%;">
    <input 
      v-model="searchQuery" 
      type="search" 
      class="form-control" 
      placeholder="Pesquisar notícias..." 
      aria-label="Pesquisar notícias">
  </div>

  <!-- Exibir notícias publicadas -->
  <div v-if="noticiasPublicadas.length">
    <h2 class="centralizado" style="text-decoration: underline;">Notícias Cadastradas</h2>
    <div class="card mb-4" style="max-width: 1200px; margin-top: 5%;" v-for="(noticia, index) in noticiasPublicadas" :key="index">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="noticia.imagemUrl" class="img-fluid rounded-start" alt="Imagem da notícia" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h1 class="card-title">{{ noticia.titulo }}</h1>
            <p class="card-text">{{ noticia.descricao }}</p>
            <p class="card-text"><small class="text-muted">Publicado em: {{ formatarData(new Date()) }}</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Exibir notícias de Futebol Brasileiro filtradas -->
  <div v-if="noticiasFutebol.length">
    <h2 class="centralizado" style="text-decoration: underline;">Notícias de Futebol Brasileiro</h2>
    <div class="card mb-4" style="max-width: 1200px; margin-top: 5%;" v-for="(noticia, index) in noticiasFutebol" :key="index">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="noticia.urlToImage" class="img-fluid rounded-start" alt="Imagem da notícia" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <a :href="noticia.url" target="_blank">
              <h1 class="card-title">{{ noticia.title }}</h1>
            </a>
            <p class="card-text">{{ noticia.description }}</p>
            <p class="card-text"><small class="text-muted">Publicado em: {{ formatarData(noticia.publishedAt) }}</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Exibir notícias de Saúde Mental filtradas -->
  <div v-if="noticiasSaudeMental.length">
    <h2 class="centralizado" style="text-decoration: underline; margin-top: 4%;">Notícias de Saúde Mental</h2>
    <div class="card mb-4" style="max-width: 1200px; margin: 0 auto;" v-for="(noticia, index) in noticiasSaudeMental" :key="index">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="noticia.urlToImage" class="img-fluid rounded-start" alt="Imagem da notícia" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <a :href="noticia.url" target="_blank">
              <h1 class="card-title">{{ noticia.title }}</h1>
            </a>
            <p class="card-text">{{ noticia.description }}</p>
            <p class="card-text"><small class="text-muted">Publicado em: {{ formatarData(noticia.publishedAt) }}</small></p>
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

/* Centralizando os títulos h1 e h2 */
.centralizado {
  text-align: center;
}

/* Título principal da página */
h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 4%;
}

/* Estilo dos títulos de seção */
h2 {
  font-size: 2rem;
  margin-top: 2%;
  margin-bottom: 2%;
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

  h2 {
    font-size: 1.8rem; /* Ajuste o tamanho do título da seção em telas menores */
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
