'use strict';

//Global Variables
const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#333333';
let mode = 'default';

let inputSizeValue = document.getElementById('gridZise'),
    colorPicker = document.querySelector('.color-picker'),
    colorBtn = document.querySelector('.color-btn'),
    eraserBtn = document.querySelector('.eraser-btn'),
    clearBtn = document.querySelector('.clear-btn'),
    gridContainer = document.getElementById('grid');

//Event listeners
colorBtn.addEventListener('click', () => {
  setCurrentMode('color');
});
eraserBtn.addEventListener('click', () => {
  setCurrentMode('eraser');
});
clearBtn.addEventListener('click', clearGrid);
inputSizeValue.addEventListener('change', () => {
  clearGrid();
  changeGridSize();
});

function setCurrentMode(newMode) {
  mode = newMode;
}

//Clean all grid
function clearGrid() {
  gridContainer.innerHTML = '';
  createGrid(DEFAULT_SIZE);
}

//Update size of grid
function changeGridSize() {
  let currentSize = inputSizeValue.value;

  if(currentSize > 64 || currentSize < 16) {
    showModalWindow('Invalid value, must be in a range from 16 to 64');
    createGrid(DEFAULT_SIZE);
  } else {
    createGrid(currentSize);
  }
}

//Draw grid in HTML
function createGrid(size) {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for(let i = 0; i < (size * size); i++) {
    let gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.addEventListener('mouseover', changeColor);
    gridContainer.appendChild(gridItem);
  }
  
}

//Paint in grid
function changeColor(e) {
  if(mode === 'default') {
    setCurrentColorPicker(e);
  } else if(mode === 'color') {
    e.target.style.backgroundColor = getRandomColor();
  } else if(mode === 'eraser') {
    e.target.style.backgroundColor = '#cad4d6';
  }
}

//Change color from input
function setCurrentColorPicker(e) {
  e.target.style.backgroundColor = colorPicker.value;
}

//Color picker
window.addEventListener('load', startup, false);

function startup() {
  colorPicker.value = DEFAULT_COLOR;
  colorPicker.addEventListener("input", updateMode, false);
  colorPicker.select();
}

function updateMode() {
  mode = 'default';
}

//Create random color
function getRandomColor() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}
//Modal window
function showModalWindow(message) {
	var dialog = document.createElement('div'),
		  dialogOverlay = document.createElement('div');

	dialogOverlay.className = 'dialog-overlay';
	dialog.className = 'dialog';

	dialog.innerHTML = `<p>${message}</p>`;

	document.body.append(dialogOverlay, dialog);

	setTimeout(function(){
		dialogOverlay.remove();
		dialog.remove();
	}, 5000);
}

window.onload = () => {
  createGrid(DEFAULT_SIZE);
}