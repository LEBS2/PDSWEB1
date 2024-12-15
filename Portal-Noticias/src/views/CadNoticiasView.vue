<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

<!Doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cadastro de Notícias</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
  <body>
    
    <nav style="background-color: white !important; margin: 5%;" class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="nav-link active" aria-current="page" href="HomeView.vue">Voltar</a><p style="visibility: hidden;">oiiii</p>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="PaginaInicialView.vue">Início</a>
              </li>
            </ul>
        
                <a class="nav-link active" aria-current="page" href="LoginView.vue">Sign out</a>
    
          </div>
        </div>
      </nav>

    <form class="formulario">
       
        <img id="logoImage" src="../assets/LogoBoasNovas.png" alt="Logo">
        
        <!-- Imagem clicável para abrir o input file -->
        <label for="file" id="UploadArquivosLabel">
            <img id="UploadArquivos" src="../assets/icone-simbolo-imagem-vetor.jpg" alt="Clique para escolher um arquivo" style="cursor: pointer;">
        </label>

        <div class="mb-4">
            <div class="mb-3">
                <label for="file" class="form-label">Escolha o arquivo</label>
                <!-- O input file agora está escondido -->
                 <input class="form-control" id="imagemSelecionada">
                <input class="form-control" id="file" name="file" type="file" required onchange="replaceImage(event)" style="display: none;">
            </div>

            <div class="mb-3">
                <label for="file" class="form-label">Título</label>
                <!-- O input file agora está escondido -->
                <input style="font-size: 32px; color: black" class="form-control" type="text">
            </div>  

            <br>

            <div id="descricaoTXT">
                <label style="color: white; font-size: 20px; margin-left: 28.5%;" for="description" class="form-label">Descrição da Notícia</label>
                <div class="editor-container">
                  <div class="toolbar">
                      <button onclick="formatText('bold')"><b>B</b></button>
                      <button onclick="formatText('italic')"><i>I</i></button>
                      <button onclick="formatText('underline')"><u>U</u></button>
                      <button onclick="formatText('insertOrderedList')">OL</button>
                      <button onclick="formatText('insertUnorderedList')">UL</button>
                      <button onclick="clearContent()">Limpar</button>
                      <select onchange="changeFontSize(this.value)">
                          <option value="">Tamanho da Fonte</option>
                          <option value="1">Pequeno</option>
                          <option value="3">Normal</option>
                          <option value="5">Grande</option>
                          <option value="7">Muito Grande</option>
                      </select>
                      <select onchange="changeFontFamily(this.value)">
                          <option value="">Fonte</option>
                          <option value="Arial">Arial</option>
                          <option value="Courier New">Courier New</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Times New Roman">Times New Roman</option>
                          <option value="Verdana">Verdana</option>
                      </select>
                      
                      <input style="margin-top: 5%;" id="color" type="color" onchange="changeTextColor(this.value)" title="Mudar Cor">
                  </div>
                  <div id="editor" contenteditable="true"></div>
              </div>            </div>

            <RouterLink to="/">  
            <button type="submit" class="btn btn-primary" id="submit-btn">CANCELAR</button>
            </RouterLink>

            <RouterLink to="/usuarioHome"> 
            <button type="submit" class="btn btn-primary" id="submit-btn2">PUBLICAR</button>
            </RouterLink>
        </div>
    </form>

  </body>
</html>
  
</template>

<style scoped>

*{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.formulario{
    width: 50%;
    height: 1220px;
    border: 1px solid #030E43;
    border-radius: 5px;
    margin-left: 25%;
    margin-top: 2%;
    margin-bottom: 5%;
    
}

#imagemSelecionada{
    height: 60px;
}

img{
    width: 35%;
    height: 190px;
    margin-left: 33%;
    margin-top: 7%;
}

.form-label{
    margin-left: 25%;
    color: #030E43;
    margin-top: 2%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
}

.form-control{
    margin-left: 25%;
    width: 75%;
    height: 60px;
    border: 1px solid #030E43;
    border-radius: 5px;
    
}

.mb-4{
    margin-right: 20%;
    margin-top: 2%;
}

.form-text{
    margin-left: 25%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
}

.btn-primary{
    margin-left: 30%;
    background-color: #D93939;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    width: 30%;
    height: 50px;
    border: #D93939;
    margin-top: 3%;
}

#submit-btn2{
    margin-left: 64%;
    margin-top: -14%;
    background-color: #2362b4;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    width: 30%;
    height: 50px;
    border: #2362b4;
}

#UploadArquivos{
    width: 10%;
    height: 45px;
    left: 12%;
    margin-top: 13%;
    position: absolute;
    
}

.container-fluid{
    text-decoration: underline;
    color: #030E43;
    margin-top: 0%;
    
}

#descricaoTXT {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-left: 25%;
    padding: 2px;
    background-color: #004AAD;
}

.editor-container {
    border: 1px solid #004AAD;
    border-radius: 5px;
    background-color: #004AAD;
    padding: 1px;
    box-shadow: 0 2px 5px #004AAD;
}

.toolbar {
    margin-bottom: 10px;
}

button, select {
    margin-top: 5%;
    margin-right: 5px;
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid white;
    border-radius: 7px;
    background-color: #004AAD;
    color: white;
}

#editor {
    min-height: 200px;
    border: 1px solid #ccc;
    padding: 10px;
    overflow-y: auto;
    outline: none; /* Remove outline ao focar */
    background-color: white;
}

</style>