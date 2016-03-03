var images = ['https://media.giphy.com/media/Q5wEEjz5qx5rG/giphy.gif',
  'https://media.giphy.com/media/3o6gbaGOfsCs5wP5pm/giphy.gif',
  'https://media.giphy.com/media/5fMlYckytHM4g/giphy.gif',
  'https://media.giphy.com/media/l2JIij23SkdnTjQkw/giphy.gif',
  'https://media.giphy.com/media/l2JIgsp6LqBDyUg48/giphy.gif',
  'https://media.giphy.com/media/kUZcvqvOKkTi8/giphy.gif',
  'https://media.giphy.com/media/rJ0w60oeJ3Im4/giphy.gif',
  'https://media.giphy.com/media/3oEdv0JkrzHA438Biw/giphy.gif',
  'https://media.giphy.com/media/gaUh1r5mhz3Fe/giphy.gif',
  'https://media.giphy.com/media/cSozWbWHEfUis/giphy.gif',
  'https://media.giphy.com/media/kS2qLKwGk3MXe/giphy.gif',
  'https://media.giphy.com/media/Rt0vHXcmEbnMs/giphy.gif']

var firstClicked;
var secondClicked;
var matches = 0;

function checkClick() {
  if (!this.style.backgroundImage) {
    if (!firstClicked) {
      firstClicked = this;
    } else if (!secondClicked) {
      secondClicked = this;
      if (firstClicked.dataset.src === secondClicked.dataset.src) {
        firstClicked = null;
        secondClicked = null;
        matches += 1;
        if (matches == 8) {
          youWon();
        }
      } else {
        window.setTimeout(function() {
          firstClicked.style.backgroundImage = '';
          secondClicked.style.backgroundImage = '';
          firstClicked = null;
          secondClicked = null;
        }, 750);
      }
    }
    this.style.backgroundImage = 'url(' + this.dataset.src + ')';
  }
}

function youWon() {
  document.querySelector('.winner').style.display = 'block';
}

function reset() {
  firstClicked = null;
  secondClicked = null;
  matches = 0;
  addImagesToGameBoard();
  document.querySelector('.winner').style.display = 'none';
}

function addImagesToGameBoard() {
  var eightImages = _.shuffle(images).splice(0, 8);
  var sixteenImages = _.shuffle(eightImages.concat(eightImages));
  sixteenImages.forEach(function(imageSrc,idx){
    var elem = document.querySelectorAll(".gameTile")[idx];
    elem.dataset.src = imageSrc;
    elem.style.backgroundImage = '';
  });
}

function addResetListener() {
  document.querySelectorAll(".reset")[0].addEventListener("click", reset);
  document.querySelectorAll(".reset")[1].addEventListener("click", reset);
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
