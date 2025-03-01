document.addEventListener("DOMContentLoaded", () => {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let listaCarrinho = document.getElementById("listaCarrinho");
    let totalElement = document.getElementById("total");
    let total = 0;

    function atualizarCarrinho() {
        listaCarrinho.innerHTML = "";
        total = 0;

        if (carrinho.length === 0) {
            listaCarrinho.innerHTML = "<p>O carrinho está vazio.</p>";
            totalElement.textContent = "0.00";
            return;
        }

        carrinho.forEach((produto, index) => {
            let item = document.createElement("li");
            item.innerHTML = `
                <div class="item-carrinho">
                    <img src="${produto.imagem}" alt="${produto.nome}" class="img-carrinho">
                    <div>
                        <p>${produto.nome}</p>
                        <p>Preço: ${produto.preco}€</p>
                        <p>Quantidade: ${produto.quantidade}</p>
                        <button class="remover" data-index="${index}">❌</button>
                    </div>
                </div>
            `;
            listaCarrinho.appendChild(item);
            total += produto.preco * produto.quantidade;
        });

        totalElement.textContent = total.toFixed(2);

        // Adicionar eventos para remover itens do carrinho
        document.querySelectorAll(".remover").forEach(botao => {
            botao.addEventListener("click", (event) => {
                let index = event.target.getAttribute("data-index");
                carrinho.splice(index, 1);
                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                atualizarCarrinho();
            });
        });
    }

    atualizarCarrinho();

    document.getElementById("finalizarCompra").addEventListener("click", () => {
        if (carrinho.length === 0) {
            alert("O carrinho está vazio!");
            return;
        }
        alert("Compra finalizada com sucesso!");
        localStorage.removeItem("carrinho");
        atualizarCarrinho();
    });

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "login.html";
    });
});
