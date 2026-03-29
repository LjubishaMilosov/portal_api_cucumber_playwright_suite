@dev
Feature: Customer - GetDetails feature

  Scenario: Get customer account details
    When I make a GET request to get customer details
    Then I expect the response status to be OK with code 200
    And I expect the response to have customer information

