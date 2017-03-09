var simonBoard = function() {
var play = true;
$('main').children().remove();
var simonB = `<section class="container">
                <div class='box yellow ' data-tile='1' id='yellow'></div>
                <div class='box red' data-tile='2' id='red'></div>
                <div class='box blue' data-tile='3' id='blue'></div>
                <div class='box green' data-tile='4' id='green'></div>
                <div class='center'>
                    <h1>SIMON</h1>
                </div>
            </section>
            <section class="board">
                <div class="score">
                    <div id='quit' class ="quit" onclick = "mainBoard(${play})">quit</div>
                </div>
                <div class="score">
                    <div class='level'>Score :</div>
                    <div class="highscore"> </div>
                </div>`;
                $('main').append(simonB);
                Simon.startGame();

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
        <h4>FOLLOW THE LIGHTS AND PATTERNS AS LONG AS YOU CAN.. <br>IF YOU MISS A PATTERN YOU WILL LOSE A CHANCE</h4>
        <h2 id="play" onclick = "simonBoard()"> Play</h2>
        </div>`;
    $('main').append(intro);
}

var Simon = {
        sequence: [],
        copy: [],
        round: 0,
        active: true,
        mode: 'normal',
        score: 0,

        startGame: function() {
            this.sequence = [];
            this.copy = [];
            this.round = 0;
            this.active = true;
            this.newRound();
        },
        newRound: function() {
            ++this.round;
            if(this.round > 1) {
                this.sequence=[];
            }
            if(this.score < this.round){
                this.score = this.round - 1;
                $('.highscore').html('High Score : ' + this.score);
            }
            else {
                $('.highscore').html('High Score : ' + this.score);
            }
            $('.level').html('Score : ' + (this.round - 1) );
            for(i = 0; i< this.round; i++){
            this.sequence.push(this.randomNumber());

            this.copy = this.sequence.slice(0);
        }
            this.animate(this.sequence);
        },

        checkSeq: function(e) {
            var desiredResponse = this.copy.shift();
            var actualResponse = $(e.target).data('tile');
            this.active = (desiredResponse === actualResponse);
            if (this.copy.length === 0 && this.active) {
                this.deactivate();

                this.newRound();

            } else if (!this.active) { // user lost
                this.deactivate();
                this.endGame();
            }
        },

        endGame: function() {
            this.round = 0;
            // $('.level').html('Level: ' + this.round);
            // $('main').children().hide();
            this.startGame();
        },

        changeMode: function(e) {
            this.mode = e.target.value;
        },
        activate: function() {
            var that = this;
            $('.container')
                .on('click', '[data-tile]', function(e) {
                    that.checkSeq(e);
                })

                .on('mousedown', '[data-tile]', function(){
                    var col = $(this).attr('data-tile');
                    that.lightUp(col);
                    // $(this).addClass('light');
                    that.playSound($(this).data('tile'));
                })
        },

        deactivate: function() {

                $('.container')
                    .off('click', '[data-tile]')
                    .off('mousedown', '[data-tile]')
                    .off('mouseup', '[data-tile]');
                $('[data-tile]').removeClass('hoverable');
        },

        animate: function(sequence) {
            var i = 0;
            var that = this;
            var interval = setInterval(function() {
                that.playSound(sequence[i]);
                that.lightUp(sequence[i]);

                i++;
                if (i >= sequence.length) {
                    clearInterval(interval);
                    that.activate();
                }
            }, 1000);
        },

        lightUp: function(tile) {
            if (this.mode !== 'sound-only') {
                var $tile = $('[data-tile=' + tile + ']').addClass('light');
                window.setTimeout(function() {
                    $tile.removeClass('light');
                }, 1000);
            }

        },
        playSound: function(num) {
            if (this.mode !== 'light-only') {
            var link;
            switch (num) {
                case 1:
                    link = 'audio/simonSound1.mp3';
                    break;
                case 2:
                    link = 'audio/simonSound2.mp3';
                    break;
                case 3:
                    link = 'audio/simonSound3.mp3';
                    break;
                case 4:
                    link = 'audio/simonSound4.mp3';
                    break;
            }
    var audio = new Audio(link);
        audio.play();
}
        },

        randomNumber: function() {
            return Math.floor((Math.random()*4)+1);
        }
    };


window.onload = function() {
// Uh oh -- it's saying `$` is undefined! Something's missing from `index.html`...
mainBoard(false);

}
