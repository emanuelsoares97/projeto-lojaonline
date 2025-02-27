//funçao para o carrosel

console.log(document.querySelector(".carousel-container")); // Deve mostrar o container
console.log(document.querySelectorAll(".carousel-item")); // Deve mostrar as imagens
console.log(document.getElementById("prev")); // Deve mostrar o botão "❮"
console.log(document.getElementById("next")); // Deve mostrar o botão "❯"



document.addEventListener("DOMContentLoaded", function () {
    console.log("JS carregado!");

    const container = document.querySelector(".carousel-container");
    const items = document.querySelectorAll(".carousel-item");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    if (!container || !items.length || !prev || !next) {
        console.error("Erro: Elementos do carrossel não encontrados!");
        return;
    }

    let index = 0;

    function showSlide(i) {
        index = (i + items.length) % items.length;
        container.style.transform = `translateX(-${index * 100}%)`;
    }

    prev.addEventListener("click", () => showSlide(index - 1));
    next.addEventListener("click", () => showSlide(index + 1));

    console.log("Carrossel carregado com sucesso!");
});
