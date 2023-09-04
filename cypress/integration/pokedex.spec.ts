it('checks if pokedex works', () => {
  cy.visit('http://localhost:3001/pokedex')
  cy.get('[data-testid="info-card"]').should('have.length', 21)
  cy.scrollTo('bottom')
  cy.get('[data-testid="info-card"]').should('have.length', 42)
})
