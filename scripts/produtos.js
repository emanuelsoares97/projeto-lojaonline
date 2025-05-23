// Fetch dos produtos do arquivo JSON
async function carregarProdutos() {
  try {
    const response = await fetch('../data/produtos.json');
    const data = await response.json();
    return data.produtos;
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return [];
  }
}

// Função para renderizar os produtos
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
  
    // Adiciona tudo ao card
    div.appendChild(img);
    div.appendChild(descricao);
    div.appendChild(precoAntigo);
    div.appendChild(precoNovo);
    div.appendChild(botao);
  
    // Adiciona o card ao container
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

// Variável para manter todas as categorias visiveis
let categoriaAtiva = null;

function exibir_categoria(categoria) {
    const elementos = document.getElementsByClassName('produto');

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
            if (categoria === elemento.id) {
                elemento.style.display = "block"; // mostra a categoria selecionada
            } else {
                elemento.style.display = "none"; // esconde os outros elementos nao selecionados
            }
        });
    }
}
