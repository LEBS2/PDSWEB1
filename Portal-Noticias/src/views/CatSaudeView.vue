<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, computed } from 'vue';
import Header from '@/components/Header.vue';

// Defina sua chave de API aqui
const apiKey = 'cf3c67159394429bb05f26501010b6b6';  // Substitua 'YOUR_API_KEY' pela chave da sua API

// Variáveis para armazenar as notícias
const noticiasSaudeMental = ref([]);
const noticiasVidaFitness = ref([]);
const noticiasBemEstar = ref([]);

// Variáveis para armazenar os termos de pesquisa
const searchQuery = ref('');

// Função para buscar as notícias
const fetchNoticias = async () => {
  try {
    // URLs da NewsAPI para notícias relacionadas a Saúde Mental, Vida Fitness e Bem-estar em português
    const responseSaudeMental = await fetch(`https://newsapi.org/v2/everything?q=mental+health&language=pt&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`);
    const responseVidaFitness = await fetch(`https://newsapi.org/v2/everything?q=fitness&language=pt&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`);
    const responseBemEstar = await fetch(`https://newsapi.org/v2/everything?q=wellness&language=pt&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`);
    
    // Obter os dados em formato JSON
    const dataSaudeMental = await responseSaudeMental.json();
    const dataVidaFitness = await responseVidaFitness.json();
    const dataBemEstar = await responseBemEstar.json();

    // Filtrar e garantir que todas as notícias possuam os campos necessários
    noticiasSaudeMental.value = filterNoticias(dataSaudeMental.articles);
    noticiasVidaFitness.value = filterNoticias(dataVidaFitness.articles);
    noticiasBemEstar.value = filterNoticias(dataBemEstar.articles);
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
    saudeMental: noticiasSaudeMental.value,
    vidaFitness: noticiasVidaFitness.value,
    bemEstar: noticiasBemEstar.value
  };

  const filtrarNoticias = (noticias) => {
    return noticias.filter(noticia => {
      const title = noticia.title.toLowerCase();
      const description = noticia.description ? noticia.description.toLowerCase() : '';
      return title.includes(query) || description.includes(query);
    });
  };

  return {
    saudeMental: filtrarNoticias(noticiasSaudeMental.value),
    vidaFitness: filtrarNoticias(noticiasVidaFitness.value),
    bemEstar: filtrarNoticias(noticiasBemEstar.value)
  };
});
</script>
<template>
  <html lang="pt">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Home Usuário</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
    <body>
      <Header/>
      <!-- Seu código de navegação permanece o mesmo -->
      <h1 style="text-decoration: underline; text-align: center; margin-top: 7%; color: #092553;">SAÚDE</h1>

      <div class="container mb-4" style="margin-top: 4%;">
        <input  
          v-model="searchQuery" 
          type="search" 
          class="form-control" 
          placeholder="Pesquisar notícias..." 
          aria-label="Pesquisar notícias">
      </div>

      <br><br><br><br>

      <!-- Exibir notícias de Saúde Mental -->
      <h2 id="saudeMental" style="text-align: center; color: #356aaf;">Saúde Mental</h2>
      <div v-if="noticiasFiltradas.saudeMental.length">
        <div class="card-group custom-card-group">
          <div class="card custom-card" v-for="(noticia, index) in noticiasFiltradas.saudeMental" :key="index">
            <img :src="noticia.urlToImage" class="card-img-top" alt="Imagem da notícia">
            <div class="card-body">
              <a :href="noticia.url" target="_blank">
                <h5 class="card-title">{{ noticia.title }}</h5>
              </a>
              <p class="card-text">{{ noticia.description }}</p>
              <p><small class="text-muted">Publicado em: {{ new Date(noticia.publishedAt).toLocaleDateString('pt-BR') }}</small></p>
            </div>
          </div>
        </div>
      </div>

      <!-- Exibir notícias de Vida Fitness -->
      <h2 id="vidaFitness" style="text-align: center; color: #356aaf;">Vida Fitness</h2>
      <div v-if="noticiasFiltradas.vidaFitness.length">
        <div class="card-group custom-card-group">
          <div class="card custom-card" v-for="(noticia, index) in noticiasFiltradas.vidaFitness" :key="index">
            <img :src="noticia.urlToImage" class="card-img-top" alt="Imagem da notícia">
            <div class="card-body">
              <a :href="noticia.url" target="_blank">
                <h5 class="card-title">{{ noticia.title }}</h5>
              </a>
              <p class="card-text">{{ noticia.description }}</p>
              <p><small class="text-muted">Publicado em: {{ new Date(noticia.publishedAt).toLocaleDateString('pt-BR') }}</small></p>
            </div>
          </div>
        </div>
      </div>

      <!-- Exibir notícias de Bem-estar -->
      <h2 id="bemEstar" style="text-align: center; color: #356aaf;">Bem-estar</h2>
      <div v-if="noticiasFiltradas.bemEstar.length">
        <div class="card-group custom-card-group">
          <div class="card custom-card" v-for="(noticia, index) in noticiasFiltradas.bemEstar" :key="index">
            <img :src="noticia.urlToImage" class="card-img-top" alt="Imagem da notícia">
            <div class="card-body">
              <a :href="noticia.url" target="_blank">
                <h5 class="card-title">{{ noticia.title }}</h5>
              </a>
              <p class="card-text">{{ noticia.description }}</p>
              <p><small class="text-muted">Publicado em: {{ new Date(noticia.publishedAt).toLocaleDateString('pt-BR') }}</small></p>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
</template>

<style scoped>
body{
  background-color: #f2f2f2;
}

/* Grid layout para os cards, responsivo */
.custom-card-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem; /* Espaço entre os cards */
  margin-top: 30px;
  padding: 0 5%; /* Distância das bordas */
}

/* Estilo base para todos os cards */
.custom-card {
  border: none; /* Remover bordas padrões */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
  border-radius: 10px; /* Bordas arredondadas */
  overflow: hidden; /* Assegura que a imagem se ajusta ao card */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Efeito de transição suave */
  background-color: #fff; /* Cor de fundo branca */
}

.custom-card:hover {
  transform: translateY(-5px); /* Levanta o card no hover */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Sombra mais forte no hover */
}

.custom-card .card-body {
  padding: 1rem; /* Padding interno */
}

.custom-card img {
  object-fit: cover;
  height: 200px; /* Tamanho fixo para a imagem */
  width: 100%;
}

.custom-card .card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #356aaf; /* Cor do título */
  margin-top: 1rem;
}

.custom-card .card-text {
  font-size: 1rem;
  color: #666; /* Texto de descrição */
  margin-top: 0.5rem;
}

.custom-card .text-muted {
  font-size: 0.9rem;
  color: #999;
}

.custom-card a {
  text-decoration: none;
  color: inherit; /* Link sem sublinhado */
}

.custom-card a:hover {
  text-decoration: underline; /* Sublinha o link no hover */
}

/* Responsividade para telas menores */
@media (max-width: 1024px) {
  .custom-card-group {
    grid-template-columns: repeat(2, 1fr);
  }

  .custom-card {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .custom-card-group {
    grid-template-columns: 1fr;
  }
}
</style>
