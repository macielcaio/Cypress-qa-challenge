import AdminHomePage from '../../pages/AdminHomePage'
import ProductFormPage from '../../pages/ProductFormPage'

describe('Admin - Create Product (UI)', () => {
  const name = `Produto Cypress ${Date.now()}`

  beforeEach(() => {
    cy.uiLogin()
  })

  it('opens Admin Home and reaches product creation form', () => {
    AdminHomePage.visit()
    AdminHomePage.clickCadastrarProdutos()
    ProductFormPage.assertLoaded()
  })

  it('blocks submission when required business fields are missing (image not required)', () => {
    AdminHomePage.visit()
    AdminHomePage.clickCadastrarProdutos()
    ProductFormPage.assertLoaded()

    ProductFormPage.submitExpectValidationError()

    ProductFormPage.fill({ nome: name })
    ProductFormPage.submitExpectValidationError()

    ProductFormPage.fill({ preco: 70 })
    ProductFormPage.submitExpectValidationError()
  })

  it('creates a product successfully WITHOUT image', () => {
    AdminHomePage.visit()
    AdminHomePage.clickCadastrarProdutos()
    ProductFormPage.assertLoaded()

    ProductFormPage.fill({
      nome: name,
      preco: 70,
      descricao: 'Produto criado via Cypress e sem imagem',
      quantidade: 5,
    })

    ProductFormPage.submitExpectCreated()
  })
})
