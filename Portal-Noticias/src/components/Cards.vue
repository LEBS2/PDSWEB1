<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'; // Importar o useRouter
import DAOService from '@/services/DAOService';

const router = useRouter(); // Defina a variável router
const dbService = new DAOService('noticias');

// Variáveis para capturar dados do formulário
const titulo = ref('');
const descricao = ref('');
const imagemUrl = ref(''); // Link da imagem
const noticiaEditada = ref(null); // Variável para armazenar a notícia que está sendo editada

// Variáveis para armazenar as notícias
const noticiasFutebol = ref([]);
const noticiasSaudeMental = ref([]);
const noticiasPublicadas = ref([]); // Para armazenar notícias publicadas

// Variáveis de pesquisa
const searchQuery = ref('');

// Função para navegar para a página de detalhes da notícia
const navegarParaDetalhes = (id) => {
  router.push({ name: 'noticiaDetalhe', params: { id } });
};

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
      
      console.log('Notícias de Futebol:', dataFutebol); // Log das notícias de Futebol
      console.log('Notícias de Saúde Mental:', dataSaudeMental); // Log das notícias de Saúde Mental

      noticiasFutebol.value = filterNoticias(dataFutebol.articles);
      noticiasSaudeMental.value = filterNoticias(dataSaudeMental.articles);
    } else {
      console.error('Erro na resposta da API', responseFutebol.status, responseSaudeMental.status);
    }
  } catch (error) {
    console.error('Erro ao carregar as notícias:', error);
  }
};

// Filtra as notícias, removendo duplicatas e verificando título e link
const filterNoticias = (articles) => {
  const seen = new Set();
  return articles
    .filter(noticia => {
      console.log(noticia);  // Adiciona log para visualizar as notícias
      return noticia.title && noticia.url; // Filtra notícias sem título ou link
    })
    .filter(noticia => {
      const key = `${noticia.title}-${noticia.url}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

const publicarNoticia = async () => {
  const noticia = {
    titulo: titulo.value,
    descricao: descricao.value,
    imagemUrl: imagemUrl.value,
  };

  let id;
  if (noticiaEditada.value) {
    // Caso seja uma edição, atualizamos a notícia
    id = noticiaEditada.value.id;
    await dbService.update(id, noticia);
    alert('Notícia atualizada com sucesso!');
  } else {
    // Caso seja uma nova publicação
    id = await dbService.insert(noticia);
    alert('Notícia publicada com sucesso!');
  }

  console.log(id);

  // Limpa o formulário e recarrega as notícias
  titulo.value = '';
  descricao.value = '';
  imagemUrl.value = '';
  noticiaEditada.value = null;
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

// Função para destacar a palavra-chave (termo de pesquisa) com fundo amarelo
const destacarPalavraChave = (texto) => {
  const termoBusca = searchQuery.value.trim().toLowerCase();
  if (!termoBusca) return texto;

  const regex = new RegExp(`(${termoBusca})`, 'gi'); // Cria a regex para a busca
  return texto.replace(regex, (match) => `<span class="highlight">${match}</span>`); // Substitui com a marcação
};

// Computed property para filtrar as notícias conforme o termo de pesquisa
const noticiasFiltradas = computed(() => {
  const query = searchQuery.value.toLowerCase();
  
  // Filtra as notícias publicadas
  const noticiasFiltradasPublicadas = noticiasPublicadas.value.filter(noticia => {
    return noticia.titulo.toLowerCase().includes(query) || noticia.descricao.toLowerCase().includes(query);
  });

  // Filtra as notícias de futebol
  const noticiasFiltradasFutebol = noticiasFutebol.value.filter(noticia => {
    return noticia.title.toLowerCase().includes(query) || noticia.description.toLowerCase().includes(query);
  });

  // Filtra as notícias de saúde mental
  const noticiasFiltradasSaudeMental = noticiasSaudeMental.value.filter(noticia => {
    return noticia.title.toLowerCase().includes(query) || noticia.description.toLowerCase().includes(query);
  });

  // Retorna as notícias filtradas
  return {
    noticiasFiltradasPublicadas,
    noticiasFiltradasFutebol,
    noticiasFiltradasSaudeMental
  };
});

const removerNoticia = async (id) => {
  await dbService.delete(id);
  alert('Notícia removida com sucesso!');
  carregarNoticiasCadastradas(); // Recarrega as notícias após a remoção
};

// Chama a função de buscar notícias quando o componente for montado
onMounted(() => {
  fetchNoticias(); // Carregar notícias da NewsAPI
  carregarNoticiasCadastradas(); // Carregar as notícias cadastradas
});

const editarNoticia = (noticia) => {
  // Preenche as variáveis com os dados da notícia selecionada para edição
  titulo.value = noticia.titulo;
  descricao.value = noticia.descricao;
  imagemUrl.value = noticia.imagemUrl;

  // Armazena a notícia que está sendo editada
  noticiaEditada.value = noticia;

  // Navega para a página de edição
  router.push({ name: 'noticias', params: { id: noticia.id } });
};
</script>

<template>
     <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    </head>

  <body style="background-color: #f2f2f2; margin-top: -3.97%">
 
    <!-- Campo de pesquisa -->
    <div class="container mb-4" style="margin-top: 4%;">
      <input 
        v-model="searchQuery" 
        type="search" 
        class="form-control form-control-lg" 
        placeholder="Pesquise por notícias..." 
        aria-label="Pesquisar notícias"
        style="border-radius: 30px; padding: 15px; background-color: #fff; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
    </div>

    <!-- Notícias publicadas -->
    <div v-if="noticiasFiltradas.noticiasFiltradasPublicadas.length">
      <h2 class="centralizado" style="text-decoration: none; font-size: 2.5rem; font-weight: bold;">Publicações</h2>

      <div class="card mb-4" style="height: 275px; width:27%; margin: 25px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); background-color: #294e5b; display: flex; margin-left: 18%;" v-for="(noticia, index) in noticiasFiltradas.noticiasFiltradasPublicadas" :key="index">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="noticia.imagemUrl || '/path/to/default-image.jpg'" class="img-fluid rounded-start" alt="Imagem da notícia" style="border-radius: 8px; margin-top: 2.5%; width: 1500%; margin-left: 4%; display: flex;">
          </div>

          <div class="col-md-8">
            <div class="card-body">
              <h3 
                class="card-title" 
                v-html="destacarPalavraChave(noticia.titulo)" 
                @click="navegarParaDetalhes(noticia.id)" 
                style="cursor: pointer; color: #007bff; font-size: 1.8rem; font-weight: bold; line-height: 1.5;">
              </h3>
              <p class="card-text" v-html="destacarPalavraChave(noticia.descricao)" style="font-size: 1rem; color: #555;"></p>
              <p class="card-text"><small class="text-muted">Publicado em: {{ formatarData(new Date()) }}</small></p>

              <!-- Ícones de edição e remoção -->
              <div class="d-flex align-items-center">
                <a @click="editarNoticia(noticia)" class="text-warning me-3" style="cursor: pointer; font-size: 1.3rem;" title="Editar">
                  <i class="fas fa-edit"></i>
                </a>

                <a @click="removerNoticia(noticia.id)" class="text-danger" style="cursor: pointer; font-size: 1.3rem;" title="Remover">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

   <!-- Exibir notícias de Saúde Mental filtradas -->
<div v-if="noticiasFiltradas.noticiasFiltradasSaudeMental.length">
  <h2 class="centralizado" style="text-decoration: none; margin-top: 4%; font-size: 2.5rem; font-weight: bold;">Quais são as Boas Novas de hoje?</h2>
  <div class="card-group custom-card-group">
    <div class="card custom-card" v-for="(noticia, index) in noticiasFiltradas.noticiasFiltradasSaudeMental" :key="index">
      <img :src="noticia.urlToImage" class="card-img-top" alt="Imagem da notícia" style="object-fit: cover; height: 200px; border-radius: 8px;">
      <div class="card-body">
        <a :href="noticia.url" target="_blank">
          <h3 class="card-title" v-html="destacarPalavraChave(noticia.title)" style="font-size: 1.8rem; font-weight: bold;"></h3>
        </a>
        <p class="card-text" v-html="destacarPalavraChave(noticia.description)" style="font-size: 1rem; color: #555;"></p>
        <p class="card-text"><small class="text-muted">Publicado em: {{ formatarData(noticia.publishedAt) }}</small></p>
      </div>
    </div>
  </div>
</div>

  </body>
</template>

<style scoped>
.custom-card-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem; /* Maior espaçamento entre os cards */
  margin-top: 30px;
  padding: 0 5%; /* Distância das bordas da tela (esquerda e direita) */
}

/* Estilo base para todos os cards */
.custom-card {
  max-width: 100%; /* Os cards ocupam 100% da largura disponível no grid */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra suave para mais leveza */
  border-radius: 8px; /* Bordas mais suaves */
  overflow: hidden; /* Garantir que a imagem fique dentro da borda */
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease; /* Transições suaves */
  display: flex;
  flex-direction: column;
  background-color: #fff; /* Fundo branco para o card */
}

.custom-card:hover {
  transform: translateY(-5px); /* Elevação suave ao passar o mouse */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Aumenta a sombra no hover */
  opacity: 0.95; /* Leve transparência */
}

.custom-card .card-body {
  padding: 1rem; /* Espaciamento suave para o conteúdo */
  flex: 1;
  color: #333; /* Cor de texto escura */
}

.custom-card img {
  object-fit: cover;
  height: 200px; /* Tamanho da imagem ajustado */
  width: 100%; /* Imagem ocupa toda a largura */
  border-bottom: 3px solid #f0f0f0; /* Linha sutil abaixo da imagem */
}

.custom-card .card-title {
  font-size: 1.5rem; /* Tamanho do título ajustado */
  font-weight: 600;
  color: #333; /* Cor mais escura para o título */
  margin-top: 1rem;
}

.custom-card .card-text {
  font-size: 1rem;
  color: #555; /* Cor mais suave para o texto */
  margin-top: 0.5rem;
}

.custom-card .text-muted {
  font-size: 0.9rem;
  color: #999;
}

.custom-card a {
  text-decoration: none;
  color: inherit; /* Garantir que o link herde a cor do título */
}

.custom-card a:hover {
  text-decoration: underline; /* Sublinha no hover do link */
}

/* Cards com Layout Grande - para cards com mais destaque */
.custom-card-grande {
  grid-column: span 2; /* Este card ocupa duas colunas no grid */
  max-width: 100%;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15); /* Sombra mais intensa */
  background-color: #f8f8f8; /* Fundo ligeiramente cinza */
}

.custom-card-grande img {
  height: 250px; /* Imagem um pouco maior */
  border-bottom: 5px solid #ccc;
}

/* Cards com Layout Pequeno - para cards mais compactos */
.custom-card-pequeno {
  max-width: 250px; /* Cartão pequeno */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #e9e9e9; /* Fundo suave */
  padding: 1rem;
}

.custom-card-pequeno .card-body {
  padding: 1rem;
}

.custom-card-pequeno img {
  height: 150px; /* Menor altura para a imagem */
  border-bottom: 2px solid #ccc;
}

/* Responsividade para telas médias */
@media (max-width: 1024px) {
  .custom-card-group {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 2rem; /* Diminui o espaçamento nas margens */
  }

  .custom-card-grande {
    grid-column: span 1; /* Em telas menores, o card grande volta para ocupar 1 coluna */
  }
}

/* Responsividade para telas pequenas */
@media (max-width: 768px) {
  .custom-card-group {
    grid-template-columns: 1fr;
    padding: 0 1rem; /* Menor espaçamento para telas pequenas */
  }
}

  .highlight {
    background-color: yellow;
    font-weight: bold;
  }

  .centralizado {
    text-align: center;
  }

  h2 {
    font-size: 2.5rem;
    margin-top: 3%;
    margin-bottom: 2%;
    font-weight: bold;
  }

  .card {
    margin-bottom: 30px;
    border-radius: 8px;
    border: none;
  }

  .card-body {
    padding: 20px;
    overflow-y: auto;
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

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 8px 0 0 8px;
  }

  .row {
    display: flex;
    gap: 20px;
    margin-left: -3%;
    width: 450%;
  }

  .col-md-4 {
    max-width: 35%;
    flex: 1;
  }

  .col-md-8 {
    flex: 2;
  }

  @media (max-width: 768px) {
    img {
      height: auto;
      width: 100%;
    }

    .card-body {
      text-align: center;
    }

    .col-md-4, .col-md-8 {
      max-width: 100%;
      flex: 1;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.8rem;
    }

    .card-title {
      font-size: 1.6rem;
    }

    .card-text {
      font-size: 0.9rem;
    }
  }
</style>
