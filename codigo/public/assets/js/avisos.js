// Exemplo de busca de avisos do backend (JSON Server: /avisos)
document.addEventListener("DOMContentLoaded", async function () {
  const avisosDiv = document.getElementById("avisos-lista");
  avisosDiv.innerHTML = "<p>Carregando avisos...</p>";
  try {
    const resp = await fetch("http://localhost:3000/avisos");
    const avisos = await resp.json();
    if (avisos.length === 0) {
      avisosDiv.innerHTML = "<p>Nenhum aviso cadastrado.</p>";
    } else {
      avisosDiv.innerHTML = "<ul style='padding-left:0;'>";
      avisos.forEach((aviso) => {
        avisosDiv.innerHTML += `
              <li style="margin-bottom:1.5em;list-style:none;border-bottom:1px solid #383736;padding-bottom:1em;">
                <strong style="color:#ff7645;">${aviso.titulo}</strong><br>
                <span style="color:#aaa;font-size:0.95em;">${
                  aviso.data || ""
                }</span><br>
                <span>${aviso.texto}</span>
              </li>
            `;
      });
      avisosDiv.innerHTML += "</ul>";
    }
  } catch (err) {
    avisosDiv.innerHTML = "<p>Erro ao carregar avisos.</p>";
  }
});
