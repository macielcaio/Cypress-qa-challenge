describe('Products API', () => {
  before(() => cy.apiLogin())

  it('creates, updates and deletes a product', () => {
    const rnd = Date.now()
    const product = {
      nome: `Logitech M Vertical ${rnd}`,
      preco: 470,
      descricao: 'Mouse',
      quantidade: 10,
    }

    // create
    cy.apiRequestAuth('POST', '/produtos', product).then((res) => {
      expect(res.status).to.eq(201)
      const id = res.body._id

      // update
      cy.apiRequestAuth('PUT', `/produtos/${id}`, { ...product, quantidade: 12 })
        .its('status')
        .should('be.oneOf', [200, 204])

      // delete
      cy.apiRequestAuth('DELETE', `/produtos/${id}`)
        .its('status')
        .should('be.oneOf', [200, 204])
    })
  })
})