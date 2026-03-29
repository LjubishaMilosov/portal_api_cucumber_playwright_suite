@dev
Feature: Core - GetLanguages feature

  Scenario: Validate response languages
    When I make a GET request to fetch all languages
    Then I expect the response status to be OK with code 200
    And I expect the response to contain the following data in "Languages"
      | LanguageID  | LanguageISO | LanguageName | LanguageCulture |
      | 12         | EN          | English      | en-EN          |
      | 17         | FR          | French       | fr-FR          |
      | 2          | ES          | Español      | es-ES          |
      | 32         | RS          | Serbian      | sr-RS          |
      | 24         | MK          | Macedonian   | mk-MK          |