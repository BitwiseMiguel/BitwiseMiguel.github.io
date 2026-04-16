const artigosPorPagina = 6;

function getPaginaAtual() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("page")) || 1;
}

let paginaAtual = getPaginaAtual();

function mostrarArtigos() {
  const inicio = (paginaAtual - 1) * artigosPorPagina;
  const fim = inicio + artigosPorPagina;
  const artigosPagina = artigos.slice(inicio, fim);

  const container = document.getElementById("blog-list");
  container.innerHTML = "";

  artigosPagina.forEach(artigo => {
    container.innerHTML += `
      <div class="box" style="background-color: #d6d6d6;">
        <div class="topo">
          <span class="titulo">${artigo.titulo}</span>
        </div>
        <div class="descricao">${artigo.descricao}</div>
        <a href="${artigo.link}">Ler artigo</a>
      </div>
    `;
  });

  criarPaginacao();
}

function criarPaginacao() {
  const totalPaginas = Math.ceil(artigos.length / artigosPorPagina);
  const paginacao = document.getElementById("pagination");

  paginacao.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    paginacao.innerHTML += `
      <button onclick="irParaPagina(${i})" class="${i === paginaAtual ? 'active' : ''}">
        ${i}
      </button>
    `;
  }
}

function irParaPagina(pagina) {
  window.location.search = "?page=" + pagina;
}

mostrarArtigos();