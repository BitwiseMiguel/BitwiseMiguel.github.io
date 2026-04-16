function getCurrentPage() {
  return window.location.pathname;
}

function mostrarArtigosRelacionados() {
  const container = document.getElementById("related-posts");
  if (!container) return;

  const atualURL = window.location.pathname;

  const artigoAtual = artigos.find(a =>
    atualURL.includes(a.link)
  );

  if (!artigoAtual || !artigoAtual.relacionados) return;

  artigoAtual.relacionados.forEach(link => {
    const artigo = artigos.find(a => a.link === link);

    if (artigo) {
      container.innerHTML += `<li><a href="${artigo.link}">${artigo.titulo}</a></li>`;
    }
  });
}

document.addEventListener("DOMContentLoaded", mostrarArtigosRelacionados);