var keys = document.querySelectorAll(".key");
console.log(keys);
keys.forEach(key => {
    key.addEventListener("click", () => {
        playnote(key);
    })
});

function playnote(key){
    const note_audio = document.getElementById(key.dataset.key);
    note_audio.currentTime = 0;
    note_audio.play();
}

// CONWAYS

var sizey = 17;
var sizex = 18;
var htmlElements;
var cells;
var EMPTY = 0;
var ALIVE = 1;
var play = document.querySelector(".play")
var stop = document.querySelector(".stop")
var cellNote = [
    ["Ab4", "A4", "Bb4", "B4", "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5", "C6", "Db6"],
    ["Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5"],
    ["E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5"],
    ["D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5"],
    ["C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5", "D5", "Eb5", "E5", "F5"],
    ["Bb3", "B3", "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5", "D5", "Eb5"],
    ["Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5"],
    ["Gb3", "G3", "Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4"],
    ["E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4"],
    ["D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4"],
    ["C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4", "E4", "F4"],
    ["Bb2", "B2", "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4"],
    ["Ab2", "A2", "Bb2", "B2", "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", "C4", "Db4"],
    ["Gb2", "G2", "Ab2", "A2", "Bb2", "B2", "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3"],
    ["E2", "F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2", "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3"],
    ["D2", "Eb2", "E2", "F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2", "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3"],
    ["C2", "Db2", "D2", "Eb2", "E2", "F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2", "C3", "Db3", "D3", "Eb3", "E3", "F3"]
];

function createField() {
  htmlElements = [];
  cells = [];
  var table = document.getElementById('field');
  for (var y = 0; y < sizey; y++) {
    var tr = document.createElement('tr');
    var tdElements = [];
    cells.push(new Array(sizex).fill(EMPTY));
    htmlElements.push(tdElements);
    table.appendChild(tr);
    for (var x = 0; x < sizex; x++) {
      var td = document.createElement('td');
      tdElements.push(td);
      tr.appendChild(td);
    }
  }
}

function draw() {
  for (var y = 0; y < sizey; y++) {
    for (var x = 0; x < sizex; x++) {
      htmlElements[y][x].setAttribute('class', 'cell ' + (cells[y][x] == 1 ? 'filled' : 'empty'));
      htmlElements[y][x].setAttribute('data-y',[y]);
      htmlElements[y][x].setAttribute('data-x',[x]);

    }
  }
}

function countNeighbours(x, y) {
  var count = 0;
  for (dy = -1; dy <= 1; dy++) {
    for (dx = -1; dx <= 1; dx++) {
      var nx = (x + dx + sizex) % sizex, ny = (y + dy + sizey) % sizey;
      count = count + cells[ny][nx];
    }
  }
  return count - cells[y][x];
}

function newGeneration() {
  var newCells = [];
  for (var i = 0; i < sizey; i++) {
    newCells.push(new Array(sizex).fill(EMPTY));
  }
  for (var y = 0; y < sizey; y++) {
    for (var x = 0; x < sizex; x++) {
      var neighbours = countNeighbours(x, y);
      if (cells[y][x] == EMPTY && neighbours == 3) {
        newCells[y][x] = ALIVE;
      }
      if (cells[y][x] == ALIVE && (neighbours == 2 || neighbours == 3)) {
        newCells[y][x] = ALIVE;
      }

    }
  }
  cells = newCells;
  draw();
}
function playcell(){
    for(var y = 0; y < sizey; y++){
        for(var x = 0;x < sizex;x++){
            if(cells[y][x] == ALIVE){
                var note = document.getElementById(cellNote[y][x]);
                note.currentTime = 0;
                note.play();
              }
        }
    }
}
function init() {
  createField();
  draw();
  var cellElements = document.querySelectorAll(".cell");
  cellElements.forEach(cell => {
      cell.addEventListener("click", () => {
          if(cell.classList[1] == "empty"){
              cell.classList.replace("empty","filled")
              cells[cell.dataset.y][cell.dataset.x] = 1;
        }else{
            cell.classList.replace("filled","empty")
            cells[cell.dataset.y][cell.dataset.x] = 0;
        }

        })
    })
    console.log(cellElements);
}
var a;
play.addEventListener("click", () => {
    a = setInterval(newGeneration, 500);
    setInterval(playcell,510);
})
stop.addEventListener("click", () => {
    clearInterval(a);
})
init();