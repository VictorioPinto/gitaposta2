const CHAT_API_URL = "http://localhost:3000/mensagens";

const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

const username = sessionStorage.getItem("usuarioCorrente")
  ? JSON.parse(sessionStorage.getItem("usuarioCorrente")).nome
  : "Você";

// Carrega mensagens ao abrir o chat
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(CHAT_API_URL);
    const msgs = await res.json();
    messages.innerHTML = ""; // Limpa mensagens antigas
    msgs.forEach((msg) => {
      addMessage(msg.nome, msg.texto);
    });
  } catch (err) {
    console.error("Erro ao carregar mensagens:", err);
  }
});

function addMessage(nome, texto) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  if (nome === username) {
    messageDiv.classList.add("self");
  }

  const label = document.createElement("label");
  label.className = "username";
  label.textContent = nome;

  const p = document.createElement("p");
  p.className = "text";
  p.textContent = texto;

  messageDiv.appendChild(label);
  messageDiv.appendChild(p);

  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;

  try {
    await fetch(CHAT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: username, texto: text }),
    });
    addMessage(username, text);
    input.value = "";
  } catch (err) {
    alert("Erro ao enviar mensagem!");
  }
});
