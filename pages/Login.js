import { login } from '../src/api.js'
import './styles/Login.css'

export function renderLogin(onLogin) {
  document.querySelector('#app').innerHTML = `
    <main class="login-page">
      <section class="login-card">

        <div class="brand">
        <img
          src="/assets/bussola.png"
          alt="Logo Às Ordens"
          class="logo-bussola"
        />
        <h1>ÀS ORDENS</h1>
        <p>Sistema de Chamados</p>
      </div>

        <form id="loginForm">

          <label for="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            autocomplete="username"
            required
          />

          <label for="senha">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            autocomplete="current-password"
            required
          />

          <button id="entrar" type="submit">
            ENTRAR
          </button>

          <p id="mensagem" role="status"></p>

        </form>
      </section>
    </main>
  `

  const formulario = document.querySelector('#loginForm')
  const mensagem = document.querySelector('#mensagem')
  const botao = document.querySelector('#entrar')

  formulario.addEventListener('submit', async (event) => {
    event.preventDefault()

    const email = document.querySelector('#email').value.trim()
    const senha = document.querySelector('#senha').value

    if (!email || !senha.trim()) {
      mensagem.textContent = 'Preencha todos os campos.'
      return
    }

    botao.disabled = true
    botao.textContent = 'ENTRANDO...'
    mensagem.textContent = ''

    try {
      const dados = await login(email, senha)

      onLogin(dados)

    } catch (erro) {
      mensagem.textContent = erro.message

    } finally {
      botao.disabled = false
      botao.textContent = 'ENTRAR'
    }
  })
}