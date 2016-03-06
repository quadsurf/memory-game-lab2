#Memory Game Lab

You're going to create a Javascript memory game on a subject of your choice(web frameworks, dog breeds, etc.)  See the example gifs at the bottom of the page for inspiration.

### The requirements

* The game must consist of at least 16 cards
* Each card `div` has a `data-answer` attribute. This is how the game determines matches: if two cards have the same `data-answer` attribute, they are considered a match. When the page loads, each card should receive a randomly generated `data-answer` value.
* When the user clicks on a card, the "back" of the card is revealed by setting the `background image` property on the card. What image to display should depend on the `data-answer` attribute on the card.
* A user can click two cards each turn.  If they are a match, the cards stay overturned.  Otherwise, both cards flip back over. For example, if the first card has a `data-answer` value of 0 and the second has a `data-answer` value of 6, there is no match, and the cards should flip back over.
* If the user matches all the cards, display a message saying "You win!"
* A reset button which will restart the game and reset the cards
* Style it.  Make it look nice.
* Make all the tests pass!
* Submit a link to your github repo

### Set up

Fork and clone this repo. From the `memory-game-lab` directory, run `npm install`. Then run `npm test` and you should see the tests run. You know the drill: red, green, refactor!

### Bonus Features
* Add a card-flipping animation when the user clicks a card
* Add a time limit.  If the time expires, show the user a game over screen.

![](http://i.gyazo.com/34447e37ef02b367d3961b3078c5c213.gif)

![](http://i.gyazo.com/4d13414cc220fa73443aee2b4fe61ca5.gif)
