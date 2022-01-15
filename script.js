const buttonColours = ['red', 'blue', 'green', 'yellow'];
let userClickedPattern = [];
let gamePattern = [];
var clickNum = -1
var roundNum = 1;
$(document).ready(() => {
    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            $('h1').text("Please Wait")
            location.reload()
        }
    }
    $(document).keydown(()=>{
        clickNum=-1;
        userClickedPattern = []
        chooseRandom();
        $('h1').text("Round "+roundNum+". Go!!")
        roundNum++
    })

    $('button').click((e) => {
        new Audio('./button.mp3').play()
        if(clickNum===gamePattern.length-2){
            new Audio('./success.mp3').play()
            $('h1').text('Nice job , press a key to advance!!')
        }
        userClickedPattern.push(e.target.className)
        clickNum++;
        if(!check()){
            $('h1').text("OOPS!! You lost, Please wait...")
            new Audio('./buzzer.mp3').play()
            setTimeout(()=>{
                location.reload()
            },3000)
        }
    })
})

function check(){
    return userClickedPattern[clickNum] === gamePattern[clickNum];
}

function  chooseRandom() {
    gamePattern.push(buttonColours[nextSequence()]);

    for (let i=0; i<gamePattern.length; i++) {
        task(i);
     }
       
     function task(i) {
       setTimeout(function() {
        $('.' + gamePattern[i]).fadeOut(200)
        $('.' + gamePattern[i]).fadeIn(200)
       }, 500 * i);
     }
}

function nextSequence() {
    var randomNum = Math.floor(Math.random() * 4);
    return randomNum;
}