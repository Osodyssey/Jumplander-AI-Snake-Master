const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const grid = 20;
let count = 0;
let snake = { x: 160, y: 160, dx: grid, dy: 0, cells: [], maxCells: 4 };
let food = { x: 320, y: 320 };
let score = 0;

function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min)) + min; }

document.addEventListener('keydown', e => {
    if(e.code === 'ArrowLeft' && snake.dx === 0) { snake.dx = -grid; snake.dy = 0; }
    if(e.code === 'ArrowRight' && snake.dx === 0) { snake.dx = grid; snake.dy = 0; }
    if(e.code === 'ArrowUp' && snake.dy === 0) { snake.dx = 0; snake.dy = -grid; }
    if(e.code === 'ArrowDown' && snake.dy === 0) { snake.dx = 0; snake.dy = grid; }
});

function loop() {
    requestAnimationFrame(loop);

    if(++count < 4) return;
    count = 0;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    snake.cells.unshift({x: snake.x, y: snake.y});
    if(snake.cells.length > snake.maxCells) snake.cells.pop();

    ctx.fillStyle = '#FF5252';
    ctx.fillRect(food.x, food.y, grid-1, grid-1);

    ctx.fillStyle = '#00C853';
    snake.cells.forEach((cell, index) => {
        ctx.fillRect(cell.x, cell.y, grid-1, grid-1);

        if(cell.x === food.x && cell.y === food.y) {
            snake.maxCells++;
            score++;
            food.x = getRandomInt(0, canvas.width/grid) * grid;
            food.y = getRandomInt(0, canvas.height/grid) * grid;
        }

        for(let i = index+1; i < snake.cells.length; i++) {
            if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                alert('Game Over! Score: '+score);
                document.location.reload();
            }
        }
    });

    if(snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
        alert('Game Over! Score: '+score);
        document.location.reload();
    }

    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

requestAnimationFrame(loop);
