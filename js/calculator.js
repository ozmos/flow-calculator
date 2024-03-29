// TODO: add error for no data available

/**
 * Global variables
 */
//the form itself
const theForm = $('#theForm');
// number inputs for increasing or decreasing the number of sprinklers
const adjusters = $$('.amount').map(cell => cell.querySelector('input[type="number"]'));
// Button for setting pressure and flow rate
const set = $('#set');
// Flow rate adjuster
const flowRate = $('#flow-rate');

/**
 * state 
 **/

// initalise state to null
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


// get value of throw or flow based on pressure 
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
 * Calculations
 */


function updateSingleFlow(input) {
  const nozzleType = getNozzleTypeFromId(input.id);
  const flowRate = state.nozzleData[nozzleType]['flow'];
  // target correct nozzle
  const amount = input.value ? input.value : "0";
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

// Calculate number of stations necessary
function calculateStations () {
  // there are no part stations in irrigation
  $('#stations').textContent = Math.ceil(state.totalFlow / state.availableFlow);
}

// universal reset function
function resetAllValues() {
  setValuesOnArray('.flow', '0');
  $('#total').textContent = '0';
  $('#stations').textContent = '0';
  theForm.reset();
}








