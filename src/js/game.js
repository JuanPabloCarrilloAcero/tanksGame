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
        this.player = new Player(0, canvas.height - getTankSize(canvas), canvas);
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

            if (e.key === ' ') { // Disparar al soltar la tecla
                this.player.shoot();
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
        this.player = new Player(0, this.canvas.height - getTankSize(this.canvas), this.canvas);
    }

    update() {
        if (this.currentState === 'playing') {
            // Manejar movimiento
            if (this.keys['ArrowUp']) {
                this.player.move('up', this.map.blocks);
            } else if (this.keys['ArrowDown']) {
                this.player.move('down', this.map.blocks);
            } else if (this.keys['ArrowLeft']) {
                this.player.move('left', this.map.blocks);
            } else if (this.keys['ArrowRight']) {
                this.player.move('right', this.map.blocks);
            }

            this.player.update(); // Actualizar estado del jugador (balas, etc.)
        }
    }

    render() {
        if (this.currentState === 'menu') {
            this.menu.render();
        } else if (this.currentState === 'playing') {
            this.renderGame();
        } else if (this.currentState === 'quit') {
            this.renderQuit();
        }
    }

        renderGame() { //Se crean los bloques que no son arbustos -> jugador -> arbustos, para que se pueda ocultar

            // Limpiar el canvas
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
            // Dibujar bloques que no son 'arbustos'
            this.map.blocks.forEach(block => {
                if (block.type !== 'bush') {
                    block.draw(this.context);
                }
            });
            this.player.draw(this.context);
        
            this.map.blocks.forEach(block => {
                if (block.type === 'bush') {
                    block.draw(this.context);
                }
            });
        
            this.checkBulletCollisions();
        }
        

    checkBulletCollisions() {
        this.player.bullets.forEach((bullet, bIndex) => {
            // Verificar colisiones con bloques del mapa
            for (let block of this.map.blocks) {
                if (this.isColliding(bullet, block) && !block.bulletPass) {
                    if (block.destructible) {
                        block.takeDamage();
                    }
                    // Eliminar la bala
                    this.player.bullets.splice(bIndex, 1);
                    break; // Dejar de verificar cuando una bala se ha eliminado
                }
            }
        });
    }

    isColliding(a, b) {
        return (a.x < b.x + b.width && a.x + a.size > b.x && a.y < b.y + b.height && a.y + a.size > b.y);
    }

    renderQuit() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = '30px Segoe UI';
        this.context.fillStyle = 'white';
        this.context.textAlign = 'center';
        this.context.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2);
    }
}
