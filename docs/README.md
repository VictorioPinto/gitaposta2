Introdução
Informações básicas do projeto.

Projeto: Vida Sem Apostas
Repositório GitHub: [COLOQUE O LINK PARA O REPOSITÓRIO NO GITHUB AQUI]
Membros da equipe:
Victório Neto
Lucas Avelar
A documentação do projeto é estruturada da seguinte forma:

Introdução
Contexto
Product Discovery
Product Design
Metodologia
Solução
Referências Bibliográficas
✅ Documentação de Design Thinking (MIRO)

Contexto
Detalhes sobre o espaço de problema, os objetivos do projeto, sua justificativa e público-alvo.

Problema
O vício em apostas online é um problema crescente que afeta a saúde financeira e mental de muitas pessoas. A facilidade de acesso a plataformas de apostas e a publicidade massiva contribuem para o aumento do número de indivíduos que desenvolvem um comportamento de jogo problemático. Muitos viciados sentem vergonha e isolamento, dificultando a busca por ajuda. Há uma necessidade de um ambiente seguro, anônimo e solidário onde essas pessoas possam encontrar apoio, compartilhar experiências e acessar recursos para superar o vício.

Objetivos
Objetivo Geral:
Desenvolver uma aplicação web chamada "Vida Sem Apostas" para fornecer um espaço de apoio comunitário e recursos informativos para pessoas que lutam contra o vício em apostas.

Objetivos Específicos:

Criar uma plataforma de chat anônimo para que os usuários possam conversar com voluntários e outros membros da comunidade de forma segura.
Disponibilizar um formulário para que os usuários possam refletir sobre seus hábitos de aposta e visualizar dados estatísticos agregados da comunidade.
Implementar um sistema de voluntariado, permitindo que pessoas recuperadas ou que queiram ajudar se tornem "Ajudantes".
Oferecer um portal de notícias e avisos relevantes sobre o tema de apostas e seus riscos.
Justificativa
A proliferação de casas de apostas online tornou o vício em jogos de azar uma questão de saúde pública. Este projeto se justifica pela urgência em oferecer uma solução tecnológica e acessível que possa servir como primeiro ponto de contato para quem busca ajuda. Ao criar uma comunidade de apoio mútua e anônima, a plataforma "Vida Sem Apostas" visa quebrar a barreira do estigma associado ao vício e fornecer ferramentas práticas e informativas que auxiliem no processo de recuperação e conscientização.

Público-Alvo
O projeto destina-se a três perfis principais de usuários:

Pessoas com vício em apostas: Indivíduos que estão lutando contra o vício e procuram um espaço seguro para desabafar, obter informações e encontrar apoio de pares e voluntários.
Voluntários (Ajudantes): Pessoas que já superaram o vício ou que têm experiência em grupos de apoio e desejam ajudar outros a trilhar o mesmo caminho.
Moderadores/Administradores: Responsáveis pela gestão da plataforma, garantindo a segurança, a qualidade das interações e a aprovação de novos voluntários.
Product Discovery
Etapa de Definição
Personas
Com base nas funcionalidades e nos formulários do site, podemos identificar três personas principais:

Persona 1: João, o Apostador Conflitado

Perfil: Homem, 28 anos. Começou a apostar por diversão, mas agora aposta diariamente, gastando mais do que pode e já deixou de pagar contas por causa do jogo. Sente-se envergonhado e isolado, mas quer parar e reconhece que precisa de ajuda.
Necessidades: Um lugar anônimo para conversar sem ser julgado, entender se seus hábitos são problemáticos e encontrar apoio para tentar parar.
Persona 2: Maria, a Voluntária Empática

Perfil: Mulher, 40 anos. Teve uma experiência próxima com o vício em apostas na família e, após ver a recuperação de um ente querido, sente-se motivada a ajudar outras pessoas. Tem disponibilidade à noite e quer compartilhar sua experiência de forma construtiva.
Necessidades: Uma plataforma onde possa se candidatar para ser voluntária, um sistema organizado para interagir com quem precisa de ajuda e a capacidade de fazer a diferença.
Persona 3: Admin, o Guardião da Comunidade

Perfil: Administrador do sistema. Responsável por manter a plataforma segura e funcional.
Necessidades: Ferramentas para moderar o conteúdo do chat, um processo para avaliar e aprovar novos voluntários, e um meio de comunicar avisos importantes para toda a comunidade.
Product Design
Histórias de Usuários
Com base na análise das personas foram identificadas as seguintes histórias de usuários:

EU COMO... QUERO/PRECISO ... PARA ...
João, o Apostador Conversar anonimamente em um chat Poder desabafar e receber conselhos sem medo de ser identificado.
João, o Apostador Preencher um formulário sobre meus hábitos de aposta Ter uma visão clara do meu comportamento e compará-lo com dados gerais da comunidade.
Maria, a Voluntária Preencher um formulário de candidatura para ser Ajudante Oferecer meu tempo e experiência para ajudar pessoas que estão sofrendo com o vício.
Admin Analisar e aprovar as candidaturas de Ajudantes Garantir que os voluntários sejam adequados para oferecer suporte na plataforma.
Admin Publicar avisos na plataforma Manter todos os usuários informados sobre novidades, manutenções ou eventos.
Admin Moderar as mensagens do chat Remover conteúdo inadequado e garantir que o chat seja um ambiente seguro e de apoio.
Qualquer usuário Acessar notícias atualizadas sobre o mundo das apostas Manter-me informado sobre os riscos e as regulamentações do setor.
Qualquer usuário Configurar minha conta para usar um tema claro ou escuro Ter uma experiência de visualização mais confortável.

Exportar para as Planilhas
Requisitos
Requisitos Funcionais
ID Descrição do Requisito Prioridade
RF-001 O sistema deve permitir o cadastro e login de usuários. ALTA
RF-002 O sistema deve fornecer um chat para comunicação anônima entre os usuários. ALTA
RF-003 Moderadores devem poder excluir e editar mensagens do chat. ALTA
RF-004 Usuários devem poder preencher e enviar um formulário sobre seus hábitos de aposta. ALTA
RF-005 O sistema deve exibir gráficos com as estatísticas agregadas das respostas do formulário. MÉDIA
RF-006 Usuários devem poder se candidatar para serem "Ajudantes" através de um formulário. ALTA
RF-007 Moderadores devem poder visualizar, aceitar e recusar candidaturas de Ajudantes. ALTA
RF-008 Moderadores devem poder publicar avisos para todos os usuários. MÉDIA
RF-009 O sistema deve permitir que o usuário altere seus dados cadastrais, senha e exclua sua conta. BAIXA
RF-010 O sistema deve exibir notícias de uma API externa. BAIXA

Exportar para as Planilhas
Requisitos não Funcionais
ID Descrição do Requisito Prioridade
RNF-001 O sistema deve ser responsivo para rodar em dispositivos móveis. ALTA
RNF-002 A troca de mensagens no chat deve ocorrer em tempo real, sem a necessidade de recarregar a página. ALTA
RNF-003 O sistema deve garantir o anonimato dos usuários no chat quando o "Modo Anônimo" estiver ativo. ALTA
RNF-004 As informações dos usuários devem ser armazenadas de forma segura no servidor. ALTA
RNF-005 A interface deve ser intuitiva e fácil de usar para pessoas com diferentes níveis de literacia digital. MÉDIA

Exportar para as Planilhas
Projeto de Interface
Os artefatos de Wireframes e User Flow não foram disponibilizados. A interface do sistema pode ser visualizada diretamente na aplicação implementada. As principais telas são:

Página Inicial: Apresenta o carrossel de notícias e os cartões de acesso rápido às principais funcionalidades.
Chat: Contém a área de visualização de mensagens e o campo para envio.
Formulários: Telas dedicadas para o preenchimento do formulário de apostas e do formulário para se tornar ajudante.
Gráficos: Painel com a visualização dos dados estatísticos.
Páginas de Admin: Telas para listagem de candidatos e criação de avisos.
Protótipo Interativo
O protótipo interativo é a própria aplicação web implementada, acessível através do servidor local.

Metodologia
Ferramentas
Ambiente Plataforma/Ferramenta Link de acesso
Repositório de código GitHub [COLOQUE O LINK DO REPOSITÓRIO AQUI]
Hospedagem do site Local (via npm start) http://localhost:3000
Editor de Código Visual Studio Code https://code.visualstudio.com/
Backend Node.js, JSON Server https://nodejs.org/, https://github.com/typicode/json-server
Frontend HTML, CSS, JavaScript -
Bibliotecas JS Chart.js https://www.chartjs.org/
Framework CSS Bootstrap https://getbootstrap.com/
API Externa GNews API https://gnews.io/

Exportar para as Planilhas
Gerenciamento do Projeto
O projeto utiliza o GitHub para controle de versão. A estrutura de pastas e a divisão de funcionalidades sugerem uma abordagem de desenvolvimento modular. Embora os templates de planejamento de Sprint e Design Thinking tenham sido fornecidos, não há artefatos preenchidos (como um quadro Kanban ou backlogs de sprint), mas a estrutura do código reflete a implementação das histórias de usuário e requisitos definidos.

Solução Implementada
Funcionalidades
A solução implementada é um site completo com as seguintes funcionalidades:

Funcionalidade 1 - Sistema de Login e Cadastro
Permite que novos usuários se cadastrem e que usuários existentes façam login no sistema. O sistema controla o acesso a páginas restritas, como o chat e os formulários. Após o login, o nome do usuário é exibido e um menu de configurações fica disponível.

Estrutura de dados: Usuários
Instruções de acesso:
Na página inicial, clique no ícone de menu no canto superior direito para abrir o modal de login.
Use as credenciais para entrar ou clique em "Registrar-se" para criar uma nova conta.
Funcionalidade 2 - Chat de Apoio
Sala de bate-papo anônima onde os usuários podem interagir. Moderadores possuem privilégios para editar e apagar mensagens, garantindo a ordem e segurança do ambiente.

Estrutura de dados: Mensagens
Instruções de acesso:
Efetue o login e acesse a página "Chat" no menu de navegação.
Funcionalidade 3 - Formulários e Gráficos
Os usuários podem preencher um formulário detalhado sobre seus hábitos de aposta. Os dados são enviados anonimamente para o servidor e podem ser visualizados de forma agregada na página de gráficos.

Estrutura de dados: Apostas
Instruções de acesso:
Acesse as páginas "Formulário de Apostas" (via link na página de Chat) e "Gráficos" (também via link na página de Chat).
Funcionalidade 4 - Sistema de Voluntariado (Ajudantes)
Usuários podem se candidatar para serem voluntários. Moderadores podem analisar as informações e aprovar ou recusar os candidatos. Uma vez aprovado, o usuário recebe o status de "Ajudante".

Estrutura de dados: Candidatos Ajudante
Instruções de acesso:
Acesse "Formulário" no menu para se candidatar.
Moderadores podem acessar "Lista" para gerenciar as candidaturas.
Estruturas de Dados
As estruturas de dados da aplicação estão definidas no arquivo db.json.

Estrutura de Dados - Usuários
Registro dos usuários do sistema utilizados para login e para o perfil do sistema.

JSON

{
"login": "usuario",
"senha": "usuario123",
"nome": "Usuário Comum",
"email": "usuario@exemplo.com",
"ajudante": false,
"moderador": false,
"nomeAnonimo": "101",
"modoAnonimo": false,
"modoClaro": false,
"id": 1
}
Estrutura de Dados - Mensagens
Armazena as mensagens do chat, vinculadas ao ID do usuário que as enviou.

JSON

{
"nome": "Usuário Comum",
"texto": "Olá, preciso de ajuda.",
"id_usuario": 1,
"id": 1
}
Estrutura de Dados - Candidatos Ajudante
Armazena os dados das aplicações para se tornar um ajudante.

JSON

{
"experiencia": "Já participei de grupos de apoio.",
"motivacao": "Quero ajudar pessoas a superarem o vício.",
"disponibilidade": "Noites e finais de semana",
"vivencia": "sim",
"como_ajudar": "Ouvindo e compartilhando informações úteis.",
"termos": "on",
"nome": "Maria Candidata",
"email": "maria.candidata@exemplo.com",
"id": 1
}
Estrutura de Dados - Apostas
Armazena as respostas do formulário de hábitos de aposta.

JSON

{
"usuarioId": 1,
"faixa_etaria_18_24": 1,
"genero_masculino": 1,
"tempo_aposta_6_meses_1_ano": 1,
"freq_semana_2_3_vezes": 1,
"valor_medio_ate_50": 1,
"deixou_pagar_nao": 1,
"tentou_parar_sim": 1,
"precisa_ajuda_sim": 1,
"id": 1
}
Estrutura de Dados - Avisos
Armazena os avisos e comunicados publicados pelos moderadores.

JSON

{
"titulo": "Bem-vindo ao Vida Sem Apostas!",
"texto": "Nosso site está no ar para apoiar quem busca ajuda contra o vício em apostas.",
"data": "22/06/2025",
"id": 1
}
Módulos e APIs
Node.js / JSON Server: Utilizado para criar o backend e a API RESTful que serve os dados do arquivo db.json.
Bootstrap: Framework CSS utilizado para a estilização e responsividade do site.
Chart.js: Biblioteca JavaScript para a criação dos gráficos na página de estatísticas.
GNews API: API externa utilizada para buscar e exibir notícias sobre apostas.
Referências
Nenhuma referência bibliográfica foi incluída nos arquivos do projeto.
