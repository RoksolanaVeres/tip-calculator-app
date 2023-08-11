// DOM elements
const billInput = document.getElementById("bill");
const customTipInput = document.getElementById("tip");
const peopleNumberInput = document.getElementById("people");
const tipButtonsContainer = document.querySelector(".tip-buttons-container");
const tipPerPersonContainer = document.querySelector(
  ".tip-per-person__container"
);
const totalPerPersonContainer = document.querySelector(
  ".total-per-person__container"
);
const billErrorContainer = document.querySelector(".bill-error__container");
const peopleErrorContainer = document.querySelector(".people-error__container");
const resetButton = document.querySelector(".reset-button");

// variables
let billSum;
let tipPercent;
let numberOfPeople;
let totalTip;

// functions
function allowNumbersOnly(num) {
  let ASCIICode = num.which ? num.which : num.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57) && ASCIICode != 46) {
    alert("Enter numbers only");
    return false;
  }
  return true;
}

function handleBillInput() {
  if (billInput.value == 0) {
    billErrorContainer.textContent = "Can't be zero";
    billInput.style.border = "2px solid #c77b6e";
  } else {
    billErrorContainer.textContent = "";
    billInput.style.border = "none";
    billSum = +billInput.value;
  }
  showCalculatedResults();
}

function handlePeopleNumberInput() {
  if (peopleNumberInput.value == 0) {
    peopleErrorContainer.textContent = "Can't be zero";
    peopleNumberInput.style.border = "2px solid #c77b6e";
  } else {
    peopleErrorContainer.textContent = "";
    peopleNumberInput.style.border = "none";
    numberOfPeople = +peopleNumberInput.value;
  }
  showCalculatedResults();
}

function handleCustomTipInput() {
  removeButtonClickedClass();
  tipPercent = +customTipInput.value;
  showCalculatedResults();
}

function selectFixedTip(event) {
  if (event.target.nodeName === "BUTTON") {
    removeButtonClickedClass();
    let clickedButton = event.target;
    tipPercent = +clickedButton.value;
    clickedButton.classList.add("button--clicked");
    customTipInput.value = "";
  }
  showCalculatedResults();
}

function removeButtonClickedClass() {
  for (let child of tipButtonsContainer.children) {
    child.classList.remove("button--clicked");
  }
}

function calculateTipPerPerson() {
  if (billSum && tipPercent && numberOfPeople) {
    totalTip = (tipPercent * billSum) / 100;
    let tipPerPerson = Math.round((totalTip / numberOfPeople) * 100) / 100;
    return tipPerPerson;
  }
}

function calculateTotalPerPerson() {
  if (billSum && tipPercent && numberOfPeople) {
    let totalAmount = billSum + totalTip;
    let totalPerPerson = Math.round((totalAmount / numberOfPeople) * 100) / 100;
    return totalPerPerson;
  }
}

function showCalculatedResults() {
  if (billSum && tipPercent && numberOfPeople) {
    tipPerPerson = calculateTipPerPerson();
    tipPerPersonContainer.textContent = `$${tipPerPerson}`;
    totalPerPerson = calculateTotalPerPerson();
    totalPerPersonContainer.textContent = `$${totalPerPerson}`;
    resetButton.disabled = false;
  }
}

function reset() {
  billSum = null;
  tipPercent = null;
  numberOfPeople = null;
  billInput.value = "";
  customTipInput.value = "";
  peopleNumberInput.value = "";
  tipPerPersonContainer.textContent = "$0.00";
  totalPerPersonContainer.textContent = "$0.00";
  resetButton.disabled = true;
  removeButtonClickedClass();
}

// event listeners
billInput.addEventListener("focusout", handleBillInput);
peopleNumberInput.addEventListener("focusout", handlePeopleNumberInput);
tipButtonsContainer.addEventListener("click", selectFixedTip);
customTipInput.addEventListener("focusout", handleCustomTipInput);
resetButton.addEventListener("click", reset);
