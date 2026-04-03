@dev

Feature: Get Portal Brands

  Scenario: Validate response GetPortalBrands
    When I make a GET request to fetch all portal brands
    Then I expect the response status to be OK with code 200
    And I expect the response to contain the following data in "PortalBrands"
      | ID | Name                   | URL                    | IsDefault |
      | 1  | Default                | https://qa.btobet.net/ | true      |
      | 2  | Word Press Premierbet  | http://wordpress.com   | false     |
      | 3  | Word Press Premierbet1 | http://wordpress.com   | false     |
