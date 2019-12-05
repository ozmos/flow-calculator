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
function addClickError (limit, element) {
  const condition = element.value <= limit;
  console.log();
  highlightElement(element, !condition, !condition, 'error');
 
 
}

//prevent user from entering non-numerical or minus values
function addKeyError (e) {
  if (!detectmob()) {
    const regex1 = /Backspace|Digit\d/;
    const condition = regex1.test(e.code);
    highlightElement(this, condition, condition, 'error');
    if (!condition) {
      preventExecution(e);
    }
  }
 
}

function removeError (e) {
  this.classList.remove('error');
}

// detect if user is on mobile device from @link https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
function detectmob() { 
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ){
     return true;
   }
  else {
     return false;
   }
 }



