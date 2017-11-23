// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // Array of different speeds for the enemy
    this.enemySpeed = [2, 2.5, 3, 3.5, 4];

    // Array of defferent X and Y coordinates for the enemy
    this.startPlayingX = [-303, -202, -101];
    this.startPlayingY = [230, 147, 64];

    // X and Y coordinate for enemy object
    this.x = this.getNewCoordinate()[0];
    this.y = this.getNewCoordinate()[1];

    // Set movement speed for enemy object
    this.movementSpeed = this.getNewSpeed();

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
    this.x += 101 * this.movementSpeed * dt;

    // Call a function to loop enemy object 
    this.loopEnemy();    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Loop enemy object
Enemy.prototype.loopEnemy = function() {
    // If enemy crossed the map it begins from any of startPlayingY array value
    if (this.x >= 505 && this.x <= 606) {
        this.reset();
    }

    //Call a function to check the collision of the enemy object with the player object
    this.checkCollision();
}

// Check collision between enemy object and player object
Enemy.prototype.checkCollision = function() {
    var playerCoordinateX = player.getPlayerCoordinate().x;
    var playerCoordinateY = player.getPlayerCoordinate().y;
    if (this.y === playerCoordinateY && this.x + 50.5 >= playerCoordinateX && this.x - 50.5 <= playerCoordinateX) {
        player.reset();
    }
}

// Return a random speed based of enemySpeed array values 
Enemy.prototype.getNewSpeed = function() {
    return this.enemySpeed[Math.floor(Math.random() * this.enemySpeed.length)];
    
};

// Return an array with a random X and Y coordinate based of startPlayingX and startPlayingY values
Enemy.prototype.getNewCoordinate = function() {
    var coordinateX = this.startPlayingX[Math.floor(Math.random() * this.startPlayingX.length)];
    var coordinateY = this.startPlayingY[Math.floor(Math.random() * this.startPlayingY.length)];
    return [coordinateX, coordinateY];
};

// Reset the enemy object if it crossed the map this function called within the loopEnemy function
Enemy.prototype.reset = function() {
    this.x = this.getNewCoordinate()[0];
    this.y = this.getNewCoordinate()[1];
    this.movementSpeed = this.getNewSpeed();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class 
var Player = function() {
    this.startPlayingX = [0, 101, 202, 303, 404];
    this.startPlayingY = [396, 313];
    this.x = this.getNewCoordinate()[0];
    this.y = this.getNewCoordinate()[1];
    this.sprite = 'images/char-boy.png';
};

// Share Enemy prototype functions with Player class 
Player.prototype = Object.create(Enemy.prototype);
// Player.prototype.constructor = Player;

Player.prototype.update = function() {
    var playerX = this.x;
    var playerY = this.y;

    // If the player object reached the water reset
    if (this.y <= -10) {
        this.reset();
    }

    collectiable.checkCollect();
};

// Return object with X and Y of the enemy object this function called withing the theCollision function
Player.prototype.getPlayerCoordinate = function() {
    return {x:this.x, y:this.y};
}

//Resets if the player collision or reached the water
Player.prototype.reset = function() {
    this.x = this.getNewCoordinate()[0];
    this.y = this.getNewCoordinate()[1];
}

// Player controller
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':            
            this.y -= 83; break;                        
        case 'down':
            if (this.y !== 396) {                
                this.y += 83;
            }
            break;
        case 'right':
            if (this.x !== 404) {
                this.x += 101;
            }
            break;
        case 'left':
            if (this.x !== 0) {                
                this.x -= 101;
            }
    };

};

// Additional
var Collectible = function() {
    this.startPlayingX = [202, 303, 404];
    this.startPlayingY = [147, 64];
    this.x = this.getNewCoordinate()[0];
    this.y = this.getNewCoordinate()[1];
    this.sprite = 'images/Key.png';
}

Collectible.prototype = Object.create(Player.prototype);


Collectible.prototype.checkCollect = function() {
    if (this.x === player.x && this.y === player.y) {
        // I can't find out how to remove the object itself but I did remove the properties X and Y of the object instead
        delete this.x, this.y;
        // I should impelement additional stuff but I'm gonna leave it as it's
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player();
var collectiable = new Collectible();

var numbersOfEnemies = 3;
for (var i = 0; i < numbersOfEnemies; i++) {
    allEnemies.push(new Enemy());
};

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
