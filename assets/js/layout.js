async function load(file, target) {
  const res = await fetch(file);
  const html = await res.text();

  console.log("Loaded:", file, html.length);

  document.getElementById(target).innerHTML = html;
}

async function initLayout(title) {
  await load("components/header.html", "header");
  await load("components/nav.html", "nav");
  await load("components/footer.html", "footer");

  const titleEl = document.querySelector("[data-title]");
  if (titleEl) titleEl.textContent = title;
}

function showToast() {
  const t = document.getElementById("toast");
  t.style.display = "block";
  setTimeout(() => t.style.display = "none", 3000);
}

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch("https://formspree.io/f/mzdyzojw", {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });


  if (response.ok) {
    window.location.href = "mensagem-enviada.html";
  } else {
    showToast("Erro ao enviar mensagem");
  }
});
