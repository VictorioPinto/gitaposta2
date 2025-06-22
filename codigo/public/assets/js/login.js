// Trabalho Interdisciplinar 1 - Aplicações Web
//
// Esse módulo realiza o registro de novos usuários e login para aplicações com
// backend baseado em API REST provida pelo JSONServer
// Os dados de usuário estão localizados no arquivo db.json que acompanha este projeto.
//
// Autor: Rommel Vieira Carneiro (rommelcarneiro@gmail.com)
// Data: 09/09/2024
//
// Código LoginApp

// Página inicial de Login
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
    // Não exige login na index
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
      displayMessage("Erro ao ler usuários");
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
      <span class="user-label">${usuarioCorrente.nome} (${usuarioCorrente.login})</span>
      <button id="userinfo-button" type="button" class="userinfo-btn">${usersvg}</button>
      <div id="user-dropdown" class="user-dropdown">
        <ul>
          <li><button class="user-dropdown-item logout" onclick="logoutUser()">Sair</button></li>
          <li><button class="user-dropdown-item config" onclick="configurantionsUser()">Configurações</button></li>
        </ul>
      </div>
    `;
    document.getElementById("userinfo-button").onclick = function (e) {
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
    document.addEventListener("click", function hideMenu(e) {
      const menu = document.getElementById("user-dropdown");
      const btn = document.getElementById("userinfo-button");
      if (menu && menu.style.display === "block") {
        menu.style.display = "none";
        btn.classList.remove("active");
        document.removeEventListener("click", hideMenu);
      }
    });
  }
}

// Chame APENAS dentro do DOMContentLoaded!
document.addEventListener("DOMContentLoaded", function () {
  showUserInfo("userInfo");
});
//function showUserInfo(element) {
//  var elemUser = document.getElementById(element);
//  if (elemUser) {
//    elemUser.innerHTML = `${usuarioCorrente.nome} (${usuarioCorrente.login})
//                   <a onclick="logoutUser()">❌</a>`;
//  }
//}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp();

//deletemodal
window.Modaldelete = function () {
  const modal = document.getElementById("modal-delete-conta");
  if (modal) modal.style.display = "flex";
};

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal-delete-conta");
  const btnCancelar = document.getElementById("cancelar-delete-conta");
  const btnConfirmar = document.getElementById("confirmar-delete-conta");

  if (btnCancelar) {
    btnCancelar.onclick = function () {
      modal.style.display = "none";
    };
  }

  if (btnConfirmar) {
    btnConfirmar.onclick = async function () {
      try {
        await fetch(
          "http://localhost:3000/usuarios/" + window.usuarioCorrente.id,
          {
            method: "DELETE",
          }
        );
        sessionStorage.removeItem("usuarioCorrente");
        alert("Conta deletada com sucesso!");
        window.location.href = "/modulos/login/login.html";
      } catch (e) {
        alert("Erro ao deletar conta.");
      }
    };
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Só mostra botão de login se NÃO estiver logado
  const btnLogin = document.getElementById("btn-login-modal");
  const userInfo = document.getElementById("userInfo");
  if (!sessionStorage.getItem("usuarioCorrente")) {
    if (btnLogin) btnLogin.style.display = "inline-block";
    if (userInfo) userInfo.style.display = "none";
  } else {
    if (btnLogin) btnLogin.style.display = "none";
    if (userInfo) userInfo.style.display = "inline";
  }

  // Abrir modal de login
  if (btnLogin) {
    btnLogin.onclick = function () {
      document.getElementById("login-modal-bg").style.display = "flex";
    };
  }
  // Fechar modal de login
  document.getElementById("fechar-modal-login").onclick = function () {
    document.getElementById("login-modal-bg").style.display = "none";
  };

  // Abrir modal de registro a partir do modal de login
  document.getElementById("abrir-modal-registro").onclick = function () {
    document.getElementById("login-modal-bg").style.display = "none";
    document.getElementById("register-modal-bg").style.display = "flex";
  };
  // Fechar modal de registro
  document.getElementById("fechar-modal-registro").onclick = function () {
    document.getElementById("register-modal-bg").style.display = "none";
  };

  // Login
  document.getElementById("login-modal-form").onsubmit = async function (e) {
    e.preventDefault();
    const login = document.getElementById("modal-login").value;
    const senha = document.getElementById("modal-senha").value;
    // Garante que db_usuarios está carregado antes de tentar logar
    await new Promise((resolve) => carregarUsuarios(resolve));
    if (loginUser(login, senha)) {
      document.getElementById("login-modal-bg").style.display = "none";
      window.location.reload();
    } else {
      alert("Login ou senha inválidos!");
    }
  };

  // Registro
  document.getElementById("register-modal-form").onsubmit = function (e) {
    e.preventDefault();
    const nome = document.getElementById("modal-nome").value;
    const email = document.getElementById("modal-email").value;
    const login = document.getElementById("modal-login-reg").value;
    const senha = document.getElementById("modal-senha-reg").value;
    addUser(nome, login, senha, email);
    alert("Usuário registrado! Faça login.");
    document.getElementById("register-modal-form").reset();
    document.getElementById("register-modal-bg").style.display = "none";
    document.getElementById("login-modal-bg").style.display = "flex";
  };
});
