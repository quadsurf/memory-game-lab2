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

describe("MemoryGame", function() {

  var tiles;

  beforeEach(function() {
    var container = document.createElement('div');
    container.className = "container";
    document.body.appendChild(container);
    for (var i = 0; i < 16; i++) {
      var tile = document.createElement('div');
      container.appendChild(tile);
    }
    tiles = document.querySelectorAll('.container div');
    createGameBoard();
  });

  describe("initial setup", function() {
    xit("should shuffle tiles on the board", function() {
      console.log(Array.prototype.slice.call(tiles).map(function(tile) {
        return tile.dataset.answer;
      }));
    });

    it("should have a reset button", function() {
      var button = document.querySelector('button');
      expect(button).to.not.be.null;
    });
  });

  describe("clicking on first tile", function() {

    beforeEach(function() {
      tiles[0].click();
    });

    it("should set a background image on the clicked tile", function() {
      expect(tiles[0].style.backgroundImage).to.not.be.empty;
    });

    it("should not set a background image on the tile that was not clicked", function() {
      for (var i = 1; i < tiles.length; i++) {
        expect(tiles[i].style.backgroundImage).to.be.empty;
      }
    });
  });

  describe("clicking on a second tile", function() {

    beforeEach(function() {
      tiles[0].click();
    });

    it("should set a background image on both clicked tiles", function() {

    });
  
    it("should trigger a match if the data-answers are the same", function() {

    });

    it("should not trigger a match if the data-answers are different", function() {

    });

    it("should not trigger a match if the same card is clicked twice", function() {

    });

  });

  describe("end game", function() {
    it("should tell the player 'You win!'", function() {

    });
  });

  describe("reset", function() {
    it("should shuffle the board", function() {

    });

    it("should reset the tiles", function() {

    });
  });

});