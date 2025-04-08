Feature: Dropdown Selection

Scenario: Select an option from a dropdown
    Given the user is on the practice page
    When the user selects an "India" option from the dropdown
    Then the selected "India" option should be displayed
