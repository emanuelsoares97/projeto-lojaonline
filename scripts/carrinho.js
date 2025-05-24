// API Configuration
const API_CONFIG = {
    baseURL: window.location.hostname.includes('github.io')
        ? 'https://projeto-lovepulseiras-api.onrender.com' // URL do Render em produção
        : 'https://projeto-lovepulseiras-api.onrender.com', // Usando Render mesmo em desenvolvimento
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

// Função para verificar se o servidor está acessível
async function checkServerAccess() {
    try {
        const response = await fetch(API_CONFIG.baseURL, {
            method: 'OPTIONS',
            headers: API_CONFIG.headers
        });
        return response.ok;
    } catch (error) {
        console.error('Erro ao verificar acesso ao servidor:', error);
        return false;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    // Verifica se o usuário está autenticado
    const user = localStorage.getItem("user");
    if (!user) {
        // Salva a URL atual para retornar após o login
        const currentPage = window.location.pathname;
        window.location.href = `login.html?returnUrl=${currentPage}`;
        return;
    }

    // Verifica acesso ao servidor
    const serverAccessible = await checkServerAccess();
    if (!serverAccessible) {
        console.warn('Servidor não está acessível ou bloqueado por CORS');
    }

    // Inicialização do carrinho a partir do localStorage
    let cart = JSON.parse(localStorage.getItem("carrinho")) || [];
    console.log('Carrinho carregado:', cart); // Debug
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
            console.log('Renderizando produto:', product); // Debug
            let item = document.createElement("li");
            item.innerHTML = `
                <div class="item-carrinho">
                    <img src="${product.imagem || ''}" alt="${product.nome || ''}" class="img-carrinho">
                    <div>
                        <p>${product.nome || ''}</p>
                        <p>Preço: ${product.preco ? product.preco.toFixed(2) : '0.00'}€</p>
                        <p>Quantidade: ${product.quantidade || 1}</p>
                        <button class="remover" data-index="${index}">❌</button>
                    </div>
                </div>
            `;
            cartList.appendChild(item);

            // Calcula o total usando parseFloat para garantir que é um número
            const itemTotal = (parseFloat(product.preco) || 0) * (parseInt(product.quantidade) || 1);
            total += itemTotal;
            console.log('Total parcial após item:', total); // Debug
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

        // Verifica novamente o acesso ao servidor
        const serverAccessible = await checkServerAccess();
        if (!serverAccessible) {
            alert("Não foi possível conectar ao servidor. O servidor pode estar inacessível ou bloqueando requisições do seu navegador (CORS).\n\nPor favor, tente novamente mais tarde.");
            return;
        }

        const user = localStorage.getItem("user");
        if (!user) {
            const currentPage = window.location.pathname;
            window.location.href = `login.html?returnUrl=${currentPage}`;
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
                quantity: parseInt(item.quantidade) || 1,
                price: parseFloat(item.preco) || 0,
                image: item.imagem || ''
            })),
            total: total,
            date: new Date().toISOString(),
            client: user,
            customer: user,
            customer_email: user,
            login_name: user,
            delivery_address: "Endereço a definir",
            phone: "Telefone a definir"
        };

        // Debug logs detalhados
        console.log('Detalhes do pedido:');
        console.log('Items:', JSON.stringify(orderData.items, null, 2));
        console.log('Total:', orderData.total);
        console.log('User:', user);
        console.log('Request URL:', `${API_CONFIG.baseURL}/api/orders`);
        console.log('Request Headers:', API_CONFIG.headers);
        console.log('Request Body:', JSON.stringify(orderData, null, 2));

        try {
            // Envio da encomenda para o servidor
            const response = await fetch(`${API_CONFIG.baseURL}/api/orders`, {
                method: 'POST',
                headers: API_CONFIG.headers,
                body: JSON.stringify(orderData),
                mode: 'cors',
                credentials: 'omit'
            });

            console.log('Status da resposta:', response.status);
            console.log('Headers da resposta:', Object.fromEntries(response.headers.entries()));

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Resposta de erro do servidor:', errorText);
                console.error('Dados que causaram o erro:', JSON.stringify(orderData, null, 2));
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const data = await response.json();
            console.log('Dados da resposta:', data);

            alert("Encomenda realizada com sucesso! Em breve receberá um email com os detalhes.");
            localStorage.removeItem("carrinho");
            updateCart();
            window.location.href = "index.html";
        } catch (error) {
            console.error('Erro detalhado:', error);
            let errorMessage = "Ocorreu um erro ao processar sua encomenda.";
            
            if (error.message.includes('Failed to fetch')) {
                errorMessage += "\n\nDetalhes do erro:";
                errorMessage += "\n- Servidor: " + API_CONFIG.baseURL;
                errorMessage += "\n- Origem: " + window.location.origin;
                errorMessage += "\n\nPossíveis causas:";
                errorMessage += "\n1. O servidor está offline";
                errorMessage += "\n2. Bloqueio de CORS (o servidor não está configurado para aceitar requisições do seu navegador)";
                errorMessage += "\n3. Problemas de rede";
                errorMessage += "\n\nPor favor, tente novamente mais tarde ou contate o suporte.";
            } else {
                errorMessage += "\nErro: " + error.message;
            }
            
            alert(errorMessage);
        } finally {
            // Restauração do estado original do botão
            checkoutBtn.textContent = originalText;
            checkoutBtn.disabled = false;
        }
    });
});
