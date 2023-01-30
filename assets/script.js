
/*
//Pseudocode Outline

// 1. Define the problem and gather requirements
- Understand the problem and the desired outcome
- Identify any constraints or limitations
- Gather any necessary information or data

        - This app needs to allow the user to enter text into fields that correspond to the time of day.

// 2. Break down the problem into smaller subproblems
- Identify the main tasks or functions required to solve the problem
- Break down each main task into smaller subtasks
- Prioritize the subtasks based on importance or dependencies

        - I need to understand date and time using moment.js
        -dynamically update the styling of the timeblocks based o the time of day
        - how to use local storage so the data entered is saved
        -understand eventlisteners
        - use either CSS or Javascript for styling
        - Understand what Persist events between refreshes of a page means


// 3. Design the overall structure of the program
- Choose the appropriate data structures and algorithms to use
- Decide on the program flow and the order of execution
- Determine how the various functions and modules will interact

        - I will use Javascript to make the app interactive
        - I will use jquery
        - I will use moment.js
        - I will use Bootstrap

// 4. Write the pseudocode for each subtask
- Write clear and concise pseudocode for each subtask, focusing on the input, output, and the main steps required
- Test and refine the pseudocode as needed

Done    - Display the current day at the top of           
          the calender when a user opens the planner.
                - read the moment documentation
                - add the link to moment in Javascript
                - get the correct date format from moment
                - find the correct place to addd the date display code.

        - Present timeblocks for standard business hours when the user scrolls down.      
                - can I use bootstrap to create the time blocks or jquery
                - add the time to the time blocks
                - Make the timeblocks change colour based on time of day (past - present & future)
                
        - Allow a user to enter an event when they click a timeblock
                - add a user input option in the time blocks

        - Save the event in local storage when the save button is clicked in that timeblock.
                - add the user input data in local storage 

        - Persist events between refreshes of a page
                - Find out what this means


*/


const inputFields = $("#input-fields");
const inputText = $("#input-text");
const slotBlocks = $("#slot-blocks");

const userInputValue = document.querySelector("#user-input-value");
// const saveButton = document.querySelector("#save-button");
// const saveMessage = document.querySelector("#save-message");

const timeSlots = ["9am", "10am", "11am", "12am", "1pm", "2pm ", "3pm", "4pm", "5pm"];

setInterval(function() {
let displayCurrentDay = moment().format("Do MMMM YYYY, <br><br> hh:mm:ss a");
document.getElementById("currentDay").innerHTML = displayCurrentDay;
}, 1000);

// for (let i = 0; i < timeSlots.length; i++) {
//     // Create a new `<div>` for each time
//     let timeBlocks = $("<div>");

//     // timeBlocks.text(timeSlots[i]);

//     timeBlocks.addClass("time-blocks");

//     slotBlocks.append(timeBlocks);
// }


for (let i = 0; i < timeSlots.length; i++) {
    // Create a new `<div>` for each time
    let timeBlock = $("<div>li:odd").addClass("input-group input-group-lg");

    // Create the first `<div>` with the bootstrap time-slot-blocks 
    let inputGroupPrepend = $("<div>").addClass("input-group-prepend");
    let spanTag = $("<span>").addClass("input-group-text time-slot-blocks")
        .attr("id", "inputGroup-sizing-lg")
        .text(timeSlots[i]);
    inputGroupPrepend.append(spanTag);
    timeBlock.append(inputGroupPrepend);

    // Create the user input element
    let userInput = $("<input>").attr({
        type: "text",
        class: "form-control",
        "aria-label": "Large",
        "aria-describedby": "inputGroup-sizing-sm",
        id: "user-input-value",
        name: "user-input-text"
    });
    timeBlock.append(userInput);

    // Create the last inner `<div>` with the button
    let inputGroupAppend = $("<div>").addClass("input-group-append");
    let saveButton = $("<button>").addClass("btn btn-outline-secondary")
        .attr({
            type: "button",
            id: "save-button"
        })
        .text("Save");
    inputGroupAppend.append(saveButton);
    timeBlock.append(inputGroupAppend);

    // Append the final `<div>` to the slotBlocks element
    slotBlocks.append(timeBlock);

    let saveMessage = $("<div>").attr({
        id: "save-message"
    });
};

function displayMessage(type, message) {
    const saveMessage = document.querySelector("#save-message");

    saveMessage.textContent = message;
    saveMessage.setAttribute("class", type);
};

function renderInput() {
    let textInput = localStorage.getItem("user-input-text");

    if (!textInput) {
        return;
    };


};

const saveButton = document.querySelector("#save-button");

saveButton.addEventListener("click", function(event) {
    event.preventDefault()
    const textInput = document.querySelector("#user-input-value").value;

    if (!textInput === "") {
        displayMessage("Oops, nothing to save!");
    } else {
        displayMessage("success", "saved successfully")
    
   localStorage.setItem("user-input-text", textInput)
   renderInput();
}
});





//   This is to make multiple time blocks


// for (let i = 0; i < userInputValues.length; i++) {
//     userInput();
//     // Create a new `<div>` for each time
//     // let userInputBlocks = $("<form>");

//     // userInputBlocks.text(""[i]);

//     // userInputBlocks.addClass("col");

//     // inputText.append(userInputBlocks);
// }


// function userInput(event) {
//     event.preventDefault();
    
//     const inputFields = $("input[name=planner-input").val();

//     if (!inputFields) {
//         console.log("No input from user in the timeslot");
//         return;
//     }

// }
// inputFields.on("click", userInput);