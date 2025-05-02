const listaProdutos = [
    {
      nome: "AirPod Ultra Fire",
      precoAntigo: "200€",
      precoNovo: "150€",
      imagem: "./imagens/airpods/airpod1.webp",
      categoria: "AirPod"
    },
    {
      nome: "AirPod Ultra Water",
      precoAntigo: "200€",
      precoNovo: "160€",
      imagem: "./imagens/airpods/airpod2.webp",
      categoria: "AirPod"
    },
    {
      nome: "AirPod Ultra Air",
      precoAntigo: "200€",
      precoNovo: "170€",
      imagem: "./imagens/airpods/airpod3.webp",
      categoria: "AirPod"
    },
    {
      nome: "AirPod Spider",
      precoAntigo: "200€",
      precoNovo: "180€",
      imagem: "./imagens/airpods/airpod4.webp",
      categoria: "AirPod"
    },
    {
      nome: "Iphone Dourado",
      precoAntigo: "300€",
      precoNovo: "240€",
      imagem: "./imagens/iphones/iphonedourado.webp",
      categoria: "Iphone"
    },
    {
      nome: "Iphone Preto",
      precoAntigo: "3200€",
      precoNovo: "2860€",
      imagem: "./imagens/iphones/iphonepreto.webp",
      categoria: "Iphone"
    },
    {
      nome: "Iphone Vermelho",
      precoAntigo: "2200€",
      precoNovo: "1420€",
      imagem: "./imagens/iphones/iphonevermelho.webp",
      categoria: "Iphone"
    },
    {
      nome: "Iphone Azul",
      precoAntigo: "2000€",
      precoNovo: "1570€",
      imagem: "./imagens/iphones/iphoneazul.webp",
      categoria: "Iphone"
    },
    {
      nome: "Apple Watch Verde",
      precoAntigo: "300€",
      precoNovo: "170€",
      imagem: "./imagens/watch/watchverde.webp",
      categoria: "AppleWatch"
    },
    {
      nome: "Apple Watch Vermelho",
      precoAntigo: "400€",
      precoNovo: "220€",
      imagem: "./imagens/watch/watchvermelho.webp",
      categoria: "AppleWatch"
    },
    {
      nome: "Apple Watch Preto",
      precoAntigo: "500€",
      precoNovo: "330€",
      imagem: "./imagens/watch/watchpreto.webp",
      categoria: "AppleWatch"
    },
    {
      nome: "Apple Watch Azul",
      precoAntigo: "100€",
      precoNovo: "40€",
      imagem: "./imagens/watch/watchazul.webp",
      categoria: "AppleWatch"
    }
  ];
  
  
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

// Variável para manter todas as categorias visiveis
let categoriaAtiva = null;

function exibir_categoria(categoria) {
    const elementos = document.getElementsByClassName('produto');
    console.log(elementos); // Para depuração, ver todos os elementos uma vez.

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
            console.log(elemento.id); // Imprime o ID de cada elemento.
            if (categoria === elemento.id) {
                elemento.style.display = "block"; // mostra a categoria selecionada
            } else {
                elemento.style.display = "none"; // esconde os outros elementos nao selecionados
            }
        });
    }
};
