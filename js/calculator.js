// TODO: add error for no data available

/**
 * Global variables
 */
// number inputs for increasing or decreasing the number of sprinklers
const adjusters = $$('.amount').map(cell => cell.querySelector('input[type="number"]'));
// Button for setting pressure and flow rate
const set = $('#set');

// initalise state to null
/**
 * state 
 **/
const state = {
  pressure: null,
  nozzleData : null,
  availableFlow : 0,
  totalFlow : 0
}

// reusable function to update state
function updateState (key, value) {
  state[key] = value;
  console.log(state);
}


/**
 * Applying correct data values 
 */
// get value of throw or flow based on pressure TODO:refactor to not need cellName
function addDataToCells (cellName, data, metric) {
  const cells = $$(cellName);
  // retrieve nozzle data
  const dataSet = Object.values(data);
  // add correct data to each cell
  cells.forEach((cell, i) => {
    cell.textContent = dataSet[i][metric];
  });
}
 
/**
 * load throw data and update current pressure and nozzle data
 */

function setInititalValues(e) {
  const pressure = $('#pressure').value;
  const availableFlow = parseInt($('#flow-rate').value);
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

/**
 * Calculations
 */
// update flow data when nozzle number is increased TODO: disable number inputs when pressure isn't set
function updateSingleFlowEvent(e) {
  updateSingleFlow(this);
  preventExecution(e);
}

function updateSingleFlow(input) {
  const nozzleType = getNozzleTypeFromId(input.id);
  const flowRate = state.nozzleData[nozzleType]['flow'];
  // target correct nozzle
  const amount = input.value;
  // target correct flow value
  const flowCell = input.parentElement.parentElement.children[3];
  // update cell value to reflect number of nozzles 
  const flowValue = (flowRate * parseInt(amount, 10)).toFixed(2);
  flowCell.textContent = flowValue;
}

// sum total of required flow
function sumFlow () {
  const flowRates = $$('.flow').map(cell => cell.textContent);
  const total = $('#total');
  const totalFlow = flowRates.reduce((a, b) => {
    return (parseFloat(a) + parseFloat(b)).toFixed(2);
  }, 0);
  state.totalFlow = totalFlow; 
  total.textContent = state.totalFlow;
 
}

// sum Flow attached to event
function sumFlowEvent (e) {
  sumFlow();
  preventExecution(e);
}

// Calculate number of stations necessary
function calculateStations () {
  // there are no part stations in irrigation
  $('#stations').textContent = Math.ceil(state.totalFlow / state.availableFlow);
}

function calculateStationsEvent(e) {
  calculateStations();
  preventExecution(e);
}



/***
 * Event Listeners
 ***/

// add event listener to set button

set.addEventListener('click', setInititalValues, false);

// add event listeners to nozzle adjsuster inputs 


addListenersToArray(adjusters, ['change', 'change', 'change'], [updateSingleFlowEvent, sumFlowEvent, calculateStationsEvent]);
/* adjusters.forEach(input => input.addEventListener('change', updateSingleFlow));
adjusters.forEach(input => input.addEventListener('change', sumFlow)); */