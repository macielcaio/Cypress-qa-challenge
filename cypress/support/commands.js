Cypress.Commands.add('apiLogin', () => {
  const base = Cypress.env('apiBaseUrl')
  return cy.request('POST', `${base}/login`, {
    email: Cypress.env('adminEmail'),
    password: Cypress.env('adminPassword'),
  }).then((res) => {
    expect(res.status).to.eq(200)
    expect(res.body).to.have.property('authorization')
    // Guarda o token sem o prefixo "Bearer"
    Cypress.env('token', res.body.authorization.replace('Bearer ', ''))
    return res.body.authorization
  })
})

// cypress/support/commands.js
Cypress.Commands.add('uiLogin', (email = Cypress.env('adminEmail'), password = Cypress.env('adminPassword')) => {
  cy.visit('/login')
  cy.get('[data-testid="email"]').clear().type(email)
  cy.get('[data-testid="senha"]').clear().type(password) // << aqui era "senha"
  cy.intercept('POST', '**/login').as('loginReq')
  cy.get('[data-testid="entrar"]').click()
  cy.wait('@loginReq').its('response.statusCode').should('be.oneOf', [200, 201])
  cy.url().should('match', /home|dashboard|produtos|\/admin\/home/i)
})


Cypress.Commands.add('apiRequestAuth', (method, url, body = {}) => {
  const base = Cypress.env('apiBaseUrl')
  const token = Cypress.env('token')
  return cy.request({
    method,
    url: `${base}${url}`,
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false,
    body,
  })
})