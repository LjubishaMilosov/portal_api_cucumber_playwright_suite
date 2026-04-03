@dev
Feature: Core - GetCountries feature

  Scenario: Validate response countries
    When I make a GET request to fetch all countries
    Then I expect the response status to be OK with code 200
    And The response should match the countries schema
    And I expect the response to contain the following data in "Countries"
      | CountryID | CountryISO | CountryName | CountryMinAge |
      | 1         | AF         | Afghanistan | 0             |
      | 25        | BR         | Brasil      | 0             |
      | 36        | CM         | Cameroon    | 0             |
      | 48        | CO         | Colombia    | 0             |
      | 51        | CG         | Congo       | 0             |







