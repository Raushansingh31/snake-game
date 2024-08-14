let inputDir = {x:0 , y:0}
const moveSound=new Audio('move.mp3');
const gameOverSound=new Audio('gameover.mp3');
const foodSound= new Audio('food.mp3');
const musicSound= new Audio('music.mp3');
let speed=10;
let score=0;
let lastPaintTime=0;
let snakeArr =[
    {x:13,y:15}
]
let food ={
    x:6,
    y:7
}
const board=document.querySelector('.board');
console.log("hello i am here")
let highscor=document.querySelector('#highscore');
let hiscore=0;
let liscoreval=0;





function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}


function isCollide(srr){
    for (let i = 1; i < srr.length; i++) {
        if(srr[i].x === srr[0].x && srr[i].y === srr[0].y){
            return true;
        } 
    }
    if(srr[0].x >=18 || srr[0].x <=0 ||  srr[0].y >=18 || srr[0].y<=0 ){
        return true;
    }
}
function gameEngine(){

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={ x:0,y:0};
        alert("Game over. Press Any Key To continue");
        snakeArr=[
            {x:13,y:15}
        ];
        musicSound.play();
        score=0;
        currscore.innerHTML= "Score : " + score;
    }
    // if food is eaten
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        score+=1;
        currscore.innerHTML= "Score : " + score;
        if(score>hiscore){
            hiscore=score;
            highscor.innerHTML= "High Score : "+ hiscore;
        }
        if(score>liscoreval){
            liscoreval=score;
            localStorage.setItem("liscore",JSON.stringify(liscoreval))
            lifetimeHighscore.innerHTML="Lifetime <br> HighScore : " + liscoreval;
        }
        snakeArr.unshift({x: snakeArr[0].x +inputDir.x, y: snakeArr[0].y +inputDir.y });
        let a=2;
        let b=16;
        food ={
            x: Math.round(a+(b-a)* Math.random()),
            y: Math.round(a+(b-a)* Math.random())
        }
    }

    // moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;


    board.innerHTML="";

    snakeArr.forEach((e,index)=>{
        snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
        console.log("hello i here")
    });

        foodElement= document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}


//localStorage.removeItem("liscore");
let liscore=localStorage.getItem("liscore");

if(liscore === null){
    liscoreva=0;
    localStorage.setItem("liscore", JSON.stringify(liscoreva));
}else{
    liscoreval=JSON.parse(liscore);
    lifetimeHighscore.innerHTML="Lifetime <br> HighScore : " + liscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
        inputDir ={x:0, y:1}
        moveSound.play();
        switch(e.key){
            case 'ArrowUp' : 
                inputDir.x= 0;
                inputDir.y= -1;
                break;
            case 'ArrowDown' : 
                inputDir.x= 0;
                inputDir.y= 1;
                break;
            case 'ArrowLeft' : 
                inputDir.x= -1;
                inputDir.y= 0;
                break;
            case 'ArrowRight' : 
                inputDir.x= 1;
                inputDir.y= 0;
                break;
            default: break;
        }
})