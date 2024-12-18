const baseUrl = 'http://localhost:3000';
describe('User Happy Path', () => {
  it('User Happy Path', () => {
    //Navigates from Welcome page to Register page
    cy.visit('/');
    cy.url().should('eq', baseUrl + '/');
    cy.get('button').contains('Sign up').should('be.visible');
    cy.get('button').contains('Sign up').click();
    cy.url().should('include', '/Register');
    cy.contains('Sign up').should('be.visible');

    //Register a new User and Redirects to Dashboard page
    cy.get('input[name="email"]').type('testUser3@Gmail.com');
    cy.get('input[name="name"]').type('testUser3');
    cy.get('input[name="password"]').type('testPassword');
    cy.get('input[name="confirmPassword"]').type('testPassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', baseUrl + '/dashboard');

    // Creates a new presentation successfully
    cy.get('[data-testid="new-presentation"]').should('be.visible').click();

    cy.get('input[name="name"]').type('Test Presentation');
    cy.get('input[name="description"]').type('Test description');
    cy.get('button').contains('create').click();

    cy.contains('Test Presentation').should('be.visible');
    cy.contains('Test description').should('be.visible');
    cy.contains('1 slide').should('be.visible');

    // Clicks on the presentation card and redirects to the workplace
    cy.contains('Test Presentation').click();
    cy.url().should('include', '/presentation/');

    // Updates the thumbnail and name of the presentation successfully
    cy.get('button').contains('Edit presentation').click();
    cy.get('input[name="name"]').clear().type('Modified Test Presentation');
    cy.get('input[name="description"]').clear().type('Modified Test description');
    cy.get('input[type="file"]').selectFile('./src/assets/testThumbnail.png');
    cy.get('button').contains('Submit').click();

    // Back to the dashboard and checks the updated presentation
    cy.get('button').contains('Dashboard').click();
    cy.contains('Modified Test Presentation').should('be.visible');
    cy.contains('Modified Test description').should('be.visible');
    cy.contains('1 slide').should('be.visible');

    // Add some slides in a slideshow deck successfully
    cy.contains('Modified Test Presentation').click();
    cy.get('button').contains('New Slide').click();
    cy.get('[data-testid="nth-slide"]').should('be.visible').contains('1');
    cy.get('button[data-testid="next-slide"]').click();
    cy.get('[data-testid="nth-slide"]').should('be.visible').contains('2');
    cy.get('button[data-testid="prev-slide"]').click();
    cy.get('[data-testid="nth-slide"]').should('be.visible').contains('1');

    // Delete a presentation successfully and redirects to the dashboard
    cy.get('button').contains('Delete Presentation').click();
    cy.contains('Deleting presentation?').should('be.visible');
    cy.get('button').contains('Yes').click();
    cy.url().should('eq', baseUrl + '/dashboard');
    cy.contains('Modified Test Presentation').should('not.exist');

    // Logs out of the application successfully
    cy.get('button').contains('Log Out').click();
    cy.url().should('eq', baseUrl + '/');

    // Logs back into the application successfully
    cy.get('button').contains('Log in').click();
    cy.url().should('eq', baseUrl + '/login');
    cy.get('input[name="email"]').type('testUser3@Gmail.com');
    cy.get('input[name="password"]').type('testPassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', baseUrl + '/dashboard');
  });
});