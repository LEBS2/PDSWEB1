<template>
      <Header/>

      <body>
    <div class="container mt-5" v-if="noticia">
      <img :src="noticia.imagemUrl" alt="Imagem da Notícia" class="img-fluid" />
      <h1>{{ noticia.titulo }}</h1>
      <p>{{ noticia.descricao }}</p>
      <p><small>Publicado em: {{ formatarData(noticia.data) }}</small></p>
    </div>
    <div v-else>
      <p>Carregando detalhes...</p>
    </div>
  </body>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router'; // Para acessar o id da URL
  import DAOService from '@/services/DAOService'; // Seu serviço de acesso ao banco
  import Header from '@/components/Header.vue';

  const route = useRoute(); // Acessa a URL para pegar o parâmetro de ID
  const dbService = new DAOService('noticias'); // Instancia o serviço de banco de dados
  
  const noticia = ref(null); // Armazena os dados da notícia
  
  // Função para carregar os detalhes da notícia
  const carregarNoticiaDetalhada = async () => {
    const id = route.params.id; // Obtém o id da URL
    noticia.value = await dbService.get(id); // Obtém os dados da notícia com o id
  };
  
  // Função para formatar a data de publicação
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
  
  // Chama a função de carregar a notícia ao montar o componente
  onMounted(() => {
    carregarNoticiaDetalhada();
  });
  </script>

<style scoped>
   body {
      background-color: #f2f2f2 !important;
      width: 100% !important;
      height: 800px;
      margin-top: -2%;
      display: flex;
      margin-left: -1%;
  }

/* Contêiner principal */
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;
  font-family: 'Georgia', serif;
  background-color: #ffffff;
  color: #333333;
  line-height: 1.6;
  border-left: 5px solid #bf732f;
  border-right: 5px solid #bf732f;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.1);
}

/* Imagem no topo */
img {
  display: block;
  margin: 0 auto 30px; /* Espaçamento abaixo da imagem */
  max-width: 100%; /* Tamanho máximo da imagem */
  height: 250px; /* Altura fixa e controlada */
  object-fit: cover; /* Cobre a área disponível sem distorcer a imagem */
  border-radius: 8px;
}

/* Título da notícia */
h1 {
  text-align: center;
  font-size: 3.5em; /* Tamanho grande para o título */
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 20px;
  color: #2c3e50;
  font-family: 'Merriweather', serif;
  line-height: 1.2;
}

/* Descrição da notícia */
p {
  text-align: justify;
  font-size: 1.2em;
  color: #444444;
  margin-bottom: 25px;
  padding: 0 20px;
  line-height: 1.7;
}

/* Data de publicação */
small {
  font-size: 0.9em;
  color: #7f8c8d;
  display: block;
  text-align: right;
  margin-top: 30px;
  font-style: italic;
}

/* Estilo para o corpo */
body {
  background-color: #f7f7f7;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 20px;
}
</style>
