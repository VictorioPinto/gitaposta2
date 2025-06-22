document.addEventListener("DOMContentLoaded", async function () {
  const noticiasContainer = document.createElement("section");
  noticiasContainer.className = "noticias";
  noticiasContainer.innerHTML = `<h2>Notícias sobre apostas</h2><ul id="lista-noticias"></ul>`;
  document.querySelector("main").appendChild(noticiasContainer);

  const lista = document.getElementById("lista-noticias");
  lista.innerHTML = "<li>Carregando notícias...</li>";

  try {
    const resp = await fetch(
      "https://gnews.io/api/v4/search?q=bet+aposta&lang=pt&token=b9177d3e708eab9d7a16d82276d60032"
    );
    const data = await resp.json();
    lista.innerHTML = "";

    if (data.articles && data.articles.length > 0) {
      data.articles.forEach((artigo) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <a href="${artigo.url}" target="_blank" rel="noopener">
            <strong>${artigo.title}</strong>
          </a>
          <br>
          <span style="font-size:0.95em;color:#aaa;">${
            artigo.publishedAt
              ? new Date(artigo.publishedAt).toLocaleDateString()
              : ""
          } - ${artigo.source?.name || ""}</span>
          <br>
          <span>${artigo.description || ""}</span>
        `;
        lista.appendChild(li);
      });
    } else {
      lista.innerHTML = "<li>Nenhuma notícia encontrada.</li>";
    }
  } catch (err) {
    lista.innerHTML = "<li>Erro ao carregar notícias.</li>";
  }
});
