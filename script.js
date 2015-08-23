var firstClicked, secondClicked;
var isFirstClicked = false;
var isSecondClicked = false;
var colors = [];
var tiles = [];

function checkClick(){
  console.log(this);
  if(!isFirstClicked && !isSecondClicked){
    firstClicked = this;
    firstClicked.style.backgroundColor = firstClicked.getAttribute("data-answer");
    isFirstClicked = true;
  }
  else if(isFirstClicked && !isSecondClicked){
    secondClicked = this;
    secondClicked.style.backgroundColor = secondClicked.getAttribute("data-answer");
    isSecondClicked = true;
    setTimeout(function(){
      check(firstClicked,secondClicked);
    },300);
  }
}

function check(a,b){
  var answerA = a.getAttribute("data-answer");
  var answerB = b.getAttribute("data-answer");
  if (answerA === answerB){
    a.removeEventListener("click", checkClick);
    b.removeEventListener("click", checkClick);
    a.style.backgroundColor = "white";
    b.style.backgroundColor = "white";
    reset();
  }
  else {
    reset();
    a.style.backgroundColor = "grey";
    b.style.backgroundColor = "grey";
  }

}

function reset(){
  isFirstClicked = false;
  isSecondClicked = false;
  firstClicked = null;
  secondClicked = null;
}

function createGameBoard(){
  for (var i = 0; i < 16; i++) {
    var tile = document.createElement("div");
    tile.setAttribute("data-color",i);
    if(i < 8){
      tile.setAttribute("data-answer",colors[i]);
    }
    else {
      tile.setAttribute("data-answer",colors[i-8]);
    }
    tile.addEventListener("click", checkClick);
    tile.classList.add("gameTile");
    tiles.push(tile);
  }
  return tiles;
}

function addTilesToGameBoard(){
  var tiles = _.shuffle(createGameBoard());
  for(var i =0; i < tiles.length; i++){
    document.querySelector(".container").appendChild(tiles[i]);
  }
}

function createColorsArray(){
  for (var i = 0; i < 8; i++) {
    colors.push(generateRandomColor());
  }
  return colors.concat(colors.slice());
}

function generateRandomColor(){
  return "rgb(" + Math.round(Math.random()*255) + "," + Math.round(Math.random()*255) + "," + Math.round(Math.random()*255) + ")";
}

function addResetListener(){
  document.querySelector(".reset").addEventListener("click", resetBoard);
}

function resetBoard(){
  window.location.reload();
}

function initialize(){
  createColorsArray();
  addTilesToGameBoard();
  addResetListener();
}

window.onload = initialize;