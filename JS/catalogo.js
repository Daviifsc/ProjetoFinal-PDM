function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('show');
}

let produtosData = []; // Guardar os produtos para uso posterior

let itensCarrinho = 0;


// Registra o Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado com sucesso!'))
    .catch(err => console.log('Erro ao registrar SW:', err));
}

// Carrega os produtos do JSON
document.addEventListener('DOMContentLoaded', () => {
  fetch('DATA/produtos.json')
    .then(res => res.json())
    .then(produtos => {
      produtosData = produtos;
      renderCatalogo(produtos);
    });
});

//  Exibe o catálogo de produtos
function renderCatalogo(produtos) {
  const container = document.getElementById('catalogo');
  container.innerHTML = ''; // Limpa se houver dados antigos

  produtos.forEach((produto, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => mostrarDetalhes(index);

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h2>${produto.nome}</h2>
      <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
    `;
    container.appendChild(card);
  });
}

//  Mostra mais detalhes do produto
function mostrarDetalhes(index) {
  const produto = produtosData[index];
  const detalhe = document.getElementById('detalhes-produto');
  detalhe.innerHTML = `
    <button id="btn-voltar" onclick="voltarCatalogo()"><i class="fa-solid fa-arrow-left fa-lg"></i>Voltar</button>
    <h2>${produto.nome}</h2>
    <img src="${produto.imagem}" alt="${produto.nome}" style="width:100%; max-width:300px">
    <p>${produto.descricao}</p>
    <p id="preco-produto"><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
    <button onclick="adicionarAoCarrinho(${index})"><i class="fa-solid fa-cart-plus fa-lg"></i>Adicionar ao Carrinho</button>
  `;

  document.getElementById('titulo').style.display = 'none';
  document.getElementById('catalogo').style.display = 'none';
  document.getElementById('detalhes-produto').style.display = 'block';
}

//  Retorna a página de catálogo
function voltarCatalogo() {
  document.getElementById('titulo').style.display = 'block';
  document.getElementById('catalogo').style.display = 'grid';
  document.getElementById('detalhes-produto').style.display = 'none';
}

// Adiciona produtos ao carrinho
function adicionarAoCarrinho(index) {
  const produto = produtosData[index];
  itensCarrinho++;
  atualizarCarrinho();
  alert(`"${produto.nome}" adicionado ao carrinho!`);
}

//  Atualiza o contador de produtos adicionados
function atualizarCarrinho() {
  const contador = document.getElementById('contadorItens');
  contador.textContent = `${itensCarrinho} item(s)`;
}


