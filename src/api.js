const API_URL = ''

export async function login(email, senha) {
  const resposta = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      email,
      senha
    })
  })

  if (!resposta.ok) {
    throw new Error('Não foi possível realizar o login.')
  }

  const dados = await resposta.json()

  if (!dados.token) {
    throw new Error('A API não retornou um token.')
  }

  return dados
}

export async function criarChamado(dados) {
  const token = sessionStorage.getItem('token')

  if (!token) {
    throw new Error('Faça login novamente.')
  }

  const resposta = await fetch(`${API_URL}/api/chamados`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },

    body: JSON.stringify(dados)
  })

  if (resposta.status === 401 || resposta.status === 403) {
    throw new Error('Sessão inválida ou acesso não autorizado.')
  }

  if (!resposta.ok) {
    throw new Error('Não foi possível abrir o chamado.')
  }

  return await resposta.json()
}

export async function listarChamados() {
  const token = sessionStorage.getItem('token')

  if (!token) {
    throw new Error('Faça login novamente.')
  }

  const resposta = await fetch(`${API_URL}/api/chamados`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  if (resposta.status === 401 || resposta.status === 403) {
    throw new Error('Sessão inválida ou acesso não autorizado.')
  }

  if (!resposta.ok) {
    throw new Error('Não foi possível consultar os chamados.')
  }

  return await resposta.json()
}