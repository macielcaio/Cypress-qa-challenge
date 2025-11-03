describe('Carts API', () => {
  before(() => cy.apiLogin())

  it('creates a cart and then cancels (restocks products)', () => {
    const p1 = { nome: `P1 ${Date.now()}`, preco: 100, descricao: 'X', quantidade: 5 }
    const p2 = { nome: `P2 ${Date.now()}`, preco: 200, descricao: 'Y', quantidade: 7 }

    let p1Id, p2Id
    cy.apiRequestAuth('POST', '/produtos', p1).then((r1) => (p1Id = r1.body._id))
    cy.apiRequestAuth('POST', '/produtos', p2).then((r2) => (p2Id = r2.body._id))

    cy.then(() => {
      return cy.apiRequestAuth('POST', '/carrinhos', {
        produtos: [
          { idProduto: p1Id, quantidade: 1 },
          { idProduto: p2Id, quantidade: 2 },
        ],
      })
    }).then((cartRes) => {
      expect(cartRes.status).to.eq(201)

      return cy.apiRequestAuth('DELETE', '/carrinhos/cancelar-compra')
    }).then((cancelRes) => {
      expect([200, 204]).to.include(cancelRes.status)
    }).then(() => {
      cy.apiRequestAuth('DELETE', `/produtos/${p1Id}`)
      cy.apiRequestAuth('DELETE', `/produtos/${p2Id}`)
    })
  })
})
