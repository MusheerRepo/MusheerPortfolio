Feature: Alert Handling

Scenario: Handle a JavaScript alert
    Given the user is on the practice page
    When the user performs an action that triggers a "alert" alert
    Then the user should be able to "accept" the alert
    When the user performs an action that triggers a "confirm" alert
    Then the user should be able to "dismiss" the alert
    When the user performs an action that triggers a "prompt" alert
    Then the user should be able to enter "Test" and accept the alert