// cypress/e2e/frontend/login.spec.cy.js
import LoginPage from '../../pages/LoginPage'

describe('Login flow', () => {
  it('should show an error with invalid password', () => {
    cy.intercept('POST', '**/login').as('loginReq')

    LoginPage.login('fulano@qa.com', 'wrong-pass')

    cy.wait('@loginReq').its('response.statusCode').should('eq', 401)

    cy.contains(/Email e\/ou senha inválidos/i, { timeout: 8000 })
      .should('be.visible')
  })
})