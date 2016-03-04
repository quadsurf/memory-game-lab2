function createGameBoard(){
   var tiles = document.querySelectorAll(".container div");
   for (var i = 0; i < tiles.length; i++) {
     if(i < 8){
       tiles[i].setAttribute("data-answer",i);
     } else {
       tiles[i].setAttribute("data-answer",i-8);
     }
     // tiles[i].addEventListener("click", checkClick);
   }
   return tiles;
}

function flippedTileCount() {
  var tiles = document.querySelectorAll(".conatiner div");
  var count = 0;
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].style.backgroundImage) { count++; }
  }
  return count;
}

describe("MemoryGame", function() {

  var tiles;

  beforeEach(function() {
    // var container = document.createElement('div');
    // container.className = "container";
    // document.body.appendChild(container);
    // for (var i = 0; i < 16; i++) {
    //   var tile = document.createElement('div');
    //   container.appendChild(tile);
    // }
    // tiles = document.querySelectorAll('.container div');
    // createGameBoard();
  });

  describe("initial setup", function() {
    it("should shuffle tiles on the board", function() {
      var answers = Array.prototype.slice.call(tiles).map(function(tile) {
        return tile.dataset.answer;
      });
      expect(answers).to.not.deep.equal(['0','0','1','1','2','2','3','3','4','4','5','5','6','6','7','7']);
      expect(answers).to.not.deep.equal(['0','1','2','3','4','5','6','7','0','1','2','3','4','5','6','7']);
    });

    it("should have a reset button", function() {
      var button = document.querySelector('button');
      expect(button).to.not.be.null;
    });

    it("should not have a win message", function() {
      expect(document.body.innerText).to.not.contain('You win!');
    });
  });

  describe("clicking on first tile", function() {

    beforeEach(function() {
      tiles[0].click();
    });

    afterEach(function() {
      document.querySelector('button').click();
    });

    it("should set a background image on the clicked tile", function() {
      expect(tiles[0].style.backgroundImage).to.not.be.empty;
    });

    it("should not set a background image on the tile that was not clicked", function() {
      for (var i = 1; i < tiles.length; i++) {
        expect(flippedTileCount()).to.equal(1);
      }
    });
  });

  describe("clicking on a second tile", function() {

    var countDown;

    beforeEach(function() {
      tiles[0].click();
      countDown = sinon.useFakeTimers();
    });

    afterEach(function() {
      countDown.restore();
      document.querySelector('button').click();
    });

    it("should set a background image only on both clicked tiles", function() {
      tiles[1].click();
      expect(tiles[0].style.backgroundImage).to.not.be.empty;
      expect(tiles[1].style.backgroundImage).to.not.be.empty;
      expect(flippedTileCount()).to.equal(2);
    });
  
    it("should trigger a match if the data-answers are the same", function() {
      var tileIdx = 1;
      while (tiles[tileIdx].dataset.answer !== tiles[0].dataset.answer) {
        tileIdx++;
      }
      tiles[tileIdx].click();
      countDown.tick(1000);
      expect(flippedTileCount()).to.equal(2);
    });

    it("should not trigger a match if the data-answers are different", function() {
      var tileIdx = tiles[1].dataset.answer === tiles[0].dataset.answer ? 1 : 2;
      tiles[tileIdx].click();
      countDown.tick(100);
      expect(flippedTileCount()).to.equal(2);
      countDown.tick(901);
      expect(flippedTileCount()).to.equal(0);
    });

    it("should not trigger a match if the same card is clicked twice", function() {
      tile[0].click();
      countDown.tick(100);
      expect(flippedTileCount()).to.equal(1);
      countDown.tick(901);
      expect(flippedTileCount()).to.equal(1);
    });

  });

  describe("end game", function() {
    it("should tell the player 'You win!'", function() {
      var answers = Array.prototype.slice.call(tiles).map(function(tile) {
        return tile.dataset.answer;
      });
      for (var i = 0; i < 8; i++) {
        tiles[answers.indexOf(i.toString())].click();
        tiles[answers.lastIndexOf(i.toString())].click();
      }
      expect(document.body.innerText).to.contain('You win!');
    });
  });

  describe("reset", function() {

    beforeEach(function() {
      document.querySelector('button').click();
    });

    it("should shuffle the board", function() {
      var answers = Array.prototype.slice.call(tiles).map(function(tile) {
        return tile.dataset.answer;
      });
      expect(answers).to.not.deep.equal(['0','0','1','1','2','2','3','3','4','4','5','5','6','6','7','7']);
      expect(answers).to.not.deep.equal(['0','1','2','3','4','5','6','7','0','1','2','3','4','5','6','7']);
    });

    it("should reset the tiles", function() {
      expect(flippedTileCount()).to.equal(0);
    });
  });

});