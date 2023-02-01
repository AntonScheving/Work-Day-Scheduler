const slotBlocks = $("#slot-blocks");
const list = $("#list");

const timeSlots = [
  "9am",
  "10am",
  "11am",
  "12am",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
];

setInterval(function () {
  let displayCurrentDay = moment().format("Do MMMM YYYY, <br><br> hh:mm:ss a");
  document.getElementById("currentDay").innerHTML = displayCurrentDay;
}, 1000);

for (let i = 0; i < timeSlots.length; i++) {
  // Create a new `<div>` for each time
  let timeBlock = $("<div>").addClass("input-group input-group-lg time-block");

  // Create the first `<div>` with the bootstrap time-slot-blocks
  let inputGroupPrepend = $("<div>").addClass("input-group-prepend");
  let spanTag = $("<span>")
    .addClass("input-group-text time-slot-blocks hour")
    .attr("id", "inputGroup-sizing-lg")
    .text(timeSlots[i]);
  inputGroupPrepend.append(spanTag);
  timeBlock.append(inputGroupPrepend);

  // Create the user input element
  let userInput = $("<input>").attr({
    type: "text",
    class: "form-control description",
    "aria-label": "Large",
    "aria-describedby": "inputGroup-sizing-sm",
    id: "user-input-value",
    name: "user-input-text",
  });

  const now = moment().format("H");

  if (timeSlots[i] < now) {
    userInput.addClass("past");
  } else if (timeSlots[i] === now) {
    userInput.addClass("present");
  } else {
    userInput.addClass("future");
  }

  timeBlock.append(userInput);

  // Create the last inner `<div>` with the button
  let inputGroupAppend = $("<div>").addClass("input-group-append");
  let saveButton = $("<button>")
    .addClass("btn btn-outline-secondary saveBtn")
    .attr({
      type: "button",
      id: "save-button",
    })
    .text("Save");

  // console.log(userInput, saveButton);
  saveButton.on("click", function () {
    // console.log(i);
    localStorage.setItem("hour-" + (i + 9), userInput.val());

    if (userInput.val() === "") {
      displayMessage("error", "Oops, nothing to save!");
      setTimeout(function () {
        $(".error").hide();
      }, 3000);
    } else {
      displayMessage("success", "saved successfully");
      setTimeout(function () {
        $(".success").hide();
      }, 3000);
      renderInput();
    }
  });

  list.append(userInput, saveButton);

  inputGroupAppend.append(saveButton);
  timeBlock.append(inputGroupAppend);

  // Append the final `<div>` to the slotBlocks element
  slotBlocks.append(timeBlock);

  let saveMessage = $("<div>").attr({
    id: "save-message",
  });
  $("#message-alert").prepend(saveMessage);
}

$(document).ready(function () {
  renderInput();
});

renderInput();

function displayMessage(type, message) {
  const saveMessage = document.querySelector("#save-message");
  alert(message);
  saveMessage.textContent = message;
  saveMessage.setAttribute("class", type);
}

const saveButton = document.querySelector("#save-button");

function renderInput() {
  for (let i = 9; i < 18; i++) {
    let textInput = localStorage.getItem("hour-" + i);

    if (!textInput) {
      continue;
    }

    $(".time-block")
      .eq(i - 9)
      .children("input")
      .val(textInput);
  }
}

function clearClick() {
  let deleteAllButton = $("<button>")
    .addClass("deleteBtn")
    .attr({
      type: "button",
      id: "delete-button",
    })
    .text("Delete All Data")
    .click(function () {
      localStorage.clear();
    });
  $("#delete-button").append(deleteAllButton);
}
clearClick();
