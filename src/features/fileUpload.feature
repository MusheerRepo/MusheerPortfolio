Feature: File Upload

Scenario: Upload a file
   Given the user is on the practice page
   When the user uploads "testFile.txt" file
   Then the file "testFile.txt" should be uploaded successfully
