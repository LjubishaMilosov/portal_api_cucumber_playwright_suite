@dev

Feature: Customer - GetBalanceWithTax feature

  Scenario: Validate response details
    When I make a GET request to get user's balance with tax
    Then I expect the response status to be OK with code 200
    Then I expect the response to have the correct user's balance details with tax
