Feature: Button Interactions

Scenario: Click a button and verify action
    Given the user is on the practice page
    When the user "left" clicks a button
    Then the expected action should occur
    When the user "right" clicks a button
    Then the expected action should occur
    When the user "double" clicks a button
    Then the expected action should occur
