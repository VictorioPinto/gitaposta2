const LOGIN_URL = "index.html";
let RETURN_URL = "index.html";
const API_URL = "/usuarios";
const usersvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70.188 56.645" width="24" height="24">
  <g>
    <rect x="26.875" y="21.813" width="29" height="4"/>
    <rect x="26.875" y="33.812" width="29" height="4"/>
    <rect x="26.875" y="9.812" width="29" height="4"/>
    <circle cx="19.875" cy="11.812" r="3"/>
    <circle cx="19.875" cy="23.812" r="3"/>
    <circle cx="19.875" cy="35.812" r="3"/>
  </g>
</svg>
`;

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = {};

// Objeto para o usuário corrente
var usuarioCorrente = {};

// Inicializa a aplicação de Login
function initLoginApp() {
  let pagina = window.location.pathname;
  // Permite acesso livre à index.html e à raiz "/"
  if (pagina.endsWith("/index.html") || pagina === "/" || pagina === "/index") {
    // Não exige login na index, mas carrega dados do usuário se existirem
    usuarioCorrenteJSON = sessionStorage.getItem("usuarioCorrente");
    if (usuarioCorrenteJSON) {
      usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
    }
    return;
  }
  if (pagina != LOGIN_URL) {
    // CONFIGURA A URLS DE RETORNO COMO A PÁGINA ATUAL
    sessionStorage.setItem("returnURL", pagina);
    RETURN_URL = pagina;

    // INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
    usuarioCorrenteJSON = sessionStorage.getItem("usuarioCorrente");
    if (usuarioCorrenteJSON) {
      usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
    } else {
      window.location.href = LOGIN_URL;
    }

    // REGISTRA LISTENER PARA O EVENTO DE CARREGAMENTO DA PÁGINA PARA ATUALIZAR INFORMAÇÕES DO USUÁRIO
    document.addEventListener("DOMContentLoaded", function () {
      showUserInfo("userInfo");
    });
  } else {
    // VERIFICA SE A URL DE RETORNO ESTÁ DEFINIDA NO SESSION STORAGE, CASO CONTRARIO USA A PÁGINA INICIAL
    let returnURL = sessionStorage.getItem("returnURL");
    RETURN_URL = returnURL || RETURN_URL;

    // INICIALIZA BANCO DE DADOS DE USUÁRIOS
    carregarUsuarios(() => {
      console.log("Usuários carregados...");
    });
  }
}

function carregarUsuarios(callback) {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      db_usuarios = data;
      callback();
    })
    .catch((error) => {
      console.error("Erro ao ler usuários via API JSONServer:", error);
    });
}
function nomeAnonimoreturn(usuario) {
  var nomeretorno;
  if (usuario.moderador == true) {
    nomeretorno = "moderador" + usuario.nomeAnonimo;
  } else if (usuario.ajudante == true) {
    nomeretorno = "ajudante" + usuario.nomeAnonimo;
  } else {
    nomeretorno = "usuario" + usuario.nomeAnonimo;
  }
  return nomeretorno;
}
// Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial
function loginUser(login, senha) {
  // Verifica todos os itens do banco de dados de usuarios
  // para localizar o usuário informado no formulario de login
  for (var i = 0; i < db_usuarios.length; i++) {
    var usuario = db_usuarios[i];

    // Se encontrou login, carrega usuário corrente e salva no Session Storage
    if (login == usuario.login && senha == usuario.senha) {
      usuarioCorrente.id = usuario.id;
      usuarioCorrente.login = usuario.login;
      usuarioCorrente.email = usuario.email;
      usuarioCorrente.nome = usuario.nome;
      usuarioCorrente.ajudante = usuario.ajudante || false;
      usuarioCorrente.moderador = usuario.moderador || false;
      usuarioCorrente.nomeAnonimo = usuario.nomeAnonimo;
      usuarioCorrente.modoAnonimo = usuario.modoAnonimo || false;
      usuarioCorrente.modoClaro = usuario.modoClaro || false;
      sessionStorage.setItem(
        "usuarioCorrente",
        JSON.stringify(usuarioCorrente)
      );
      return true;
    }
  }

  // Se chegou até aqui é por que não encontrou o usuário e retorna falso
  return false;
}

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser() {
  sessionStorage.removeItem("usuarioCorrente");
  window.location = LOGIN_URL;
}

function verifyAnonymousName(nomeAnonimo) {
  // Garante que db_usuarios é um array
  const usuariosArray = Array.isArray(db_usuarios)
    ? db_usuarios
    : db_usuarios.usuarios || [];
  const exists = usuariosArray.some((u) => u.nomeAnonimo === nomeAnonimo);
  if (exists) {
    // Se existir, gera um novo nome anônimo e tenta novamente
    return verifyAnonymousName("" + Math.floor(Math.random() * 1000));
  }
  return nomeAnonimo;
}

function addUser(nome, login, senha, email) {
  let nomeAnonimo = verifyAnonymousName(" " + Math.floor(Math.random() * 1000));
  console.log("Adicionando usuário:", nome, login, senha, email, nomeAnonimo);
  // Cria um objeto de usuario para o novo usuario
  let usuario = {
    login: login,
    senha: senha,
    nome: nome,
    email: email,
    ajudante: false,
    moderador: false,
    nomeAnonimo: nomeAnonimo,
    modoAnonimo: false, // padrão
    modoClaro: false, // padrão
  };

  // Envia dados do novo usuário para ser inserido no JSON Server
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  })
    .then((response) => response.json())
    .then((data) => {
      // Adiciona o novo usuário na variável db_usuarios em memória
      if (Array.isArray(db_usuarios)) {
        db_usuarios.push(usuario);
      } else if (db_usuarios.usuarios && Array.isArray(db_usuarios.usuarios)) {
        db_usuarios.usuarios.push(usuario);
      }
      alert("Usuário inserido com sucesso");
    })
    .catch((error) => {
      console.error("Erro ao inserir usuário via API JSONServer:", error);
      alert("Erro ao inserir usuário");
    });
}
function configurantionsUser() {
  window.location.href = "configuracoes.html";
}
function showUserInfo(element) {
  var elemUser = document.getElementById(element);
  if (elemUser && usuarioCorrente && usuarioCorrente.nome) {
    elemUser.innerHTML = `
      <span class="user-label">${usuarioCorrente.nome} </span>
      <button id="userinfo-button" type="button" class="userinfo-btn">${usersvg}</button>
      <div id="user-dropdown" class="user-dropdown">
        <ul>
          <li><button class="user-dropdown-item logout" onclick="logoutUser()">Sair</button></li>
          <li><button class="user-dropdown-item config" onclick="configurantionsUser()">Configurações</button></li>
          <li><button class="user-dropdown-item btn btn-outline-warning" id="toggle-theme" >🌙/☀️</button></li>
        </ul>
      </div>
    `;
    btnToggleTheme = document.getElementById("toggle-theme");
    if (btnToggleTheme) {
      btnToggleTheme.onclick = async function (e) {
        e.stopPropagation();
        document.body.classList.toggle("light-mode");
        const modoClaroAtivo = document.body.classList.contains("light-mode");
        localStorage.setItem("theme", modoClaroAtivo ? "light" : "dark");
        const usuarioCorrente = JSON.parse(
          sessionStorage.getItem("usuarioCorrente")
        );
        if (usuarioCorrente && usuarioCorrente.id) {
          try {
            const resp = await fetch(
              `http://localhost:3000/usuarios/${usuarioCorrente.id}`,
              {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ modoClaro: modoClaroAtivo }),
              }
            );
            if (resp.ok) {
              const atualizado = await resp.json();
              sessionStorage.setItem(
                "usuarioCorrente",
                JSON.stringify(atualizado)
              );
              window.usuarioCorrente = atualizado;
            }
          } catch (err) {
            alert("Erro ao atualizar modo claro no servidor.");
          }
        }
      };
      // Aplica o tema salvo no usuário ao carregar
      const usuarioCorrente = JSON.parse(
        sessionStorage.getItem("usuarioCorrente")
      );
      if (usuarioCorrente && usuarioCorrente.modoClaro) {
        document.body.classList.add("light-mode");
      } else {
        document.body.classList.remove("light-mode");
      }
    }
    const userInfoButton = document.getElementById("userinfo-button");
    if (userInfoButton) {
      userInfoButton.onclick = function (e) {
        e.stopPropagation();
        const menu = document.getElementById("user-dropdown");
        const btn = document.getElementById("userinfo-button");
        const isOpen = menu.style.display === "block";
        menu.style.display = isOpen ? "none" : "block";
        if (!isOpen) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      };
    }

    document.addEventListener("click", function hideMenu(e) {
      const menu = document.getElementById("user-dropdown");
      const btn = document.getElementById("userinfo-button");
      if (menu && menu.style.display === "block") {
        menu.style.display = "none";
        if (btn) btn.classList.remove("active");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  showUserInfo("userInfo");
  const menuLista = document.getElementById("menu-lista-ajudantes");
  if (menuLista) {
    if (!usuarioCorrente || !usuarioCorrente.moderador) {
      menuLista.style.display = "none";
    } else {
      menuLista.style.display = "";
    }
  }
  // DELETAR CONTA
  const modalDelete = document.getElementById("modal-delete-conta");
  const btnCancelarDelete = document.getElementById("cancelar-delete-conta");
  const btnConfirmarDelete = document.getElementById("confirmar-delete-conta");

  if (btnCancelarDelete) {
    btnCancelarDelete.onclick = function () {
      if (modalDelete) modalDelete.style.display = "none";
    };
  }

  if (btnConfirmarDelete) {
    btnConfirmarDelete.onclick = async function () {
      try {
        await fetch(
          "http://localhost:3000/usuarios/" + window.usuarioCorrente.id,
          {
            method: "DELETE",
          }
        );
        sessionStorage.removeItem("usuarioCorrente");
        alert("Conta deletada com sucesso!");
        window.location.href = "index.html";
      } catch (e) {
        alert("Erro ao deletar conta.");
      }
    };
  }

  // MODAIS DE LOGIN/REGISTRO
  const btnLogin = document.getElementById("btn-login-modal");
  const userInfo = document.getElementById("userInfo");

  if (!sessionStorage.getItem("usuarioCorrente")) {
    if (btnLogin) btnLogin.style.display = "inline-block";
    if (userInfo) userInfo.style.display = "none";
  } else {
    if (btnLogin) btnLogin.style.display = "none";
    if (userInfo) userInfo.style.display = "flex"; // Usar flex para alinhar corretamente
  }

  if (btnLogin) {
    btnLogin.onclick = function () {
      const loginModal = document.getElementById("login-modal-bg");
      if (loginModal) loginModal.style.display = "flex";
    };
  }

  // ****** INÍCIO DA ÁREA CORRIGIDA ******
  // Adicionamos verificações para garantir que os elementos existem antes de adicionar eventos

  const btnFecharLogin = document.getElementById("fechar-modal-login");
  if (btnFecharLogin) {
    btnFecharLogin.onclick = function () {
      const loginModal = document.getElementById("login-modal-bg");
      if (loginModal) loginModal.style.display = "none";
    };
  }

  const btnAbrirRegistro = document.getElementById("abrir-modal-registro");
  if (btnAbrirRegistro) {
    btnAbrirRegistro.onclick = function () {
      const loginModal = document.getElementById("login-modal-bg");
      const registerModal = document.getElementById("register-modal-bg");
      if (loginModal) loginModal.style.display = "none";
      if (registerModal) registerModal.style.display = "flex";
    };
  }

  const btnFecharRegistro = document.getElementById("fechar-modal-registro");
  if (btnFecharRegistro) {
    btnFecharRegistro.onclick = function () {
      const registerModal = document.getElementById("register-modal-bg");
      if (registerModal) registerModal.style.display = "none";
    };
  }

  const formLogin = document.getElementById("login-modal-form");
  if (formLogin) {
    formLogin.onsubmit = async function (e) {
      e.preventDefault();
      const login = document.getElementById("modal-login").value;
      const senha = document.getElementById("modal-senha").value;
      await new Promise((resolve) => carregarUsuarios(resolve));
      if (loginUser(login, senha)) {
        const loginModal = document.getElementById("login-modal-bg");
        if (loginModal) loginModal.style.display = "none";
        window.location.reload();
      } else {
        alert("Login ou senha inválidos!");
      }
    };
  }

  const formRegistro = document.getElementById("register-modal-form");
  if (formRegistro) {
    formRegistro.onsubmit = function (e) {
      e.preventDefault();
      const nome = document.getElementById("modal-nome").value;
      const email = document.getElementById("modal-email").value;
      const login = document.getElementById("modal-login-reg").value;
      const senha = document.getElementById("modal-senha-reg").value;
      addUser(nome, login, senha, email);
      alert("Usuário registrado! Faça login.");
      formRegistro.reset();
      const registerModal = document.getElementById("register-modal-bg");
      const loginModal = document.getElementById("login-modal-bg");
      if (registerModal) registerModal.style.display = "none";
      if (loginModal) loginModal.style.display = "flex";
    };
  }
  // ****** FIM DA ÁREA CORRIGIDA ******
});

// Inicializa a aplicação
initLoginApp();
