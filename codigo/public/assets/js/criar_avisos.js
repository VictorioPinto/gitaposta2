document
  .getElementById("form-aviso")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value.trim();
    const texto = document.getElementById("texto").value.trim();
    const mensagemDiv = document.getElementById("mensagem-aviso");
    mensagemDiv.textContent = "Enviando...";

    if (!titulo || !texto) {
      mensagemDiv.textContent = "Preencha todos os campos.";
      return;
    }

    const data = new Date().toLocaleDateString();

    try {
      const resp = await fetch("http://localhost:3000/avisos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, texto, data }),
      });
      if (!resp.ok) throw new Error("Erro ao criar aviso.");
      mensagemDiv.textContent = "Aviso publicado com sucesso!";
      document.getElementById("form-aviso").reset();
    } catch (err) {
      mensagemDiv.textContent = "Erro ao publicar aviso.";
    }
  });
