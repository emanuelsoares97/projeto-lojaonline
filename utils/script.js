
//função para fechar e abrir menu
document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".menu");
    const menuIcon = document.querySelector(".menu-icon");

    menuIcon.addEventListener("click", function () {
        menu.classList.toggle("active"); // ao clicar aparece e desaparece
    });
});

// Variável para manter todas as categorias visiveis
let categoriaAtiva = null;

function exibir_categoria(categoria) {
    const elementos = document.getElementsByClassName('produto');
    console.log(elementos); // Para depuração, ver todos os elementos uma vez.

    if (categoria === categoriaAtiva) {
        // clicar numa categoria ativa mostra todas
        Array.from(elementos).forEach(elemento => {
            elemento.style.display = "block";
        });
        categoriaAtiva = null; // quando clicar de novo volta a estar todas visiveis
    } else {
        // é onde a categoria é selecionada
        categoriaAtiva = categoria;

        Array.from(elementos).forEach(elemento => {
            console.log(elemento.id); // Imprime o ID de cada elemento.
            if (categoria === elemento.id) {
                elemento.style.display = "block"; // mostra a categoria selecionada
            } else {
                elemento.style.display = "none"; // esconde os outros elementos nao selecionados
            }
        });
    }
}

//funcao para aumentar a imagem quando clicada
document.getElementById('produtos').addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
        // Verifica se a imagem clicada já está ampliada
        const isScaled = e.target.classList.contains('scaled');

        // Primeiro remove a classe 'scaled' de todas as imagens
        document.querySelectorAll('#produtos img').forEach(img => {
            img.classList.remove('scaled');
        });

        // Se a imagem clicada não estava ampliada, amplia-a
        if (!isScaled) {
            e.target.classList.add('scaled');
        }
    }
});




