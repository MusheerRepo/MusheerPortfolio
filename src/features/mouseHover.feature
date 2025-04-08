Feature: Mouse Hover

Scenario: Hover over an element
    Given the user is on the practice page
    When the user hovers over an element
    Then the dropdown content should be visible
