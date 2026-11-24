🧭 Às Ordens — Sistema de Chamados

📌 Sobre o projeto

O Às Ordens é um aplicativo mobile desenvolvido para facilitar a abertura, o gerenciamento e o acompanhamento de chamados internos de uma organização.

O sistema busca centralizar solicitações, melhorar a comunicação entre funcionários e setores responsáveis e facilitar o acompanhamento das demandas.

🚀 Funcionalidades

Autenticação de usuários com JWT.

Identificação do perfil do usuário.

Abertura de chamados.

Classificação por categoria e prioridade.

Consulta dos chamados cadastrados.

Pesquisa por título.

Filtro por status.

Painel com contadores dinâmicos.

Encerramento de sessão.

Interface responsiva voltada para dispositivos móveis.

💻 Tecnologias utilizadas

Front-end

HTML5

CSS3

JavaScript

Vite

Capacitor

Back-end

Kotlin

Spring Boot

Spring Security

Spring Data JPA

Hibernate

JWT

Gradle

Banco de dados

MySQL

Ferramentas de desenvolvimento

Visual Studio Code

Android Studio

MySQL Workbench

Git e GitHub

🏗️ Arquitetura

O aplicativo utiliza uma arquitetura cliente-servidor, na qual o front-end se comunica com o back-end por meio de uma API REST.

Aplicativo Mobile
        ↕
     API REST
        ↕
   Spring Boot
        ↕
      MySQL

📂 Estrutura do front-end

as_ordens_vanilla/
├── android/
├── pages/
│   ├── styles/
│   │   ├── Login.css
│   │   ├── HomePage.css
│   │   ├── AbrirChamado.css
│   │   └── VerChamados.css
│   ├── Login.js
│   ├── HomePage.js
│   ├── AbrirChamado.js
│   └── VerChamados.js
├── public/
│   └── assets/
│       └── bussola.png
├── src/
│   ├── api.js
│   ├── main.js
│   └── style.css
├── capacitor.config.json
├── vite.config.js
├── package.json
├── index.html
├── .gitignore
└── README.md

⚙️ Como executar

Pré-requisitos

Node.js e npm.

Git.

Back-end Spring Boot configurado e em execução.

Banco de dados MySQL configurado.

Android Studio para compilação Android.

Clonar o repositório

git clone https://github.com/kauanyllo22/as-ordens-appmobile.git
cd as-ordens-appmobile

Instalar as dependências

npm install

Executar o front-end

npm run dev

Para utilizar as funcionalidades integradas, o back-end deverá estar disponível na porta 8080. Durante o desenvolvimento, a comunicação com a API é realizada pelo proxy do Vite.

📱 Compilação Android

npm run build
npx cap sync android
npx cap open android

A comunicação com a API no aplicativo Android ainda necessita de configuração específica para o ambiente de execução.

🔐 Segurança

Autenticação baseada em tokens JWT.

Senhas armazenadas no back-end utilizando BCrypt.

Endpoints protegidos pelo Spring Security.

Consulta de chamados vinculada ao usuário autenticado.

Informações sensíveis mantidas fora do versionamento.

📋 Status do desenvolvimento

Tela de login.

Tela inicial.

Abertura de chamados.

Consulta de chamados.

Pesquisa e filtros.

Integração com a API REST.

Integração com o MySQL.

Contadores dinâmicos.

Finalização da identidade visual.

Configuração da API no Android.

Testes em dispositivos móveis.

Geração do APK atualizado.

📖 Histórico do projeto

Inicialmente, o aplicativo foi desenvolvido utilizando Ionic React. Posteriormente, o front-end foi migrado para HTML, CSS e JavaScript puro, utilizando Vite e Capacitor.

O histórico de desenvolvimento foi preservado através do Git.

Às Ordens — Tecnologia para simplificar o gerenciamento de chamados.

Projeto em desenvolvimento.