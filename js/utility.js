// selector library
function $ (selector) {
  return document.querySelector(selector);
}

function $$ (selector) {
  return document.querySelectorAll(selector);
}

// stop callbacks from executing on all browsers
function preventExecution(e) {
  if (e.preventDefault()) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
 
  return false;

}
// get nozzle type from id
function getNozzleTypeFromId(id) {
  return id.match(/\d+\.\d+/)[0];
}

// get child of element based on className
