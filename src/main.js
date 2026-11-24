import './style.css'
import { renderLogin } from '../pages/Login.js'
import { renderHomePage } from '../pages/HomePage.js'
import { renderAbrirChamado } from '../pages/AbrirChamado.js'
import { renderVerChamados } from '../pages/VerChamados.js'

function iniciarApp() {
  const token = sessionStorage.getItem('token')
  const nome = sessionStorage.getItem('nome')
  const tipoUsuario = sessionStorage.getItem('tipoUsuario')

  if (token && nome) {
    abrirHome({ nome, tipoUsuario })
  } else {
    abrirLogin()
  }
}

function abrirLogin() {
  renderLogin((dados) => {
    sessionStorage.setItem('token', dados.token)
    sessionStorage.setItem('nome', dados.nome)
    sessionStorage.setItem('tipoUsuario', dados.tipoUsuario)

    abrirHome(dados)
  })
}

function abrirHome(usuario) {
  renderHomePage(
    usuario,
    sairDaConta,
    () => abrirTelaChamado(usuario),
    () => abrirTelaVerChamados(usuario)
  )
}

function abrirTelaChamado(usuario) {
  renderAbrirChamado(() => {
    abrirHome(usuario)
  })
}

function abrirTelaVerChamados(usuario) {
  renderVerChamados(() => {
    abrirHome(usuario)
  })
}

function sairDaConta() {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('nome')
  sessionStorage.removeItem('tipoUsuario')

  abrirLogin()
}

iniciarApp()