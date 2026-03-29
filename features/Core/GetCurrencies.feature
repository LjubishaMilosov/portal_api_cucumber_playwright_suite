@dev
Feature: Core - GetCurrencies feature

  Scenario: Validate response currencies
    When I make a GET request to fetch all currencies
    Then I expect the response status to be OK with code 200
    And I expect the response to have currencies data

