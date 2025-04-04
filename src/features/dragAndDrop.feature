Feature: Drag and Drop

    Scenario: Drag an element to a droppable area
        Given the user is on the practice page
        When the user drags an element to a droppable area
        Then the element should be dropped correctly
