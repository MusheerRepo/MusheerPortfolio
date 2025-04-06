Feature: Form Submission

    Scenario: Submit a form with valid data
        Given the user is on the practice page
        When the user fills out the form with valid data
        And the user clicks the submit button
        And a success message "Form Submitted!" should be displayed
