//Game Constants & Variables
let inputDir={x:0, y:0};
const foodSound=new Audio('/snake.eat.wav');
const gameOverSound=new Audio('/gameover.mp3');
const moveSound=new Audio('/snake.move.wav');
const musicSound=new Audio('/mixkit-game-level-completed-2059.wav');
let speed=5;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
food={x:6, y:7};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    console.log(ctime)
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();

}

function isCollide(snake){
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++){
        if (snake[i].x=== snake[0].x && snake[i].y === snake[0].y){
            return true; 
        }  
    }
    // if you bumb into wall
    if(snake[0].x >= 20 || snake[0].x<=0 || snake[0].y >= 20 || snake[0].y<=0){
            return true;
        }


    }


function gameEngine(){
    //Part1: Updtaing the snake array
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0, y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr= [{x:13,y:15}];
        musicSound.play();
        score=0;    
    }

    //If snake has eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y=== food.y && snakeArr[0].x=== food.x){
        foodSound.play();
       score +=1;
       if(score>hiScoreval){
        hiScoreval = score;
        localStorage.setItem("hiScore", JSON.stringify(hiScoreval))
        hiScoreBox.innerHTML = " HiScore:" + hiScoreval;

       }
       scoreBox.innerHTML = "Score:" + score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y})
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    // Moving the snake
    for (let i= snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1]= {...snakeArr[i]};

    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    

    //part2: Render the snake and food
    //Display the sanke
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    

    // // Display the food

    //     var wordList = ["Apple", "Banana", "Orange", "Grapes", "Watermelon"];

    //     function generateFoodWord() {
    //         // var wordList = ["Red", "job", "Sun", "Dog", "Mom"];
    
    //         var randomIndex = Math.floor(Math.random() * wordList.length);
            
    //          s=(toString(wordList[randomIndex])).charAt(1);
    //     return s
    //     }


        foodElement=document.createElement("div");
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        // food1Element.innerText=generateFoodWord();
        foodElement.classList.add('food')
        board.appendChild(foodElement);

}

     // Define the duration of the timer in seconds
const timerDuration = 120;
let currentTime = timerDuration;

// Get the HTML element where you want to display the timer
const timerDisplay = document.getElementById('timer');


// Start the timer
function updateTimerDisplay() {
  
    timerDisplay.textContent = "Time: " + currentTime + " seconds";
}

// Start the timer
function startTimer() {
  updateTimerDisplay(); // Display the initial time
  
  // Schedule the timer to update every second
  let timer = setInterval(() => {
    currentTime--;
    updateTimerDisplay(); // Update the timer display
    
    if (currentTime <= 0) {
      clearInterval(timer); 
      endTimer(); // Call the function when the timer ends
    
      alert("Time Over. Press OK too play again!")}
      score=0; // Stop the timer
    }, 1000);
}
// End the timer
function endTimer() {
    timerDisplay.textContent = "Time ended!";
    
    
  }

startTimer();
snakeArr= [{x:13,y:15}];
musicSound.play();

  


// // Get references to the controls buttons
// const upButton = document.getElementById('up-button');
// const downButton = document.getElementById('down-button');
// const leftButton = document.getElementById('left-button');
// const rightButton = document.getElementById('right-button');



//Main logic starts here
musicSound.play();
let hiScore = localStorage.getItem("hiScore");
if(hiScore === null){
    hiScoreval = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreval))

}
else{
    hiScoreval = JSON.parse(hiScore);
    hiScoreBox.innerHTML = " HiScore:" + hiScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir={x:0, y:1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x= 0;
            inputDir.y= -1;
           break;

        case "ArrowDown":
             console.log("ArrowDown")
             inputDir.x= 0;
             inputDir.y= 1;
             break;

        case "ArrowLeft":
             console.log("ArrowLeft")
             inputDir.x= -1;
             inputDir.y= 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        
        

        default:
            break;
    }

});
