import './styles/HomePage.css'

import { listarChamados } from '../src/api.js'

export function renderHomePage(usuario, onLogout, onAbrirChamado, onVerChamados) {
    document.querySelector('#app').innerHTML = `
    <main class="home-page">

      <header class="home-header">
       <div class="home-brand">
     <img
      src="/assets/bussola.png"
      alt="Logo Às Ordens"
      class="home-logo"
    />

     <div class="home-brand-text">
      <h1>ÀS ORDENS</h1>
      <p>Sistema de Chamados</p>
       </div>
      </div>
    </header>

      <section class="home-container">

        <div class="saudacao">
         <h2 id="nomeUsuario"></h2>
         <span id="perfilUsuario" class="perfil-usuario"></span>
         <p>Como podemos ajudar hoje?</p>
        </div>

        <button class="btn-abrir" id="abrirChamado">
      <span class="icone-acao">
      <svg viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2">
       <circle cx="12" cy="12" r="9"/>
       <path d="M12 7v10M7 12h10"/>
      </svg>
     </span>

     <span class="texto-acao">
      <strong>Abrir chamado</strong>
      <small>Crie uma nova solicitação</small>
     </span>

     <span class="seta-acao">›</span>
      </button>

      <button class="btn-ver" id="verChamados">
     <span class="icone-acao">
        <svg viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2">
         <rect x="5" y="4" width="14" height="17" rx="2"/>
         <rect x="9" y="2" width="6" height="4" rx="1"/>
         <path d="M9 11h6M9 15h6"/>
        </svg>
      </span>

       <span class="texto-acao">
       <strong>Ver chamados</strong>
         <small>Acompanhe suas solicitações</small>
        </span>

         <span class="seta-acao">›</span>
        </button>

        <h3>Resumo dos chamados</h3>

        <div class="resumo-chamados">

        <div class="card-resumo abertos">
        <svg class="icone-resumo" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 7V5h7l2 3h9v12H3z"/>
        </svg>
        <strong id="totalAbertos">—</strong>
        <span>Abertos</span>
        </div>

        <div class="card-resumo andamento">
        <svg class="icone-resumo" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 6v6l4 2"/>
        </svg>
        <strong id="totalAndamento">—</strong>
        <span>Em andamento</span>
        </div>

        <div class="card-resumo concluidos">
        <svg class="icone-resumo" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="9"/>
        <path d="m8 12 3 3 5-6"/>
        </svg>
        <strong id="totalConcluidos">—</strong>
        <span>Concluídos</span>
        </div>

        </div>

        </div>

        <button class="btn-sair" id="sair">
          Sair da conta
        </button>

      </section>
    </main>
  `

    document.querySelector('#nomeUsuario').textContent =
        `Olá, ${usuario.nome}!`

    const perfis = {
        FUNCIONARIO: 'Funcionário',
        TECNICO: 'Técnico',
        ADMINISTRADOR: 'Administrador'
    }

    document.querySelector('#perfilUsuario').textContent =
        perfis[usuario.tipoUsuario] || 'Usuário'

    document.querySelector('#sair')
        .addEventListener('click', onLogout)

    document.querySelector('#abrirChamado')
        .addEventListener('click', onAbrirChamado)

    document.querySelector('#verChamados')
        .addEventListener('click', onVerChamados)

    atualizarResumo()
}

async function atualizarResumo() {
    const abertos = document.querySelector('#totalAbertos')
    const andamento = document.querySelector('#totalAndamento')
    const concluidos = document.querySelector('#totalConcluidos')

    try {
        const chamados = await listarChamados()

        abertos.textContent = chamados.filter(
            chamado => chamado.status === 'ABERTO'
        ).length

        andamento.textContent = chamados.filter(
            chamado =>
                chamado.status === 'EM_ATENDIMENTO' ||
                chamado.status === 'AGUARDANDO_USUARIO'
        ).length

        concluidos.textContent = chamados.filter(
            chamado =>
                chamado.status === 'RESOLVIDO' ||
                chamado.status === 'FECHADO'
        ).length

    } catch (erro) {
        console.error('Erro ao carregar resumo:', erro)

        abertos.textContent = '—'
        andamento.textContent = '—'
        concluidos.textContent = '—'
    }
}