Feature: Placeholder application

  Scenario: Page should have 'hello world' text
    Given I navigate to the url "http://localhost:3000"
    When I should see the text "Hello, world"
