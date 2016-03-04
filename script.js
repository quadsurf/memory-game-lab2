var firstClicked, secondClicked;
var isFirstClicked = false;
var isSecondClicked = false;
var colors = [];
var tiles = [];
var matches = 0;
var images = [
  'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/12139772_1505254603125289_528760867_n.jpg',
  'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/11809944_1676694042554573_495250395_n.jpg',
  'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/12558352_1196577663703722_704750205_n.jpg',
  'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/12393970_514965278663200_509732690_n.jpg',
  'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/12298875_990874390951233_212585837_n.jpg',
  'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/11910328_1758440887716729_135946346_n.jpg',
  'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/12393817_575365202620951_965839874_n.jpg',
  'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/12545369_191849081168083_75297221_n.jpg'
];
var winning = document.getElementById("winner");

function checkClick(){
  if(!isFirstClicked && !isSecondClicked){
    firstClicked = this;
    firstClicked.style.backgroundImage = 'url('+images[firstClicked.getAttribute("data-answer")]+')';
    isFirstClicked = true;
  }
  else if(isFirstClicked && !isSecondClicked){
    secondClicked = this;
    secondClicked.style.backgroundImage = 'url('+images[secondClicked.getAttribute("data-answer")]+')';
    if (firstClicked !== secondClicked) {
      isSecondClicked = true;
      setTimeout(function(){
        check(firstClicked,secondClicked);
      },500);
    }
  }
}

function check(a,b){
  var answerA = a.getAttribute("data-answer");
  var answerB = b.getAttribute("data-answer");
  if (answerA === answerB){
    a.removeEventListener("click", checkClick);
    b.removeEventListener("click", checkClick);
    reset();
    matches++;
    if (matches === 8) {
      winning.innerText = "You win!"
    }
  }
  else {
    reset();
    a.style.backgroundImage = "";
    b.style.backgroundImage = "";
  }

}

function reset(){
  isFirstClicked = false;
  isSecondClicked = false;
  firstClicked = null;
  secondClicked = null;
}

function createGameBoard(){
  var tiles = document.querySelectorAll('.container > div'); 
  var indices = [0,1,2,3,4,5,6,7];
  var randomAnswers = _.shuffle(indices.concat(indices));
  for (var i = 0; i < 16; i++) {
    tiles[i].setAttribute("data-answer",randomAnswers[i]);
    tiles[i].addEventListener("click", checkClick);
  }
}

function addResetListener(){
  document.querySelector("#reset").addEventListener("click", resetBoard);
}

function resetBoard(){
  window.location.reload();
}

function initialize(){
  createGameBoard();
  addResetListener();
}

window.onload = initialize;