const CHAT_API_URL = "http://localhost:3000/candidatos-ajudante";
const form = document.getElementById("form-ajudante");
const usuarioCorrentea = JSON.parse(sessionStorage.getItem("usuarioCorrente"));
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.nome = usuarioCorrentea.nome;
  data.email = usuarioCorrentea.email;

  try {
    const response = await fetch(CHAT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar os dados do candidato");
    }

    const result = await response.json();
    console.log("Candidato enviado com sucesso:", result);
    alert("Candidato enviado com sucesso!");
    form.reset();
  } catch (error) {
    console.error("Erro ao enviar o candidato:", error);
    alert("Ocorreu um erro ao enviar o candidato. Tente novamente.");
  }
});
