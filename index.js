const canvas = document.querySelector('canvas')

const ctx = canvas.getContext('2d') // gives 2d or 3d property to the element

ctx.fillStyle = 'burlywood';
let snakeCell = [[0,0]]
let square = 25
let bHeight = 500
let bWidth = 500
let direction = 'right'
let gameOver = false
let apple = generateApple()
var score = 0;

document.addEventListener('keydown' , function(e){
    if(e.key === 'ArrowRight'){
        direction = 'right'
        // console.log(direction)
    }
    else if(e.key === 'ArrowLeft'){
        direction = 'left'
        // console.log(direction)
    }
    else if(e.key === 'ArrowDown'){
        direction = 'down'
        // console.log(direction)
    }
    else{
        direction='up'
        // console.log(direction)
    }
    

})


function update(){ // IT WILL UPDATE STRUCTURE AND PASS IT TO DRAW
    headX = snakeCell[snakeCell.length-1][0]
    headY = snakeCell[snakeCell.length-1][1]



    let newX
    let newY

    if(direction=='right'){
        newX=headX +square
        newY = headY

        if(newX == bWidth){
            gameOver = true
        }
        
    }

    else if(direction==='left'){
        newX = headX-square
        newY = headY
        if(newX < 0){
            gameOver = true
        }

    }

    else if(direction === 'down'){
        newX = headX
        newY = headY + square

        if(newY >= bHeight){
            gameOver = true
        }
    }

    else{
        newX = headX
        newY = headY - square
        if(newY<0) {
            gameOver = true
        }
    }

    snakeCell.push([newX, newY])
    
    if(newX == apple[0] && newY == apple[1] ){
        apple = generateApple()
        score+=1;
    }

    else{
        snakeCell.shift()
    }
}

function draw(){ // IT WILL CRETE THE STRUCTURE

    if(gameOver === true){
        clearInterval(id)
        ctx.font='40px sans'
        ctx.fillText("GameOver" , 50, 100)
        return;
    }


    ctx.clearRect(0,0,bWidth ,bHeight)

    for(let cell of snakeCell){
        ctx.fillRect(cell[0],cell[1] , square , square)
    }

    

    // ctx.fillStyle('green')
    ctx.fillRect(apple[0], apple[1] , square , square);
    ctx.font='20px snas'
    ctx.fillText(`Score : ${score} `, 50,50)

}

function generateApple(){
    return[
        Math.floor(Math.random() * ((bWidth - square )/square))*square,
        Math.floor(Math.random() * ((bHeight - square )/square))*square
    ]
}

let id  = setInterval(function(){
    update()
    draw()

},150)
