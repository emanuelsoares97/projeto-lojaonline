// Carregamento dos produtos do ficheiro JSON
async function carregarProdutos() {
  try {
    // Determina se está rodando no GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    const baseUrl = isGitHubPages ? '/projeto-recordeportugallojaeletro' : '';
    
    const response = await fetch(baseUrl + '/data/produtos.json');
    const data = await response.json();
    
    // Ajusta os caminhos das imagens para o GitHub Pages
    if (isGitHubPages) {
      data.produtos = data.produtos.map(produto => ({
        ...produto,
        imagem: baseUrl + produto.imagem
      }));
    }
    
    return data.produtos;
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return [];
  }
}

// Gestão do carrinho de compras
function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  
  // Verificação de produto existente
  const produtoExistente = carrinho.find(item => item.nome === produto.nome);
  
  if (produtoExistente) {
    produtoExistente.quantidade += 1;
  } else {
    carrinho.push({
      nome: produto.nome,
      preco: parseFloat(produto.preco),
      imagem: produto.imagem,
      quantidade: 1
    });
  }
  
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  mostrarNotificacao("Produto adicionado ao carrinho!");
}

// Função para mostrar notificação
function mostrarNotificacao(mensagem) {
  // Verifica se já existe uma notificação e remove
  const notificacaoExistente = document.querySelector('.notificacao');
  if (notificacaoExistente) {
    notificacaoExistente.remove();
  }

  // Cria o elemento de notificação
  const notificacao = document.createElement('div');
  notificacao.classList.add('notificacao');
  notificacao.textContent = mensagem;

  // Adiciona ao corpo do documento
  document.body.appendChild(notificacao);

  // Remove a notificação após 3 segundos
  setTimeout(() => {
    notificacao.remove();
  }, 3000);
}

// Renderização dos produtos na interface
function renderizarProdutos(listaProdutos) {
  const container = document.getElementById("produtos");
  
  listaProdutos.forEach(produto => {
    const div = document.createElement("div");
    div.classList.add("produto");
    div.id = produto.categoria;
    div.setAttribute("data-nome", produto.nome);
    div.setAttribute("data-preco", produto.precoNovo.replace("€", "")); 
  
    const img = document.createElement("img");
    img.src = produto.imagem;
    img.alt = produto.nome;
  
    const descricao = document.createElement("p");
    descricao.classList.add("descricao");
    descricao.textContent = produto.nome;
  
    const precoAntigo = document.createElement("p");
    precoAntigo.classList.add("preco-antigo");
    precoAntigo.textContent = produto.precoAntigo;
  
    const precoNovo = document.createElement("p");
    precoNovo.classList.add("preco-novo");
    precoNovo.textContent = produto.precoNovo;
  
    const botao = document.createElement("button");
    botao.classList.add("add-carrinho");
    botao.textContent = "Adicionar ao Carrinho";
    
    // Gestão do evento de clique para adicionar ao carrinho
    botao.addEventListener("click", () => {
      adicionarAoCarrinho({
        nome: produto.nome,
        preco: parseFloat(produto.precoNovo.replace("€", "")),
        imagem: produto.imagem
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
  const produtos = await carregarProdutos();
  renderizarProdutos(produtos);

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
let categoriaAtiva = null;

function exibir_categoria(categoria) {
    const elementos = document.getElementsByClassName('produto');

    if (categoria === categoriaAtiva) {
        // Exibição de todos os produtos ao clicar numa categoria já ativa
        Array.from(elementos).forEach(elemento => {
            elemento.style.display = "block";
        });
        categoriaAtiva = null;
    } else {
        // Filtragem dos produtos por categoria
        categoriaAtiva = categoria;

        Array.from(elementos).forEach(elemento => {
            if (categoria === elemento.id) {
                elemento.style.display = "block";
            } else {
                elemento.style.display = "none";
            }
        });
    }
}
