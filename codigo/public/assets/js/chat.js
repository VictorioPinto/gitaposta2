const CHAT_API_URL = "http://localhost:3000/mensagens";

const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");
const threeDotsSVG = `
<svg fill="#000000" width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <g>
    <path d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472
      c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"/>
    <path d="M351.938,224C334.266,224,320,238.297,320,255.969S334.266,288,351.938,288C369.672,288,384,273.641,384,255.969
      S369.672,224,351.938,224z"/>
    <path d="M255.938,224C238.266,224,224,238.297,224,255.969S238.266,288,255.938,288C273.672,288,288,273.641,288,255.969
      S273.672,224,255.938,224z"/>
    <path d="M160,224c-17.688,0-32,14.297-32,31.969S142.312,288,160,288c17.656,0,32-14.359,32-32.031S177.656,224,160,224z"/>
  </g>
</svg>
`;
const editSVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const deleteSVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(CHAT_API_URL);
    const msgs = await res.json();
    messages.innerHTML = "";
    msgs.forEach((msg) => {
      addMessage(msg.nome, msg.texto, msg.id_usuario, msg.id);
    });
  } catch (err) {
    console.error("Erro ao carregar mensagens:", err);
  }
});

function addMessage(nome, texto, id_usuario, id) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.dataset.id = id;
  if (id_usuario === usuarioCorrente.id) {
    messageDiv.classList.add("self");
  }

  const label = document.createElement("label");
  label.className = "username";
  label.textContent = nome; // <-- Corrigido aqui

  const p = document.createElement("p");
  p.className = "text";
  p.textContent = texto;
  messageDiv.appendChild(label);

  if (usuarioCorrente.moderador) {
    const configbutton = document.createElement("span");
    configbutton.className = "config-button";
    configbutton.innerHTML = threeDotsSVG;
    configbutton.onclick = function (e) {
      e.stopPropagation();
      let options = messageDiv.querySelector(".options");
      if (options) {
        options.remove();
        return;
      }
      options = document.createElement("div");
      options.className = "options";
      options.innerHTML = `
        <ul style="list-style:none; margin:0; padding:0;">
          <li>
            <button onclick="deleteMessage(${id})" title="Excluir">${deleteSVG} Excluir</button>
          </li>
          <li>
            <button onclick="editMessage(${id}, '${texto.replace(
        /'/g,
        "\\'"
      )}')" title="Editar">${editSVG} Editar</button>
          </li>
        </ul>
      `;
      messageDiv.appendChild(options);
    };
    messageDiv.appendChild(configbutton);
  }
  messageDiv.appendChild(p);
  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;

  // Usa o nome anônimo se o modoAnonimo estiver ativado
  const nomeParaEnviar = usuarioCorrente.modoAnonimo
    ? nomeAnonimoreturn(usuarioCorrente)
    : usuarioCorrente.nome;

  try {
    await fetch(CHAT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nomeParaEnviar,
        texto: text,
        id_usuario: usuarioCorrente.id,
      }),
    });
    const res = await fetch(CHAT_API_URL);
    const msgs = await res.json();
    messages.innerHTML = "";
    msgs.forEach((msg) => {
      addMessage(msg.nome, msg.texto, msg.id_usuario, msg.id);
    });
    input.value = "";
  } catch (err) {
    alert("Erro ao enviar mensagem!");
  }
});

window.deleteMessage = async function (id) {
  if (!confirm("Tem certeza que deseja excluir esta mensagem?")) return;
  try {
    await fetch(`${CHAT_API_URL}/${id}`, { method: "DELETE" });
    // Após deletar, recarrega as mensagens do backend
    const res = await fetch(CHAT_API_URL);
    const msgs = await res.json();
    messages.innerHTML = "";
    msgs.forEach((msg) => {
      addMessage(msg.nome, msg.texto, msg.id_usuario, msg.id);
    });
  } catch (err) {
    alert("Erro ao excluir mensagem!");
  }
};

window.editMessage = async function (id, oldText) {
  const newText = prompt("Editar mensagem:", oldText);
  if (newText === null || newText.trim() === "") return;
  try {
    await fetch(`${CHAT_API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: newText }),
    });
    // Atualiza a mensagem editada na tela
    const res = await fetch(CHAT_API_URL);
    const msgs = await res.json();
    messages.innerHTML = "";
    msgs.forEach((msg) => {
      addMessage(msg.nome, msg.texto, msg.id_usuario, msg.id);
    });
  } catch (err) {
    alert("Erro ao editar mensagem!");
  }
};
