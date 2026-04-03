@dev

Feature: Update User

  Scenario: Update user 
    When I make a POST request to update the user
    Then I expect the response status to be OK with code 200
