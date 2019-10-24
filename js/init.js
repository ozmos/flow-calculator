/**
 * load throw data and update current pressure and nozzle data
 */

function setInititalValues(e) {
  // get pressure and flow values
  const pressure = $('#pressure').value;
  const availableFlow = parseInt($('#flow-rate').value);
  // update state
  updateState('pressure', pressure);
  updateState('nozzleData', nozzleData[pressure] );
  updateState('availableFlow', availableFlow );
  addDataToCells('.throw', state.nozzleData, 'throw');
  // adjust total flow rates to reflect new pressure and/or flow
  adjusters.forEach(input => updateSingleFlow(input));
  sumFlow();
  // adjust stations necessary to reflect new data
  calculateStations();
  preventExecution(e);
}

// reset all values
function resetAllValuesEvent(e) {
  resetAllValues();
}

// update flow data when nozzle number is increased TODO: disable number inputs when pressure isn't set
function updateSingleFlowEvent(e) {
  updateSingleFlow(this);
  preventExecution(e);
}

// sum Flow attached to event
function sumFlowEvent (e) {
  sumFlow();
  preventExecution(e);
}

function calculateStationsEvent(e) {
  calculateStations();
  preventExecution(e);
}

/* 
error handling
*/

// number inputs
function enableNumberInputs(e) {
  enableInputs(adjusters, state.pressure, state.availableFlow);
  preventExecution(e);
}

// highlight set button
function highlightSetButton(e) {
  highlightElement(set, state.pressure, state.availableFlow, 'highlight');
  preventExecution(e);
}

function addError (e) {
  const condition = this.value <= 0;
  highlightElement(this, !condition, !condition, 'error');

}

function removeError (e) {
 

  this.classList.remove('error');


 
}
// Initial setup, add event listeners:
function init() {
  enableNumberInputs();
  highlightSetButton();
  set.addEventListener('click', setInititalValues, false);
  set.addEventListener('click', enableNumberInputs, false);
  addListenersToArray(adjusters, ['change', 'change', 'change', 'click', 'transitionend'], [updateSingleFlowEvent, sumFlowEvent, calculateStationsEvent, addError, removeError]);
  theForm.addEventListener('reset', resetAllValuesEvent, false);
} // End of init() function.
window.onload = init;