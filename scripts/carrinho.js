import API_CONFIG from './config.js';

document.addEventListener("DOMContentLoaded", () => {
    // Inicialização do carrinho a partir do localStorage
    let cart = JSON.parse(localStorage.getItem("carrinho")) || [];
    let cartList = document.getElementById("listaCarrinho");
    let totalElement = document.getElementById("total");
    let total = 0;

    function updateCart() {
        cartList.innerHTML = "";
        total = 0;

        // Verifica se o carrinho está vazio
        if (cart.length === 0) {
            cartList.innerHTML = "<p>O carrinho está vazio.</p>";
            totalElement.textContent = "0.00";
            return;
        }

        // Renderiza cada item do carrinho
        cart.forEach((product, index) => {
            let item = document.createElement("li");
            item.innerHTML = `
                <div class="item-carrinho">
                    <img src="${product.imagem}" alt="${product.nome}" class="img-carrinho">
                    <div>
                        <p>${product.nome}</p>
                        <p>Preço: ${product.preco}€</p>
                        <p>Quantidade: ${product.quantidade}</p>
                        <button class="remover" data-index="${index}">❌</button>
                    </div>
                </div>
            `;
            cartList.appendChild(item);
            total += product.preco * product.quantidade;
        });

        totalElement.textContent = total.toFixed(2);

        // Gestão dos eventos de remoção de itens
        document.querySelectorAll(".remover").forEach(button => {
            button.addEventListener("click", (event) => {
                let index = event.target.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("carrinho", JSON.stringify(cart));
                updateCart();
            });
        });
    }

    updateCart();

    document.getElementById("finalizarCompra").addEventListener("click", async () => {
        if (cart.length === 0) {
            alert("O carrinho está vazio!");
            return;
        }

        const user = localStorage.getItem("user");
        if (!user) {
            alert("Por favor, faça login para finalizar a compra.");
            window.location.href = "login.html";
            return;
        }

        // Indicador visual de processamento
        const checkoutBtn = document.getElementById("finalizarCompra");
        const originalText = checkoutBtn.textContent;
        checkoutBtn.textContent = "Processando...";
        checkoutBtn.disabled = true;

        // Estruturação dos dados para envio
        const orderData = {
            items: cart.map(item => ({
                name: item.nome,
                quantity: item.quantidade,
                price: item.preco,
                image: item.imagem
            })),
            total: total,
            date: new Date().toISOString(),
            login_name: user,  // Nome do usuário logado
            customer: user,    // Mantendo compatibilidade
            customer_email: "",  // Pode ser adicionado um campo no futuro
            delivery_address: "",  // Pode ser adicionado um campo no futuro
            phone: ""  // Pode ser adicionado um campo no futuro
        };

        console.log('Dados do pedido:', orderData); // Debug dos dados

        try {
            // Envio da encomenda para o servidor
            const response = await fetch(`${API_CONFIG.baseURL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Encomenda realizada com sucesso! Em breve receberá um email com os detalhes.");
                localStorage.removeItem("carrinho");
                updateCart();
                window.location.href = "index.html";
            } else {
                throw new Error(data.message || 'Erro ao processar a encomenda');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert("Ocorreu um erro ao processar sua encomenda. Por favor, tente novamente.");
        } finally {
            // Restauração do estado original do botão
            checkoutBtn.textContent = originalText;
            checkoutBtn.disabled = false;
        }
    });

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "login.html";
    });
});
