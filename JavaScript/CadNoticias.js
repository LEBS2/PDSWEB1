// Função para abrir o campo de arquivo quando a imagem é clicada
document.getElementById('UploadArquivos').addEventListener('click', function () {
    document.getElementById('file').click(); // Simula o clique no input file
});

// Função para substituir a imagem do botão de upload pela imagem escolhida
function replaceImage(event) {
    const file = event.target.files[0]; // Captura o arquivo selecionado
    const reader = new FileReader(); // Cria um leitor de arquivos

    if (file) {
        reader.onload = function (e) {
            // Substitui a imagem do botão de upload pela imagem escolhida
            const uploadImage = document.getElementById('UploadArquivos');
            uploadImage.src = e.target.result; // Substitui o src da imagem do botão de upload

            // Salva a imagem no localStorage
            localStorage.setItem('imagemUpload', e.target.result); // Salva a imagem no localStorage
        };

        // Lê o arquivo como uma URL (data URL)
        reader.readAsDataURL(file);
    }
}

// Ao carregar a página, verifica se há uma imagem salva no localStorage
window.onload = function () {
    const savedImage = localStorage.getItem('imagemUpload');
    if (savedImage) {
        document.getElementById('UploadArquivos').src = savedImage; // Define a imagem salva como o src
    }
};

function formatText(command) {
    document.execCommand(command, false, null);
}

function clearContent() {
    document.getElementById('editor').innerHTML = '';
}

function changeFontSize(size) {
    if (size) {
        document.execCommand('fontSize', false, size);
    }
}

function changeFontFamily(font) {
    if (font) {
        document.execCommand('fontName', false, font);
    }
}

function changeTextColor(color) {
    document.execCommand('foreColor', false, color);
}