it('checks if search works', () => {
  cy.visit('http://localhost:3001/search')
  cy.get('[data-testid="search-input"]').type('pikachu')
  cy.get('[data-testid="search-button"]').click()
  cy.contains('electric').should('exist')
  cy.get('[data-testid="info-card"]').click()
  cy.contains('Pikachu').should('exist')
  cy.contains('Abilities').should('exist').click()
  cy.contains('Static').should('exist')
  cy.contains('Moves').should('exist').click()
  cy.contains('Thunderbolt').should('exist')
})
