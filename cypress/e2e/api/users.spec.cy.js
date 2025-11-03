import { faker } from '@faker-js/faker'

describe('Users API', () => {
  it('creates, gets and deletes a user', () => {
    const base = Cypress.env('apiBaseUrl')
    const email = `beltrano.${Date.now()}@qa.com.br`

    // create
    cy.request('POST', `${base}/usuarios`, {
      nome: 'Fulano da Silva',
      email,
      password: 'teste',
      administrador: 'true',
    }).then((res) => {
      expect(res.status).to.eq(201)
      const id = res.body._id

      // get by id
      cy.request('GET', `${base}/usuarios/${id}`).then((getRes) => {
        expect(getRes.status).to.eq(200)
        expect(getRes.body).to.have.property('_id', id)
      })

      // delete
      cy.request('DELETE', `${base}/usuarios/${id}`).then((delRes) => {
        expect([200, 204]).to.include(delRes.status)
      })
    })
  })
})