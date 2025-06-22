let cadastro = document.querySelector(".config-usuario");
let site = document.querySelector(".config-site");
let login = document.getElementById("login");
let nome = document.getElementById("nome");
let email = document.getElementById("email");
let nomeAnonimo = document.getElementById("nomeAnonimo");

// Garante que usuarioCorrente está carregado do sessionStorage
function getUsuarioCorrente() {
  if (!window.usuarioCorrente) {
    const user = sessionStorage.getItem("usuarioCorrente");
    if (user) window.usuarioCorrente = JSON.parse(user);
  }
  return window.usuarioCorrente;
}

window.addEventListener("DOMContentLoaded", () => {
  getUsuarioCorrente();
  opencadastro();
  preencherRadios();
});

function opencadastro() {
  cadastro.classList.add("active");
  site.classList.remove("active");
  document.getElementById("troca-senha").classList.remove("active");
  // Preenche os campos do formulário com os dados do usuário corrente, se existir
  const user = getUsuarioCorrente();
  if (user) {
    login.value = user.login || "";
    nome.value = user.nome || "";
    email.value = user.email || "";
    nomeAnonimo.value = user.nomeAnonimo || "";
  }
  preencherRadios();
}

function opensite() {
  cadastro.classList.remove("active");
  site.classList.add("active");
  document.getElementById("troca-senha").classList.remove("active");
  preencherRadios();
}

// Preenche os radios de modoClaro e modoAnonimo conforme o usuário
function preencherRadios() {
  const user = getUsuarioCorrente();
  if (!user) return;
  // modoClaro
  document
    .querySelectorAll('input[type="radio"][name="modoClaro"]')
    .forEach((radio) => {
      radio.checked =
        (radio.value === "true" && user.modoClaro === true) ||
        (radio.value === "false" && user.modoClaro === false);
    });
  // modoAnonimo
  document
    .querySelectorAll('input[type="radio"][name="modoAnonimo"]')
    .forEach((radio) => {
      radio.checked =
        (radio.value === "true" && user.modoAnonimo === true) ||
        (radio.value === "false" && user.modoAnonimo === false);
    });
}

// Atualiza cadastro (agora usando PATCH)
document
  .getElementById("form-configuracoes")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const user = getUsuarioCorrente();
    if (!user) return;
    // Atualize apenas os campos do formulário
    const patchData = {
      login: login.value,
      nome: nome.value,
      email: email.value,
      nomeAnonimo: nomeAnonimo.value,
    };
    try {
      const response = await fetch(
        "http://localhost:3000/usuarios/" + user.id,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patchData),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar o usuário");
      }

      const result = await response.json();
      // Atualiza sessionStorage
      sessionStorage.setItem("usuarioCorrente", JSON.stringify(result));
      window.usuarioCorrente = result;
      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      alert("Ocorreu um erro ao atualizar o usuário. Tente novamente.");
    }
  });

// Para o grupo modoClaro (agora usando PATCH)
document
  .querySelectorAll('input[type="radio"][name="modoClaro"]')
  .forEach(function (radio) {
    radio.addEventListener("change", async function () {
      const user = getUsuarioCorrente();
      if (!user) return;
      const patchData = { modoClaro: this.value === "true" };
      try {
        const response = await fetch(
          "http://localhost:3000/usuarios/" + user.id,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patchData),
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao atualizar o modo claro");
        }

        const result = await response.json();
        sessionStorage.setItem("usuarioCorrente", JSON.stringify(result));
        window.usuarioCorrente = result;
        console.log("Usuário atualizado:", result);
      } catch (error) {
        console.error("Erro ao atualizar o usuário:", error);
        alert("Ocorreu um erro ao atualizar o modo claro. Tente novamente.");
      }
    });
  });

// Para o grupo modoAnonimo (agora usando PATCH)
document
  .querySelectorAll('input[type="radio"][name="modoAnonimo"]')
  .forEach(function (radio) {
    radio.addEventListener("change", async function () {
      const user = getUsuarioCorrente();
      if (!user) return;
      const patchData = { modoAnonimo: this.value === "true" };
      try {
        const response = await fetch(
          "http://localhost:3000/usuarios/" + user.id,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patchData),
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao atualizar o modo anônimo");
        }

        const result = await response.json();
        sessionStorage.setItem("usuarioCorrente", JSON.stringify(result));
        window.usuarioCorrente = result;
        console.log("Usuário atualizado:", result);
      } catch (error) {
        console.error("Erro ao atualizar o usuário:", error);
        alert("Ocorreu um erro ao atualizar o modo anônimo. Tente novamente.");
      }
    });
  });

function abrirTrocaSenha() {
  cadastro.classList.remove("active");
  site.classList.remove("active");
  document.getElementById("troca-senha").classList.add("active");
}
function fecharTrocaSenha() {
  document.getElementById("troca-senha").classList.remove("active");
  opencadastro();
}

// Troca de senha (mantém PUT para garantir troca completa)
document
  .getElementById("form-troca-senha")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const user = getUsuarioCorrente();
    if (!user) return;
    const senhaAtual = document.getElementById("senha-atual").value;
    const novaSenha = document.getElementById("nova-senha").value;
    if (senhaAtual !== user.senha) {
      alert("Senha atual incorreta!");
      return;
    }
    if (novaSenha.length < 4) {
      alert("A nova senha deve ter pelo menos 4 caracteres.");
      return;
    }
    user.senha = novaSenha;
    try {
      const response = await fetch(
        "http://localhost:3000/usuarios/" + usuarioCorrente.id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuarioCorrente),
        }
      );
      if (!response.ok) throw new Error("Erro ao atualizar a senha");
      const result = await response.json();
      sessionStorage.setItem("usuarioCorrente", JSON.stringify(result));
      window.usuarioCorrente = result;
      alert("Senha alterada com sucesso!");
      fecharTrocaSenha();
      document.getElementById("form-troca-senha").reset();
    } catch (error) {
      alert("Erro ao atualizar a senha.");
    }
  });
