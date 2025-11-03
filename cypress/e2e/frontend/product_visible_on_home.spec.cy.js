// cypress/e2e/frontend/product_visible_on_home.spec.cy.js
describe('Product listing renders on Home', () => {
  it('shows at least one product card and each card displays name and price', () => {
    cy.uiLogin()
    cy.intercept('GET', '**/produtos').as('getProducts')

    cy.visit('/home')
    cy.wait('@getProducts').its('response.statusCode').should('eq', 200)

    cy.get('section.row .card .card-body')
      .filter(':visible')
      .as('cards')
      .should('have.length.at.least', 1)

    cy.get('@cards').each(($card) => {
      cy.wrap($card).within(() => {
        cy.get('h5.card-title')
          .should('be.visible')
          .invoke('text')
          .then((text) => {
            expect(text.trim().length, 'product name not empty').to.be.greaterThan(0)
          })

        cy.get('h6.card-subtitle')
          .should('have.length.at.least', 1)
          .then(($h5) => {
            const texts = [...$h5].map((el) => el.innerText)
            expect(texts.some((t) => /Preço/i.test(t)), 'contains "Preço" label').to.be.true
            expect(texts.some((t) => /(\$|R\$)\s*\d+/.test(t)), 'contains price value').to.be.true
          })
      })
    })
  })
})
