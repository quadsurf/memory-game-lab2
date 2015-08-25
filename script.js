var firstClicked, secondClicked;
var isFirstClicked = false;
var isSecondClicked = false;
var imageSrcs = [];
var tiles = [];

function checkClick(){
  if(!isFirstClicked && !isSecondClicked){
    firstClicked = this;
    firstClicked.classList.toggle('flipped');
    isFirstClicked = true;
  }
  else if(isFirstClicked && !isSecondClicked){
    secondClicked = this;
      if (firstClicked !== secondClicked) {
        secondClicked.classList.toggle('flipped');
        isSecondClicked = true;
        setTimeout(function(){
        check(firstClicked,secondClicked);
      },900);
    }
  }
}

function check(a,b){
  var answerA = a.querySelector('img').src.split('whiskey')[1][0];
  var answerB = b.querySelector('img').src.split('whiskey')[1][0];
  if (answerA === answerB){
    a.removeEventListener("click", checkClick);
    b.removeEventListener("click", checkClick);
    reset();
  }
  else {
    reset();
    a.classList.toggle('flipped');
    b.classList.toggle('flipped');
  }

}

function reset(){
  isFirstClicked = false;
  isSecondClicked = false;
  firstClicked = null;
  secondClicked = null;
}

function addImagesToGameBoard(){
  var images = _.shuffle(createImgSrcs());
  images.forEach(function(imageSrc,idx){
    document.querySelectorAll("img")[idx].src = imageSrc;
  });
}

function createImgSrcs(){
  for (var i = 0; i < 8; i++) {
    imageSrcs.push('assets/whiskey'+(i+1)+'.png');
  }
  return imageSrcs.concat(imageSrcs.slice());
}

function addResetListener(){
  document.querySelector(".reset").addEventListener("click", resetBoard);
}

function resetBoard(){
  window.location.reload();
}

function addTileListeners() {
  var tiles = document.querySelectorAll(".gameTile");
  for ( var i  = 0, len = tiles.length; i < len; i++ ) {
    var tile = tiles[i];
    tile.addEventListener("click", checkClick);
  }
}

function initialize(){
  addImagesToGameBoard();
  addTileListeners();
  addResetListener();
}

window.onload = initialize;