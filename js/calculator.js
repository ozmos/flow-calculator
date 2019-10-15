// initalise state to null
const state = {
  nozzleData : null
}

// update state when pressure changes
function updateState (pressure) {
  state.nozzleData = nozzleData[pressure];
}

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
 

// apply correct throw and flow to nozzle, depending on pressure
function setValues(e) {
  const pressure = $('#pressure').value;
  updateState(pressure);
  addDataToCells('.throw', state.nozzleData, 'throw');
  addDataToCells('.flow', state.nozzleData, 'flow');

  preventExecution(e);
}

// update flow data when nozzle number is increased
function updateSingleFlow(e) {
  const nozzleType = getNozzleTypeFromId(this.id);
  const flowRate = state.nozzleData[nozzleType]['flow'];
  // target correct nozzle
  const amount = this.value;
  // target correct flow value
  const flowCell = this.parentElement.parentElement.children[3];
  // update cell value to reflect number of nozzles 
  flowCell.textContent = flowRate * parseInt(amount, 10);
 
}

// add event listener to set button
const set = $('#set');
set.addEventListener('click', setValues, false);

// add event listeners to nozzle adjsuster inputs
const adjusters = Array.from($$('.amount')).map(cell => cell.querySelector('input[type="number"]'));
adjusters.forEach(input => input.addEventListener('change', updateSingleFlow));