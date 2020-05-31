const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//устанавливаем картинку на фон
const ground = new Image();
ground.src = "img/ground.png"; //путь к картинке

//устанавливаем картинку еды
const foodImg = new Image();
foodImg.src = "img/food.png"; //путь к картинке

// переменнака ширины квардатика
let box = 32;
 //переменная счет
let score = 0;
//создаем еду
let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box, //появление еды в случайном месте и округляем
  y: Math.floor((Math.random() * 15 + 3)) * box,
};
//создаем змейку
let snake = [];
snake[0] = {
  x: 9 * box, //отображем змейку по центру
  y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

//управление клавишами
function direction(event) {
  if(event.keyCode == 37 && dir != "right")
    dir = "left";
  else if(event.keyCode == 38 && dir != "down")
    dir = "up";
  else if(event.keyCode == 39 && dir != "left")
    dir = "right";
  else if(event.keyCode == 40 && dir != "up")
    dir = "down";
}


// если  змейка сьест хвост то game over
function eatTail(head, arr) {
  for(let i = 0; i < arr.length; i++) {
    if(head.x == arr[i].x && head.y == arr[i].y)
      clearInterval(game);

  }
}

//функция рисования изображений
function drawGame() {
  ctx.drawImage(ground, 0, 0); //кардинаты по  x и y

  ctx.drawImage(foodImg, food.x, food.y);

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "#EE603D" : "#FDBBB2"; //цвет змейки
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
//рисуем score
  ctx.fillStyle = "#DCC2C1";
  ctx.font = "45px Arial";
  ctx.fillText(score, box * 3.7, box * 1.7);

//переменные с кординатами змейки
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //змейка ест еду

  if(snakeX == food.x && snakeY == food.y) {
    score++; //увеличиваем  score на единицу
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box,
    };
  } else {
    snake.pop();//удаляем последний элемент
  }

//если змейка выходит за пределы поля то game over
  if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box ){
      clearInterval(game);
      alert('Game over');
  }

//создаем проверку и передвигаем змейку по параметрам на клавиатуре
  if(dir == "left") snakeX -= box;
  if(dir == "right") snakeX += box;
  if(dir == "up") snakeY -= box;
  if(dir == "down") snakeY += box;
//добавляем голову
  let newHead = {
    x: snakeX,
    y: snakeY
  };


eatTail(newHead, snake);

  snake.unshift(newHead);
}

// функцция которая вызывает функцию постоянно
let game = setInterval(drawGame, 100);






//
