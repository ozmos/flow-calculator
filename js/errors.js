// enable input when pressure is set
function enableInputs(inputs, condition1, condition2) {
  if (condition1 && condition2) {
    inputs.forEach(input => input.disabled = false);
  } else {
    inputs.forEach(input => input.disabled = true);
  }
  return false;
}

// highlight element when conditions are met 
function highlightElement(element, condition1, condition2, className) {
  if (condition1 && condition2) {
    conditionallyRemoveClass(element, className);  
  } else {
    conditionallyAddClass(element, className);
  }
}


// highlight set button
function highlightSetButton() {
  highlightElement(set, state.pressure, state.availableFlow, 'highlight');
}

// flash color when user tries to enter value below 0
function addError () {
  const condition = this.value <= 0;
  highlightElement(this, !condition, !condition, 'error');
  
}

function removeError (e) {
  this.classList.remove('error');
}

