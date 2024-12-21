import {Menu} from "./menu.js";
import {Player} from './player.js';
import {Map} from "./map.js";
import {getTankSize} from "./functions/getTanksSize.js";

export class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.currentState = 'menu';
        this.menu = new Menu(canvas, context);
        this.map = new Map(canvas);
        this.player1 = new Player(0, canvas.height - getTankSize(canvas), canvas,'/src/assets/player1_tank.png');
        this.player2 = new Player(canvas.width - getTankSize(canvas), 0, canvas, '/src/assets/player2_tank.png');

        this.players = [this.player1, this.player2];

        window.addEventListener('keydown', (e) => this.handleInput(e));

        this.keys = {}; // Objeto para almacenar el estado de las teclas

        // Agregar event listeners para keydown y keyup
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    start() {
        this.loop();
    }

    loop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.loop());
    }

    handleInput(e) {
        if (this.currentState === 'menu') {
            this.handleInputOnMenu(e);
        }

        if (this.currentState === 'playing') {
            this.handleInputOnPlaying(e);
        }
    }

    handleInputOnMenu(e) {
        if (e.key === 'Enter') {
            const result = this.menu.executeOption();
            if (result === 'start') {
                this.currentState = 'playing';
            } else if (result === 'quit') {
                this.currentState = 'quit';
            }
        } else {
            this.menu.handleInput(e);
        }
    }

    handleKeyDown(e) {
        if (this.currentState === 'playing') {
            this.keys[e.key] = true;

            if (e.key === 'Escape') {
                this.handleEscapeWhileGaming();
            }
        }
    }

    handleKeyUp(e) {
        if (this.currentState === 'playing') {
            this.keys[e.key] = false; // Marcar la tecla como no presionada

            // Disparo de jugadores
            if (e.key === '.') {
                this.player1.shoot();
            } else if (e.key === ' ') {
                this.player2.shoot();
            }
        }
    }

    handleInputOnPlaying(e) {
        if (e.key === 'Escape') {
            this.handleEscapeWhileGaming()
        }
    }

    handleEscapeWhileGaming() {
        this.currentState = 'menu';
        this.map = new Map(this.canvas);
        this.player1 = new Player(0, this.canvas.height - getTankSize(this.canvas), this.canvas,'/src/assets/player1_tank.png');
        this.player2 = new Player(this.canvas.width - getTankSize(this.canvas), 0, this.canvas,'/src/assets/player2_tank.png');
        this.players = [this.player1, this.player2];
    }

        update() {
            if (this.currentState === 'playing') {
                this.players.forEach(player => {
                    // Movimiento del jugador 1
                if (player === this.player1) {
                    let direction = null;
                    if (this.keys['ArrowRight']) {
                        direction = 'right';
                    } else if (this.keys['ArrowLeft'] && !this.keys['ArrowRight']) {
                        direction = 'left';
                    } else if (this.keys['ArrowDown'] && !this.keys['ArrowLeft'] && !this.keys['ArrowRight']) {
                        direction = 'down';
                    } else if (this.keys['ArrowUp'] && !this.keys['ArrowDown'] && !this.keys['ArrowRight'] && !this.keys['ArrowLeft']) {
                        direction = 'up';
                    }

                    if (direction) {
                        player.move(direction, this.map.blocks);
                    }
                }

                // Movimiento del jugador 2
                if (player === this.player2) {
                    let direction = null;
                    if (this.keys['d']) {
                        direction = 'right';
                    } else if (this.keys['a'] && !this.keys['d']) {
                        direction = 'left';
                    } else if (this.keys['s'] && !this.keys['a'] && !this.keys['d'] ) {
                        direction = 'down';
                    } else if (this.keys['w'] && !this.keys['s'] && !this.keys['d'] && !this.keys['a']) {
                        direction = 'up';
                    }

                    if (direction) {
                        player.move(direction, this.map.blocks);
                    }
                }

                    player.update();
                });
    
                this.checkWinCondition();
            }
        }

        checkWinCondition() {
            const playersAlive = this.players.filter(player => player.isAlive());
            if (playersAlive.length === 1) {
                this.currentState = 'win';
                this.winner = playersAlive[0] === this.player1 ? 'Player 1' : 'Player 2';
            }
        }

    render() {
        if (this.currentState === 'menu') {
            this.menu.render();
        } else if (this.currentState === 'playing') {
            this.renderGame();
        } else if (this.currentState === 'win') {
            this.renderWin();
        }else if (this.currentState === 'quit') {
            this.renderQuit();
        }
    }

            renderGame() {//Se crean los bloques que no son arbustos -> jugador -> arbustos, para que se pueda ocultar
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.context.fillStyle = '#454545';
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
                this.map.blocks.forEach(block => {
                    if (block.type !== 'bush') block.draw(this.context);
                });
        
                this.players.forEach(player => player.draw(this.context));
        
                this.map.blocks.forEach(block => {
                    if (block.type === 'bush') block.draw(this.context);
                });
        
                this.players.forEach(player => this.checkBulletCollisions(player));
            }
   
        checkBulletCollisions(player) {
            player.bullets.forEach((bullet, bIndex) => {
                // Verificar colisión con bloques del mapa
                for (let block of this.map.blocks) {
                    if (this.isColliding(bullet, block) && !block.bulletPass) {
                        if (block.destructible) block.takeDamage();
                        player.bullets.splice(bIndex, 1);
                        return; 
                    }
                }
        
                // Verificar colisión con otros jugadores
                this.players.forEach(opponent => {
                    if (opponent !== player && this.isColliding(bullet, opponent)) {
                        opponent.takeDamage(); // Ejecutar la función takeDamage
                        player.bullets.splice(bIndex, 1);
                        return; 
                    }
                });
            });
        }

    isColliding(a, b) {
        return (a.x < b.x + b.width && a.x + a.size > b.x && a.y < b.y + b.height && a.y + a.size > b.y);
    }
    renderWin() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = '30px Segoe UI';
        this.context.fillStyle = 'white';
        this.context.textAlign = 'center';
        this.context.fillText(`Ganó el jugador: ${this.winner}`, this.canvas.width / 2, this.canvas.height / 2);
    }

    renderQuit() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = '30px Segoe UI';
        this.context.fillStyle = 'white';
        this.context.textAlign = 'center';
        this.context.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2);
    }
}
