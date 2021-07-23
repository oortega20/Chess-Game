var timerCanvas = document.getElementById("timer");
var tctx = timerCanvas.getContext("2d");

// timer constructor requires the amount of starting time and the current turn
class Timer {
    constructor(startingTime) {
        this.wMin = startingTime;
        this.wSec = 0;
        this.wMsec = 0;
        this.bMin = startingTime;
        this.bSec = 0;
        this.bMsec = 0;
        this.turn = "white";
    }
}

// starts the countdown
function startTimer(){
    var counter = setInterval(countdown, 10);
    var displayB = setInterval(displayBigTimer, 10);
    var displayT = setInterval(displayTinyTimer, 10);

    // displays the time in minutes and seconds
    function displayBigTimer(){
//        clears the timer
        var clearTimer = setTimeout(tctx.clearRect (255, 70, 135, 300), 5);

        if (timer.wMin == 0 & timer.wSec == 0 & timer.wMsec == 0 ||
            timer.bMin == 0 & timer.bSec == 0 & timer.bMsec == 0) {
            clearTimeout(clearTimer);
            tctx.font = "40px monospace";
            if (timer.wMin == 0 & timer.wSec == 0 & timer.wMsec == 0){
                tctx.fillStyle = "gray";
                tctx.fillText('You lose.', 25, 100);

                tctx.fillStyle = "black";
                tctx.fillText('You Win!', 25, 350);
            } else {
                tctx.fillStyle = "gray";
                tctx.fillText('You Win!', 25, 100);

                tctx.fillStyle = "black";
                tctx.fillText('You lose.', 25, 350);
            }
            clearInterval(displayB);
        }

        tctx.font = "40px monospace";
        tctx.fillStyle = "gray";

        if(timer.wSec < 10){
            tctx.fillText(timer.wMin + ':' + '0' + timer.wSec, 295, 100);
        } else {
            tctx.fillText (timer.wMin + ':' + timer.wSec , 295, 100);
        }

        tctx.fillStyle = "black";
        if(timer.bSec < 10) {
            tctx.fillText(timer.bMin + ':' + '0' + timer.bSec, 295, 350);
        } else {
            tctx.fillText(timer.bMin + ':' + timer.bSec, 295, 350);
        }
    }

    // displays the milliseconds
    function displayTinyTimer() {

        var clearTimer = setTimeout(tctx.clearRect(390, 70, 50, 300), 5);
        tctx.font = '14px monospace';
        if (timer.wMin == 0 & timer.wSec < 20) {
            tctx.fillStyle = 'grey';
            if (timer.wMsec < 10) {
                tctx.fillText('0' + timer.wMsec, 390, 100);
            } else {
                tctx.fillText(timer.wMsec, 390, 100);
            }
        }
        if (timer.bMin == 0 & timer.bSec < 20) {
            tctx.fillStyle = 'black';
            if (timer.bMsec < 10) {
                tctx.fillText('0' + timer.bMsec, 390, 350);
            } else {
                tctx.fillText(timer.bMsec, 390, 350);
            }
        }

    }

    // logic for the timer
    function countdown(){
        if (timer.wMin == 0 & timer.wSec == 0 & timer.wMsec == 0 ||
            timer.bMin == 0 & timer.bSec == 0 & timer.bMsec == 0) {
            clearInterval(counter);
        } else {
//            console.log(timer.wMin + ':' + timer.wSec + ':' + timer.wMsec, 'white',
//                        timer.bMin + ':' + timer.bSec + ':' + timer.bMsec, 'black');

            if (timer.turn === 'white'){
                if (timer.wMin != 0 & timer.wSec == 0 & timer.wMsec == 0) {
                    timer.wMin -= 1;
                    timer.wSec += 59;
                    timer.wMsec += 99;
                } else if (timer.wMsec == 0) {
                    timer.wSec -= 1;
                    timer.wMsec += 99;
                } else {
                    timer.wMsec -= 1;
                }
            } else {
                if (timer.bMin != 0 & timer.bSec == 0 & timer.bMsec == 0) {
                    timer.bMin -= 1;
                    timer.bSec += 59;
                    timer.bMsec += 99;
                } else if (timer.bMsec == 0) {
                    timer.bSec -= 1;
                    timer.bMsec += 99;
                } else {
                    timer.bMsec -= 1;
                }

            }

        }
    }
}


// creates the different timers
function oneMinGame(){
    timer = new Timer(1);
    return timer
}

function fiveMinGame(){
    timer = new Timer(5);
    return timer
}

function tenMinGame(){
    timer = new Timer(5);
    return timer
}

function thirtyMinGame(){
    timer = new Timer(30);
    return timer
}

function untimed(){
    timer = new Timer(null);
    return timer;
}



