@dev
Feature: Freebet - GetAllFreeBetBonuses feature

  Scenario: Validate response freebet bonuses
    When I make a GET request to fetch all freebet bonuses
    Then I expect the response status to be OK with code 200
    And The response should match the freebet bonuses schema
    And I expect the response to contain freebet bonuses data
    And the freebet bonus list should contain at least 1 bonuses
    And each freebet bonus should have required fields
