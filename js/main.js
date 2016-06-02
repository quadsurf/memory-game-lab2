Array.prototype.shuffle = function() {
    var currentIndex = this.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Swap it with the current element
        temporaryValue = this[currentIndex];
        this[currentIndex] = this[randomIndex];
        this[randomIndex] = temporaryValue;
    }
}

var data = [
    { id: 1, img: 'http://placehold.it/160x100?text=1' },
    { id: 2, img: 'http://placehold.it/160x100?text=2' },
    { id: 3, img: 'http://placehold.it/160x100?text=3' },
    { id: 4, img: 'http://placehold.it/160x100?text=4' },
    { id: 5, img: 'http://placehold.it/160x100?text=5' },
    { id: 6, img: 'http://placehold.it/160x100?text=6' },
    { id: 7, img: 'http://placehold.it/160x100?text=7' },
    { id: 8, img: 'http://placehold.it/160x100?text=8' }
];

function render() {
    data.shuffle();

    $.each(data, function(i, card) {
        $('.container').append('<div data-answer="'+(card.id)+'"></div>');
    });

    data.shuffle();

    $.each(data, function(i, card) {
        $('.container').append('<div data-answer="'+(card.id)+'"></div>');
    });
}

function hideImage() {
    setTimeout(function() {
        $('.container div.visible:not(.solved)').each(function() {
            $(this).css('background-image', '');
            $(this).removeClass('visible');
        });
    }, 1000);
}
$(function() {
    render();
    $('.container').on('click', 'div', function() {

        if($('.container div.visible:not(.solved)').length >=2) {
            return false;
        }
        // Learn more about grep()
        var i = $(this).data('answer');
        var card = $.grep(data, function(e){ return e.id == i; })[0];

        $(this).addClass('visible');
        $(this).css('background-image', 'url("' + card.img + '")');

        // If the user opens the second image
        if($('.container div.visible:not(.solved)').length > 1) {
            var $other = $('.container div.visible:not(.solved)').not(this);
            if($other.data('answer') == $(this).data('answer')) {
                $other.addClass('solved');
                $(this).addClass('solved');
            } else {
                hideImage();
            }
        }

    });


    // Loading demo image
    for(i=1; i<=8; i++) {
        $('#hidden').append('<img src="http://placehold.it/160x100?text='+(i)+'"></div>');
    }
});
