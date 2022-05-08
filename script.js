// Start button function
document.getElementById('startbutton').addEventListener('click', function() {
    const game = document.querySelector('#game');
    game.height = 900;
    game.width = 1300;
    let restartButton;
    let startTime, endTime;
    const ctx = game.getContext('2d');
    const keys = {};
    const ship = {
        x: 650,
        y: 800, 
        width: 30,
        height: 40,
        // Sprite animation frames
        frameX: 2,
        frameY: 1,
    };
    // ship = new Image()
    // ship.src = 'tractorImgSmoke.png'
    // Grabbing sprite img
    const rocketShip = new Image();
    rocketShip.src = 'tractorImgSmoke.png';

    // Drawing sprite image
    function drawShip(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }

    // Ship frame movement
    function handleShipFrame() {
        if (ship.frameY < 1) ship.frameY++
        else ship.frameY = 0;
    }
    // linking key movements to game movements
    document.addEventListener('keydown', function(evt) {
        if (evt.key === 'w') {
        keys['w'] = true;
        } else if (evt.key === 'a') {
        keys.a = true;
        } else if (evt.key === 's') {
        const theLetterS = 's';
        keys[theLetterS] = true;
        } else if (evt.key === 'd') {
        keys['d'] = true;
        }
    });

    document.addEventListener('keyup', function(evt) {
        if (evt.key === 'w') {
        keys['w'] = false;
        } else if (evt.key === 'a') {
        keys.a = false;
        } else if (evt.key === 's') {
        const theLetterS = 's';
        keys[theLetterS] = false;
        } else if (evt.key === 'd') {
        keys['d'] = false;
        }
    });

    // Movement of ship 
    function shipMovement () {
        if (keys.w) {
        if (ship.y - 5 > 0){
            ship.y -= 1.5
            ship.frameX = 2;
            }
        } 
        if (keys.a) {
        if (ship.x - 5 > 0){
            ship.x -= 1.5
            ship.frameX = 2;
            }
        } 
        if (keys.s) {
        if (ship.y + ship.height + 5 < game.height) {
            ship.y += 1.5
            ship.frameX = 2;
            }
        } 
        if (keys.d) {
        if (ship.x + ship.width + 5 < game.width) {
            ship.x += 1.5
            ship.frameX = 2;
            }
        }
    }

    // Astroid spawning variables
    let spawnLineY = 0;
    let spawnRate = 100;
    let spawnRateOfDescent = 1.5;
    let lastSpawn = -50;
    let astroids = [];
    startTime = Date.now();
    let color;
    let stop;

    animate();

    // Random astroid spawning
    function spawnRandomAstroid() {
    color = "grey"
    const astroid = {
        type: color,
        x: Math.random() * (game.width - 30) + 15,
        y: spawnLineY,
        r: 10
    }
    astroids.push(astroid);
    }

    // Animation of canvas
    function animate() {
        let time = Date.now();
        if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomAstroid();
        }
        stop = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, game.width, game.height);

    // Spawning astroids at the top of the canvas
        ctx.beginPath();
        ctx.moveTo(0, spawnLineY);
        ctx.lineTo(game.width, spawnLineY);
        ctx.stroke();
        
    // Itterating through astroids array 
        for (let i = 0; i < astroids.length; i++) {
        let astroid = astroids[i];

    // Spawning of astroids and moving them down the page
    astroid.y += spawnRateOfDescent;
        ctx.beginPath();
        ctx.arc(astroid.x, astroid.y, 12, 0, Math.PI * 2);
    
        const trashBall = new Image();
        trashBall.src = 'trashBall.png'
        ctx.drawImage(trashBall, 0, 0)

        const rocketShip = new Image();
        rocketShip.src = 'tractorImgSmoke.png';
        ctx.drawImage(rocketShip, 200, 200, 100, 100);
        
        // const testastroid = new Image()
        // testastroid.src = 'trashBall.png'
        // const pattern = ctx.createPattern (testastroid, 'repeat')

        ctx.closePath();
        ctx.fillStyle = astroid.type;
        ctx.fill();
        }
    // Itterating through astroids array for collision detection
    for (let i = 0; i < astroids.length; i++) {
        collisionDetection(astroids[i], ship)
        }
    // Rendering sprite onto the canvas
    drawShip(rocketShip, ship.width * ship.frameX, ship.height * ship.frameY, ship.width, ship.height, ship.x, ship.y, ship.width, ship.height);

    // ship movement / animation functions
    handleShipFrame();
    shipMovement();
    }

    // Collision detection math for ships and astriods
    function collisionDetection(astroid, ship) {
    let distX = Math.abs(astroid.x - ship.x - ship.width / 2);  
    let distY = Math.abs(astroid.y - ship.y - ship.height / 2);

    if (distX <= (ship.width / 1.1) && distY <= (ship.height / 2)) {
    
    // Game over conditions
    document.getElementById('game-over').innerText = 'Game Over';

    document.getElementById('game-over-button').innerText = 'Play Again';

    restartButton = document.getElementById('game-over-button');
    restartButton.addEventListener('click', gameRestart);
    end();
    cancelAnimationFrame(stop)

    document.getElementById('scoretext').innerText = 'Score';
        }
        
    // More collision detection math
    let dx = distX - ship.width / 2;
    let dy = distY - ship.height / 2;
    return (dx * dx + dy * dy <= (astroid.r * astroid.r));
    }

    // Restart button
    function gameRestart() {
    location.reload();
    }

    // Score keeping
    function end() {
    endTime = new Date();
    let timeDiff = endTime - startTime; 
    timeDiff /= 1000;
    let seconds = Math.round(timeDiff);

    // Displaying score
    document.getElementById('score').innerText = seconds;
    const finalScore = document.getElementById('score');

       
    }
});





