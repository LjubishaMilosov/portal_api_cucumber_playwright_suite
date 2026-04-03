@dev

Feature: Customer - GetDetailsAlternative feature

  Scenario: Validate response details
    When I make a GET request to fetch user details alternative
    Then I expect the response status to be OK with code 200
    Then I expect the  Get User Details and Get User Detail Alternative responses to have correct user details
      | internalID | username               | firstName | lastName       | email                         | phoneNumber  | countryISO | languageISO | currencyISO | isTestCustomer |
      | 710308     | gptestautomationuser   | gptest    | automationuser | gptestautomationuser@test.com | 23475689922  | NG         | EN          | EUR         | false          |
