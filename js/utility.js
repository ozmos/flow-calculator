// selector library
function $ (selector) {
  return document.querySelector(selector);
}

function $$ (selector) {
  // Array is easier to work with than node list as it has more methods available
  return Array.from(document.querySelectorAll(selector));
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

// universal function to add multiple event listeners to an array of elements
function addListenersToArray (arr, events, callBacks) {
  if (events.length !== callBacks.length) {
    console.error('events and callback function arrays not same length');
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    let el = arr[i];
    for (let j = 0; j < callBacks.length; j++) {
      el.addEventListener(events[j], callBacks[j]);
    }
  }
}

