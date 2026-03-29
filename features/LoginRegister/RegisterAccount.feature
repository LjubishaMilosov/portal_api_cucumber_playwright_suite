@dev
Feature: LoginRegister - RegisterAccount feature

  Scenario: Register new account with dynamic test user
    When I register a new account with dynamic test user data
    Then I expect the response status to be OK with code 200
    And The response should match the register account schema
    And the registered account should have a valid InternalID
    And the registered account should be logged in with a valid token
    And the registration response should contain activation information
    And I should be able to access the generated user credentials
    And the response RequestID should be present and valid
