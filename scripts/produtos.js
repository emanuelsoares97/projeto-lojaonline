// Carregamento dos produtos do ficheiro JSON
async function carregarProdutos() {
  try {
    // Determina se está rodando no GitHub Pages ou localmente
    const isGitHubPages = window.location.hostname.includes('github.io');
    const baseUrl = isGitHubPages ? '/projeto-lojaonline' : '';
    
    const response = await fetch(baseUrl + '/data/produtos.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Ajusta os caminhos das imagens
    data.products = data.products.map(product => ({
      ...product,
      image: baseUrl + product.image
    }));
    
    return data.products;
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return [];
  }
}

// Gestão do carrinho de compras
function adicionarAoCarrinho(product) {
  try {
    console.log('Tentando adicionar produto:', product);
    
    if (!product || !product.name || typeof product.price !== 'number') {
      console.error('Dados do produto inválidos:', product);
      mostrarNotificacao("Erro ao adicionar produto. Dados inválidos.");
      return;
    }
    
    let cart = JSON.parse(localStorage.getItem("carrinho")) || [];
    console.log('Carrinho atual:', cart);
    
    // Verificação de produto existente
    const existingProduct = cart.find(item => item.nome === product.name);
    console.log('Produto existente?', existingProduct);
    
    if (existingProduct) {
      existingProduct.quantidade = (existingProduct.quantidade || 1) + 1;
      console.log('Quantidade atualizada para:', existingProduct.quantidade);
    } else {
      const newProduct = {
        nome: product.name,
        preco: product.price,
        imagem: product.image,
        quantidade: 1
      };
      console.log('Novo produto a ser adicionado:', newProduct);
      cart.push(newProduct);
    }
    
    console.log('Carrinho após adição:', cart);
    localStorage.setItem("carrinho", JSON.stringify(cart));
    mostrarNotificacao("Produto adicionado ao carrinho!");
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
    mostrarNotificacao("Erro ao adicionar produto ao carrinho. Por favor, tente novamente.");
  }
}

// Função para mostrar notificação
function mostrarNotificacao(mensagem) {
  // Verifica se já existe uma notificação e remove
  const notificacaoExistente = document.querySelector('.notification');
  if (notificacaoExistente) {
    notificacaoExistente.remove();
  }

  // Cria o elemento de notificação
  const notificacao = document.createElement('div');
  notificacao.classList.add('notification');
  notificacao.textContent = mensagem;

  // Adiciona ao corpo do documento
  document.body.appendChild(notificacao);

  // Remove a notificação após 3 segundos
  setTimeout(() => {
    notificacao.remove();
  }, 3000);
}

// Renderização dos produtos na interface
function renderizarProdutos(productList) {
  console.log('Produtos a serem renderizados:', productList);
  const container = document.getElementById("produtos");
  
  productList.forEach(product => {
    console.log('Renderizando produto:', product);
    const div = document.createElement("div");
    div.classList.add("produto");
    div.id = product.category;
    div.setAttribute("data-nome", product.name);
    
    // Remove o símbolo € e converte para número
    const price = parseFloat(product.newPrice.replace("€", "").trim());
    div.setAttribute("data-preco", price.toString());
  
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
  
    const descricao = document.createElement("p");
    descricao.classList.add("descricao");
    descricao.textContent = product.name;
  
    const precoAntigo = document.createElement("p");
    precoAntigo.classList.add("preco-antigo");
    precoAntigo.textContent = product.oldPrice;
  
    const precoNovo = document.createElement("p");
    precoNovo.classList.add("preco-novo");
    precoNovo.textContent = product.newPrice;
  
    const botao = document.createElement("button");
    botao.classList.add("add-carrinho");
    botao.textContent = "Adicionar ao Carrinho";
    
    // Gestão do evento de clique para adicionar ao carrinho
    botao.addEventListener("click", () => {
      console.log('Botão clicado para o produto:', product.name);
      const price = parseFloat(product.newPrice.replace("€", "").trim());
      console.log('Preço convertido:', price);
      
      if (isNaN(price)) {
        console.error('Erro ao converter preço:', product.newPrice);
        mostrarNotificacao("Erro ao adicionar produto. Por favor, tente novamente.");
        return;
      }
      
      adicionarAoCarrinho({
        name: product.name,
        price: price,
        image: product.image
      });
    });
  
    // Montagem do card do produto
    div.appendChild(img);
    div.appendChild(descricao);
    div.appendChild(precoAntigo);
    div.appendChild(precoNovo);
    div.appendChild(botao);
  
    container.appendChild(div);
  });
}

// Inicializa a aplicação
document.addEventListener('DOMContentLoaded', async () => {
  const products = await carregarProdutos();
  renderizarProdutos(products);

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
});

// Gestão da visualização por categorias
let activeCategory = null;

function exibir_categoria(category) {
    const elements = document.getElementsByClassName('produto');

    if (category === activeCategory) {
        // Exibição de todos os produtos ao clicar numa categoria já ativa
        Array.from(elements).forEach(element => {
            element.style.display = "block";
        });
        activeCategory = null;
    } else {
        // Filtragem dos produtos por categoria
        activeCategory = category;

        Array.from(elements).forEach(element => {
            if (category === element.id) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        });
    }
}
