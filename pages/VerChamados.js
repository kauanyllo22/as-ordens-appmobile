import { listarChamados } from '../src/api.js'
import './styles/VerChamados.css'

export function renderVerChamados(onVoltar) {
  document.querySelector('#app').innerHTML = `
    <main class="ver-chamados-page">

      <header class="ver-chamados-header">
        <button id="voltarChamados" type="button">←</button>
        <h1>ÀS ORDENS</h1>
      </header>

      <section class="ver-chamados-container">

        <h2>Meus chamados</h2>

        <p class="ver-chamados-subtitulo">
          Acompanhe suas solicitações.
        </p>

        <input
          id="pesquisarChamado"
          type="search"
          placeholder="Pesquisar chamado..."
        />

        <select id="filtroStatus">
          <option value="">Todos os status</option>
          <option value="ABERTO">Abertos</option>
          <option value="EM_ATENDIMENTO">Em atendimento</option>
          <option value="AGUARDANDO_USUARIO">Aguardando usuário</option>
          <option value="RESOLVIDO">Resolvidos</option>
          <option value="FECHADO">Fechados</option>
        </select>

        <p id="quantidadeChamados"></p>

        <div id="listaChamados"></div>

        <button id="atualizarChamados">
          ATUALIZAR CHAMADOS
        </button>

      </section>
    </main>
  `

  let chamados = []

  const lista = document.querySelector('#listaChamados')
  const pesquisa = document.querySelector('#pesquisarChamado')
  const filtro = document.querySelector('#filtroStatus')
  const quantidade = document.querySelector('#quantidadeChamados')
  const botaoAtualizar = document.querySelector('#atualizarChamados')

  const statusTexto = {
    ABERTO: 'Aberto',
    EM_ATENDIMENTO: 'Em atendimento',
    AGUARDANDO_USUARIO: 'Aguardando usuário',
    RESOLVIDO: 'Resolvido',
    FECHADO: 'Fechado'
  }

  const prioridadeTexto = {
    BAIXA: 'Baixa',
    MEDIA: 'Média',
    ALTA: 'Alta',
    CRITICA: 'Crítica'
  }

  function formatarData(data) {
    if (!data) return 'Sem data'

    const dataConvertida = new Date(data)

    return dataConvertida.toLocaleDateString('pt-BR')
  }

  function exibirChamados() {
    const termo = pesquisa.value.toLowerCase().trim()
    const status = filtro.value

    const filtrados = chamados.filter(chamado => {
      const correspondePesquisa =
        chamado.titulo.toLowerCase().includes(termo)

      const correspondeStatus =
        !status || chamado.status === status

      return correspondePesquisa && correspondeStatus
    })

    lista.innerHTML = ''

    quantidade.textContent =
      `${filtrados.length} chamado(s) encontrado(s)`

    if (filtrados.length === 0) {
      lista.innerHTML = `
        <p class="lista-vazia">
          Nenhum chamado encontrado.
        </p>
      `
      return
    }

    filtrados.forEach(chamado => {
      const card = document.createElement('article')

      card.className = 'chamado-card'

      card.innerHTML = `
        <div class="chamado-card-topo">
          <span class="categoria"></span>
          <span class="status-chamado"></span>
        </div>

        <h3 class="titulo-chamado"></h3>

        <p class="descricao-chamado"></p>

        <div class="chamado-card-rodape">
          <span class="prioridade-chamado"></span>
          <span class="data-chamado"></span>
        </div>
      `

      card.querySelector('.categoria').textContent =
        chamado.categoria

      card.querySelector('.titulo-chamado').textContent =
        chamado.titulo

      card.querySelector('.descricao-chamado').textContent =
        chamado.descricao

      const statusElemento =
        card.querySelector('.status-chamado')

      statusElemento.textContent =
        statusTexto[chamado.status] || chamado.status

      if (statusTexto[chamado.status]) {
        statusElemento.classList.add(chamado.status.toLowerCase())
      }

      const prioridadeElemento =
        card.querySelector('.prioridade-chamado')

      prioridadeElemento.textContent =
        `Prioridade: ${prioridadeTexto[chamado.prioridade] || chamado.prioridade}`

      if (prioridadeTexto[chamado.prioridade]) {
        prioridadeElemento.classList.add(
          chamado.prioridade.toLowerCase()
        )
      }

      card.querySelector('.data-chamado').textContent =
        formatarData(chamado.dataCriacao)

      lista.appendChild(card)
    })
  }

  async function carregarChamados() {
    botaoAtualizar.disabled = true
    botaoAtualizar.textContent = 'CARREGANDO...'

    quantidade.textContent = ''
    lista.textContent = 'Carregando chamados...'

    try {
      chamados = await listarChamados()

      chamados.sort((a, b) =>
        new Date(b.dataCriacao) - new Date(a.dataCriacao)
      )

      exibirChamados()

    } catch (erro) {
      lista.textContent = erro.message

    } finally {
      botaoAtualizar.disabled = false
      botaoAtualizar.textContent = 'ATUALIZAR CHAMADOS'
    }
  }

  pesquisa.addEventListener('input', exibirChamados)

  filtro.addEventListener('change', exibirChamados)

  botaoAtualizar.addEventListener('click', carregarChamados)

  document.querySelector('#voltarChamados')
    .addEventListener('click', onVoltar)

  carregarChamados()
}