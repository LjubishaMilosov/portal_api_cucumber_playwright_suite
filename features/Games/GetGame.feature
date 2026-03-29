@dev
Feature: Games - GetGame feature

  Scenario: Get specific game details
    When I make a GET request to fetch game details with default game code
    Then I expect the response status to be OK with code 200
    And I expect the response to have game information

