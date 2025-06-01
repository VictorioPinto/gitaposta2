const API_CANDIDATOS = "/candidatos-ajudante";
const API_USUARIOS = "/usuarios";

let usuarioCorrenteb = JSON.parse(sessionStorage.getItem("usuarioCorrente"));
if (!usuarioCorrenteb || !usuarioCorrenteb.moderador) {
  alert("Acesso restrito a administradores.");
  window.location.href = "index.html";
}


async function carregarCandidatos() {
  try {
    const resp = await fetch(API_CANDIDATOS);
    const candidatos = await resp.json();
    const tabela = document.getElementById("tabela-candidatos");
    tabela.innerHTML = "";
    if (candidatos.length === 0) {
      tabela.innerHTML = `<tr><td colspan="4">Nenhum candidato encontrado.</td></tr>`;
      return;
    }
    candidatos.forEach(candidato => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${candidato.nome}</td>
        <td>${candidato.email}</td>
        <td>${candidato.motivacao}</td>
        <td>
          <button onclick="aceitarAjudante('${candidato.email}')">Aceitar</button>
        </td>
      `;
      tabela.appendChild(tr);
    });
  } catch (err) {
    alert("Erro ao carregar candidatos.");
  }
}


async function aceitarAjudante(email) {
  try {

    const respUsuarios = await fetch(API_USUARIOS);
    const usuarios = await respUsuarios.json();
    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) {
      alert("Usuário não encontrado.");
      return;
    }

    await fetch(`${API_USUARIOS}/${usuario.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ajudante: true })
    });


    const respCandidatos = await fetch(API_CANDIDATOS);
    const candidatos = await respCandidatos.json();
    const candidato = candidatos.find(c => c.email === email);
    if (candidato) {
      await fetch(`${API_CANDIDATOS}/${candidato.id}`, { method: "DELETE" });
    }

    alert("Usuário aprovado como ajudante!");
    carregarCandidatos();
  } catch (err) {
    alert("Erro ao aprovar candidato.");
  }
}


window.aceitarAjudante = aceitarAjudante;
window.addEventListener("DOMContentLoaded", carregarCandidatos);