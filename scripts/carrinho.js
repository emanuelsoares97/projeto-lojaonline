document.addEventListener("DOMContentLoaded", () => {
    const listaCarrinho = document.getElementById("listaCarrinho");
    const totalElement = document.getElementById("total");
    const finalizarCompra = document.getElementById("finalizarCompra");
    
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    function atualizarCarrinho() {
        listaCarrinho.innerHTML = "";
        let total = 0;
        carrinho.forEach((produto, index) => {
            let item = document.createElement("li");
            item.textContent = `${produto.nome} - ${produto.preco}€`;
            listaCarrinho.appendChild(item);
            total += produto.preco;
        });
        totalElement.textContent = total.toFixed(2);
    }
    
    atualizarCarrinho();
    
    finalizarCompra.addEventListener("click", () => {
        alert("Compra Finalizada!");
        localStorage.removeItem("carrinho");
        atualizarCarrinho();
    });
});