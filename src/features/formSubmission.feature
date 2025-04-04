Feature: Form Submission

    Scenario: Submit a form with valid data
        Given the user is on the practice page
        When the user fills out the form with valid data
        And the user clicks the submit button
        Then the form should be submitted successfully
        And a success message should be displayed
