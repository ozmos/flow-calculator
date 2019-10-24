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

// remove transition so highlight only lasts a moment @link https://github.com/wesbos/JavaScript30/blob/master/01%20-%20JavaScript%20Drum%20Kit/index-FINISHED.html
function removeTransition(e, className) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove(className);
}

