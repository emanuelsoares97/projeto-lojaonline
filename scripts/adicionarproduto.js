document.addEventListener("DOMContentLoaded", () => {
    const botoesCarrinho = document.querySelectorAll(".add-carrinho");

    botoesCarrinho.forEach(botao => {
        botao.addEventListener("click", () => {
            const produtoDiv = botao.closest(".produto");
            const nome = produtoDiv.getAttribute("data-nome");
            const preco = produtoDiv.getAttribute("data-preco");
            const imagem = produtoDiv.querySelector("img").src;

            const produto = { nome, preco, imagem, quantidade: 1 };

            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

            const index = carrinho.findIndex(item => item.nome === nome);
            if (index !== -1) {
                // Se o produto já estiver no carrinho, aumenta a quantidade
                carrinho[index].quantidade += 1;
            } else {
                // Se não, adiciona um novo produto
                carrinho.push(produto);
            }

            localStorage.setItem("carrinho", JSON.stringify(carrinho));
        });
    });
});
