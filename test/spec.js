describe("MemoryGame", function() {

  var tiles;
  var container;
  var countDown;

  function flippedTileCount() {
    var count = 0;
    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].style.backgroundImage) { count++; }
    }
    return count;
  }

  beforeEach(function() {
    container = document.createElement('div');
    container.className = "container";
    
    // add game tiles
    document.body.appendChild(container);
    for (var i = 0; i < 16; i++) {
      var tile = document.createElement('div');
      container.appendChild(tile);
    }
    tiles = document.querySelectorAll('.container div');
    
    // add reset button
    var button = document.createElement('button');
    button.id = "reset";
    container.appendChild(button);
    
    // add hidden winner div
    var winner = document.createElement('div');
    winner.id = "winner";
    container.appendChild(winner);

    // initialize the game
    initialize();
  });

  afterEach(function() {
    document.body.removeChild(container);
  });

  describe("initial setup", function() {
    it("should shuffle tiles on the board", function() {
      var answers = Array.prototype.slice.call(tiles).map(function(tile) {
        return tile.dataset.answer;
      });
      expect(answers.filter(Boolean)).to.not.be.empty;
      expect(answers).to.not.deep.equal(['0','0','1','1','2','2','3','3','4','4','5','5','6','6','7','7']);
      expect(answers).to.not.deep.equal(['0','1','2','3','4','5','6','7','0','1','2','3','4','5','6','7']);
    });

    it("should not have a win message", function() {
      expect(document.body.innerText).to.not.contain('You win!');
    });
  });

  describe("clicking on first tile", function() {

    beforeEach(function() {
      tiles[0].click();
    });

    it("should set a background image on the clicked tile", function() {
      expect(tiles[0].style.backgroundImage).to.not.be.empty;
    });

    it("should not set a background image on tiles that were not clicked", function() {
      expect(flippedTileCount()).to.equal(1);
    });
  });

  describe("clicking on a second tile", function() {

    beforeEach(function() {
      tiles[0].click();
      countDown = sinon.useFakeTimers();
    });

    afterEach(function() {
      countDown.restore();
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
      tiles[0].click();
      countDown.tick(100);
      expect(flippedTileCount()).to.equal(1);
      countDown.tick(901);
      expect(flippedTileCount()).to.equal(1);
    });

  });

  describe("end game", function() {
    it("should tell the player 'You win!'", function() {
      countDown = sinon.useFakeTimers();
      var answers = Array.prototype.slice.call(tiles).map(function(tile) {
        return tile.dataset.answer;
      });
      for (var i = 0; i < 8; i++) {
        tiles[answers.indexOf(i.toString())].click();
        tiles[answers.lastIndexOf(i.toString())].click();
        countDown.tick(2001);
      }
      expect(document.body.innerText).to.contain('You win!');
      countDown.restore();
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
      expect(answers.filter(Boolean)).to.not.be.empty;
      expect(answers).to.not.deep.equal(['0','0','1','1','2','2','3','3','4','4','5','5','6','6','7','7']);
      expect(answers).to.not.deep.equal(['0','1','2','3','4','5','6','7','0','1','2','3','4','5','6','7']);
    });

    it("should reset the tiles", function() {
      expect(flippedTileCount()).to.equal(0);
    });
  });

});