// Enemies our player must avoid
var Enemy = function(x, y) {
    // Setting the initial enemy location
    this.x = x;
    this.y = y;
    // Setting the enemy speed
    this.speed = Math.floor(200 + (Math.random() * 300));
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Updating the Enemy location
    this.x = this.x + (this.speed * dt);
    if (this.x > 550) {
        this.x = -100;
        this.speed = Math.floor(200 + (Math.random() * 300));
        if (this.y > 220) {
            this.y = 60;
        }
    }
    // Handling collision with the Player
    if (player.y >= this.y - 10 && player.y <= this.y + 10) {
        if (player.x >= this.x - 10 && player.x <= this.x + 10) {
            document.getElementById("gameStatus").innerHTML = "Try Again!";
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Pause enemy
Enemy.prototype.pause = function() {
    this.x = -10;
    this.y = -10;
    this.speed = 0;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-pink-girl.png';
};

// Arrow keys to move the player
Player.prototype.update = function() {
    // update
    if (this.keypress === 'left') {
        this.x -= 101;
        // keep player move inside the canvas
        if (this.x <= 0) {
            this.x = 0;
        }
    }
    if (this.keypress === 'up') {
        this.y -= 85;
    }
    if (this.keypress === 'right') {
        this.x += 101;
        // keep player move inside the canvas
        if (this.x >= 400) {
            this.x = 400;
        }
    }
    if (this.keypress === 'down') {
        this.y += 85;
        // keep player move inside the canvas
        if (this.y >= 400) {
            this.y = 400;
        }
    }
    this.keypress = null;
    if (this.y < 60) {
        document.getElementById("gameStatus").innerHTML = "You Win!";
        document.getElementById("gamePlay").innerHTML = '<a href="javascript:history.go(0)">Play Again ↩ </a>';
        a.pause();
        b.pause();
        c.pause();
        this.reset();
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handleinput
Player.prototype.handleInput = function(key) {
    this.keypress = key;
};

// Reset player position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Now instantiate Enemy objects.
var a = new Enemy(0, 60);
var b = new Enemy(0, 140);
var c = new Enemy(0, 220);

// Place all enemy objects in an array called allEnemies
var allEnemies = [a,b,c];

// Place the player object in a variable called player
var player = new Player();

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
