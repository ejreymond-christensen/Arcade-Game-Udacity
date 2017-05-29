// Enemies our player must avoid
var Enemy = function(a,b) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = a;
    this.y = b;
    this.width = 100;
    this.height = 67;
    // e:this randomizes the speed.
    this.speed = (Math.random()*2)+2;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.checkCollisions();
    this.enemy = (this.x+= this.speed)*dt;

      // e: This function makes the bugs loop, starting off screen
      if (this.x > 505){
        this.x = -10;
        // e: This function randomizes bugs on y-axis, but makes
        // sure they stay with only 4 quardinates or squares
        this.y = this.y + 83;
          if (this.y > 400){
            this.y = (Math.floor(Math.random()*(4-1))+1)*83;
          }
      }
};

function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    drawBox(this.x, this.y + 70, 100, 67, "yellow")
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (a,b,c,d) {
  this.sprite = 'images/char-boy.png';
  this.x = a;
  this.y = b;
  this.width = 100;
  this.height = 67;
  this.lives = c;
  this.score = d;
};

Player.prototype.update = function(dt) {
    this.player = (this.x)*dt;
    //this.checkCollisions();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //Adds Score Counter
    ctx.strokeStyle = "black";
    ctx.strokeText('Score: ' + this.score, 5, 70);
    ctx.strokeText('Lives: ' + this.lives, 5, 90);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText('Score: ' + this.score, 5, 70);
    ctx.fillText('Lives: ' + this.lives, 5, 90);

    drawBox(this.x, this.y +70, 100, 67, "yellow");

};

Player.prototype.handleInput = function(move) {
  switch (move) {
    case 'left':
      if (this.x <= 100){
        this.x = this.x;
      }
      else {
        this.x -= 101;
      }
      break;
    case 'up':
      if (this.y <= 0){
        this.goal();
        // add points!
      }
      else {
        this.y -= 83;
      }
      break;
    case 'right':
      if (this.x >= 400){
        this.x = this.x;
      }
      else {
        this.x += 101;
      }
      break;
    case 'down':
      if (this.y >= 415){
        this.y = this.y;
      }
      else {
        this.y += 83;
      }
      break;
  };
};
Enemy.prototype.checkCollisions = function() {
        //player with enemy
        allEnemies.forEach(function(enemy) {
            if (player.x < (enemy.x + enemy.width) && (player.x + player.width) > enemy.x && (player.y + 70) < ((enemy.y +70) + enemy.height) && ((player.y + 70) + player.height) > (enemy.y +70)) {
                player.collision();
            }
        });
      };
// collision method.
/*
Player.prototype.checkCollisions = function (){
  for (var i = 0; i < allEnemies.length; i++){
    if (this.x < allEnemies[i].x + allEnemies[i].width &&
        this.x + this.width > allEnemies[i].x &&
        this.y < allEnemies[i].y + allEnemies[i].height &&
        this.y + this.height > allEnemies[i].y){
          player.collision();
    }
    else
      return false;
  }
};
*/
// Reset and score method.
Player.prototype.goal = function () {
  this.x = 202;
  this.y = 415;
  this.score += 1;
};

Player.prototype.collision = function () {
  if (this.lives >1) {
    this.lives -= 1;
    this.x = 202;
    this.y = 415;
  }
  else {
    this.lives = 0;
    alert("GAME OVER");
    document.location.init();
  }

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyOne = new Enemy(-10,83);
var enemyTwo = new Enemy(-10,166);
var enemyThree = new Enemy(-10,249);
var enemyFour = new Enemy(-10,332);
var enemyFive = new Enemy(-10,83);

var player = new Player(202,415,5,0);


var allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour, enemyFive];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
