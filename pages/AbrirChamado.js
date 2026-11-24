import { criarChamado } from '../src/api.js'
import './styles/AbrirChamado.css'

export function renderAbrirChamado(onVoltar) {
  document.querySelector('#app').innerHTML = `
    <main class="chamado-page">

      <header class="chamado-header">
        <button id="voltar" type="button">←</button>
        <h1>ÀS ORDENS</h1>
      </header>

      <section class="chamado-container">

        <h2>Abrir chamado</h2>
        <p class="chamado-subtitulo">
          Informe os dados da sua solicitação.
        </p>

        <form id="formChamado">

          <label for="titulo">Título do chamado</label>
          <input
            id="titulo"
            type="text"
            maxlength="100"
            placeholder="Informe o problema"
            required
          />

          <label for="categoria">Categoria</label>
          <select id="categoria" required>
            <option value="">Selecione uma categoria</option>
            <option value="Informática">Informática</option>
            <option value="Manutenção">Manutenção</option>
            <option value="Infraestrutura">Infraestrutura</option>
            <option value="Outros">Outros</option>
          </select>

          <label for="prioridade">Prioridade</label>
          <select id="prioridade" required>
            <option value="">Selecione a prioridade</option>
            <option value="BAIXA">Baixa</option>
            <option value="MEDIA">Média</option>
            <option value="ALTA">Alta</option>
            <option value="CRITICA">Crítica</option>
          </select>

          <label for="descricao">Descrição</label>
          <textarea
            id="descricao"
            rows="6"
            placeholder="Descreva detalhadamente o problema..."
            required
          ></textarea>

          <button id="enviarChamado" type="submit">
            ENVIAR CHAMADO
          </button>

          <p id="mensagemChamado" role="status"></p>

        </form>
      </section>
    </main>
  `

  const formulario = document.querySelector('#formChamado')
  const mensagem = document.querySelector('#mensagemChamado')
  const botao = document.querySelector('#enviarChamado')

  document.querySelector('#voltar')
    .addEventListener('click', onVoltar)

  formulario.addEventListener('submit', async (event) => {
    event.preventDefault()

    const dados = {
      titulo: document.querySelector('#titulo').value.trim(),
      categoria: document.querySelector('#categoria').value,
      prioridade: document.querySelector('#prioridade').value,
      descricao: document.querySelector('#descricao').value.trim()
    }

    if (!dados.titulo || !dados.categoria ||
        !dados.prioridade || !dados.descricao) {
      mensagem.textContent = 'Preencha todos os campos.'
      return
    }

    botao.disabled = true
    botao.textContent = 'ENVIANDO...'
    mensagem.textContent = ''

    try {
      await criarChamado(dados)

      mensagem.textContent = 'Chamado aberto com sucesso!'
      mensagem.style.color = '#4ade80'

      formulario.reset()

    } catch (erro) {
      mensagem.textContent = erro.message
      mensagem.style.color = '#f87171'

    } finally {
      botao.disabled = false
      botao.textContent = 'ENVIAR CHAMADO'
    }
  })
}