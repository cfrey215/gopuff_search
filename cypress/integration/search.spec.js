/// <reference types="cypress" />

var popular_search_term = 'Sale';
var no_results_search_term = 'mmm';
var short_search_term = 'Oreo';
var single_search_result_term = "bleech";
var sub_category_string = 'Back to \"oreo\"';

describe("A user", () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("can see a search box", () => {
        cy.contains('product-search')
          .should('be.visible')

        cy.get('#product-search')
          .should('have.attr', 'placeholder', 'search')
    });

    it("can enter a search term with at least one result", () => {
        cy.get('#product-search').type(short_search_term)
          .should('have.value', short_search_term)
        
        cy.get('.hwaccel')
          .should('have.class','gp-product-tile')
          .its('length')
          .should('be.gt', 0)
    });

    it('can clear a search term', () => {
        cy.get('#product-search').type('oreo')
          .should('have.value', 'oreo')
          .clear()
          .should('have.value', '')
    });

    it("can enter a search term with only one result", () => {
        cy.get('#product-search').type(single_search_result_term)
          .should('have.value', single_search_result_term)
        
        cy.get('.hwaccel')
          .should('have.class','gp-product-tile')
          .its('length')
          .should('eq', 1)

        cy.get('.cat-bubble').should('not.exist');    
    });

    it("can enter a search term with no results", () => {
        cy.get('#product-search').type('mmm')
          .should('have.value', 'mmm')
        
        cy.get('.gp-search-column')
          .contains('Couldn\'t find mmm?')
          .contains('Try searching something else')
    });

    it("can select from popular search terms", () => {
        cy.get('.gp-button_list_button')
          .contains(popular_search_term)
          .click()

        cy.get('#product-search')
          .should('have.value', popular_search_term)

        cy.get('.hwaccel')
          .should('have.class','gp-product-tile')

    });

    it("can select a sub category", () => {
        cy.get('#product-search').type(short_search_term)
          .should('have.value', short_search_term)
        
        cy.get('.cat-bubble')
          .contains(short_search_term)
          .click()

        cy.get('.cat-bubble')
          .contains(sub_category_string)
    });    
  });