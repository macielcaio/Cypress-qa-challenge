import LoginPage from '../../pages/LoginPage'

describe('Login', () => {
  it('shows an error with invalid credentials', () => {
    cy.visit('/login')
    LoginPage.loginExpectError('fulano@qa.com', 'wrong-pass')
  })

  it('logs in successfully with valid credentials', () => {
    // reutiliza o comando que já valida 200/201 + URL
    cy.uiLogin()
  })
})
