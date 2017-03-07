
var simonBoard = function() {
console.log('playyyy');
var play = true;
$('main').children().remove();
var simon = `<section class="container">
                <div class='box yellow'></div>
                <div class='box red'></div>
                <div class='box blue'></div>
                <div class='box green'></div>
                <div class='center'>
                    <h1>SIMON</h1>
                </div>
            </section>
            <section class="board">
                <div class="score">
                    <div id='quit' class ="quit" onclick = "mainBoard(${play})">quit</div>
                </div>
                <div class="score">
                    <div class='level'>level:</div>
                    <div class="lives">chances:</div>
                </div>`;
                $('main').append(simon);
}

var mainBoard = function(play) {
    if(play === true) {
    $('main').children().remove();
    simonBoard.play = false;
    }
    var intro =  `
        <div>
        <h2 class='header'> SIMON</h2>
        <h3> DO WHAT SIMON SAYS</h3>
        <h4>FOLLOW THE LIGHTS AND PATTERNS AS LONG AS YOU CAN.. <br>IF YOU MISS A PATTERN YOU WILL LOSE A CHANCE <br> you will start with 3 chances</h4>
        <h2 id="play" onclick = "simonBoard()"> Play</h2>
        </div>`;
    $('main').append(intro);
}

window.onload = function() {
// Uh oh -- it's saying `$` is undefined! Something's missing from `index.html`...
console.log('yeppieee');
mainBoard(false);

}
