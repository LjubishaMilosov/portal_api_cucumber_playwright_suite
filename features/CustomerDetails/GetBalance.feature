@dev

Feature: Customer - GetBalance feature

  Scenario: Validate response details
    When I make a GET request to fetch user's balance
    Then I expect the response status to be OK with code 200
    Then I expect the response to have correct user's balance details
