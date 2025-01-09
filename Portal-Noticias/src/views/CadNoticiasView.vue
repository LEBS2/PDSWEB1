<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import DAOService from '@/services/DAOService'

const dbService = new DAOService('noticias')

const titulo = ref('')
const descricao = ref('')
const imagemUrl = ref('') // Campo para capturar o link da imagem

// Função para publicar a notícia
const publicarNoticia = async () => {
  const noticia = {
    titulo: titulo.value,
    descricao: descricao.value,
    imagemUrl: imagemUrl.value, // Inclui o link da imagem
  }

  const id = await dbService.insert(noticia)
  alert('Notícia publicada com sucesso!')
  console.log(id)
}

// Função para aplicar estilos
const applyStyle = () => {
  const editor = document.getElementById('editor')
  if (editor) {
    editor.style.fontSize = fontSize.value
    editor.style.fontFamily = fontFamily.value
    editor.style.color = textColor.value
  }
}

// Função para formatar o texto
const formatText = (command) => {
  const selection = window.getSelection()
  const range = selection.getRangeAt(0)
  const newNode = document.createElement(command)
  range.surroundContents(newNode)
}

// Função para limpar o conteúdo
const clearContent = () => {
  descricao.value = ''
  const editor = document.getElementById('editor')
  if (editor) editor.innerHTML = ''
}

// Atualiza o conteúdo de `descricao` a cada mudança no editor
const handleEditorInput = () => {
  const editor = document.getElementById('editor')
  descricao.value = editor.innerHTML
}
</script>

<template>
  <div class="container">
    <nav class="navbar">
      <div class="navbar-container">
        <RouterLink to="/" class="nav-link">Voltar</RouterLink>
        <div class="navbar-links">
          <RouterLink to="/PaginaInicialView" class="nav-link">Início</RouterLink>
          <RouterLink to="/LoginView" class="nav-link">Sign out</RouterLink>
        </div>
      </div>
    </nav>

    <form class="formulario">
      <div class="form-section">
        <label for="imagemUrl" class="form-label">Link da Imagem</label>
        <input class="form-control" id="imagemUrl" v-model="imagemUrl" type="text" placeholder="Insira o link da imagem">
      </div>

      <div class="form-section">
        <label for="titulo" class="form-label">Título</label>
        <input class="form-control" v-model="titulo" type="text" placeholder="Digite o título da notícia">
      </div>

      <div class="form-section">
        <label for="descricao" class="form-label">Descrição da Notícia</label>
        <div class="editor-container">
          <div class="toolbar">
            <button type="button" @click="formatText('b')" class="toolbar-btn">B</button>
            <button type="button" @click="formatText('i')" class="toolbar-btn">I</button>
            <button type="button" @click="formatText('u')" class="toolbar-btn">U</button>
            <button type="button" @click="formatText('ol')" class="toolbar-btn">OL</button>
            <button type="button" @click="formatText('ul')" class="toolbar-btn">UL</button>
            <button type="button" @click="clearContent" class="toolbar-btn">Limpar</button>

            <select v-model="fontSize" @change="applyStyle" class="toolbar-select">
              <option value="small">Pequeno</option>
              <option value="medium">Normal</option>
              <option value="large">Grande</option>
              <option value="x-large">Muito Grande</option>
            </select>

            <select v-model="fontFamily" @change="applyStyle" class="toolbar-select">
              <option value="Arial">Arial</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
            </select>

            <input type="color" v-model="textColor" @change="applyStyle" title="Escolha a cor do texto" class="toolbar-color">
          </div>

          <div
            id="editor"
            contenteditable="true"
            :style="{ fontSize: fontSize, fontFamily: fontFamily, color: textColor }"
            @input="handleEditorInput"
            v-html="descricao"
            class="editor"
          ></div>
        </div>
      </div>

      <div class="form-actions">
        <RouterLink to="/" class="btn btn-cancelar">CANCELAR</RouterLink>
        <RouterLink to="/usuarioHome">
          <button type="button" class="btn btn-publicar" @click="publicarNoticia">PUBLICAR</button>
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Container principal */
.container {
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
}

/* Navbar */
.navbar {
  width: 100%;
  background-color: #004aad;
  padding: 1rem;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  margin-right: 1rem;
}

.navbar-links {
  display: flex;
}

/* Formulário */
.formulario {
  width: 60%;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.editor-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  background-color: white;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.toolbar-btn {
  background-color: #004aad;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
}

.toolbar-btn:hover {
  background-color: #003b8a;
}

.toolbar-select {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.toolbar-color {
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
}

.editor {
  min-height: 200px;
  border: 1px solid #ccc;
  padding: 1rem;
  outline: none;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

.btn-cancelar {
  background-color: #f44336;
  color: white;
}

.btn-cancelar:hover {
  background-color: #d32f2f;
}

.btn-publicar {
  background-color: #4caf50;
  color: white;
}

.btn-publicar:hover {
  background-color: #388e3c;
}
</style>
