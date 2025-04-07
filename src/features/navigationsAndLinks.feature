Feature: Navigation and Links 

   Scenario: Click a link and verify navigation
   Given the user is on the practice page
   When the user clicks a link
   Then the browser should navigate to "https://www.selenium.dev/"
