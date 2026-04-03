@dev

Feature: Core - GetGameProviders feature

  Scenario: Validate response GetGameProviders
    When I make a GET request to fetch All game providers
    Then I expect the response status to be OK with code 200
    And I expect the response to contain the following data in "GameProviders"
      | ProviderID | ProviderName | ProviderIconPath | GameCodePrefix | Active |
      | 12         | LuckyStreak  | null             | LuckyStre_     | false  |
      | 25         | Ainsworth    | null             | NYX_           | false  |
      | 26         | Aristocrat   | null             | NYX_           | false   |
      | 39         | Ezugi        | null             | Ezugi_         | false  |
      | 22         | PariPlay     | null             | PPL_           | true   |
      # | 1029       | Test         | 2                | null           | false  |
