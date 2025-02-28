//funçao para o carrosel

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
    let interval;

    function showSlide(i) {
        index = (i + items.length) % items.length;
        container.style.transform = `translateX(-${index * 100}%)`;
    }

    prev.addEventListener("click", () => {
        showSlide(index - 1);
        resetInterval();
    });

    next.addEventListener("click", () => {
        showSlide(index + 1);
        resetInterval();
    });

    function startInterval() {
        interval = setInterval(() => {
            showSlide(index + 1);
        }, 4000); // Muda a imagem a cada 8000 milissegundos (8 segundos)
    }

    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }

    startInterval(); // Inicia o intervalo quando o documento é carregado

    console.log("Carrossel carregado com sucesso!");
});
