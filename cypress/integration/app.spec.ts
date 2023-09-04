describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
  })

  it('checks if the navbar works', () => {
    cy.contains('Search').click()
    cy.url().should('include', '/search')
    cy.contains('Pokedex').click()
    cy.url().should('include', '/pokedex')
    cy.visit('http://localhost:3001')
    cy.get('[data-testid="info-card"').should('exist')
  })
})
