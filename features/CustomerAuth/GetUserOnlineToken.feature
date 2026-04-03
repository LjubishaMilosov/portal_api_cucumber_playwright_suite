@dev

Feature: CustomerAuth - GetUserOnlineToken feature

  Scenario: Validate response details
    When I make a GET request to fetch user online token
    Then I expect the response status to be OK with code 200
    Then I expect the  response to contain the correct user online token
