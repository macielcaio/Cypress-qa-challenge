class LoginPage {
  email()    { return cy.get('[data-testid="email"]') }
  password() { return cy.get('[data-testid="password"], [data-testid="senha"]') } // fallback
  submit()   { return cy.get('[data-testid="entrar"]') }

  fill(email, pass) {
    this.email().clear().type(email)
    this.password().clear().type(pass)
  }

  // Sucesso
  loginExpectSuccess(email, pass) {
    cy.intercept('POST', '**/login').as('loginReq')
    this.fill(email, pass)
    this.submit().click()
    cy.wait('@loginReq').its('response.statusCode').should('be.oneOf', [200, 201])
    cy.url().should('match', /home|dashboard|produtos|\/admin\/home/i)
  }

  // Erro
  loginExpectError(email, pass) {
    cy.intercept('POST', '**/login').as('loginReq')
    this.fill(email, pass)
    this.submit().click()
    cy.wait('@loginReq').its('response.statusCode').should('eq', 401)
    // alerta de erro visível
    cy.contains(/Email e\/ou senha inválidos/i, { timeout: 8000 }).should('be.visible')
  }
}
export default new LoginPage()
