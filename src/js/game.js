import {Menu} from "./menu.js";
import { Player } from './player.js';

export class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.currentState = 'menu';
        this.menu = new Menu(canvas, context);
        this.player = new Player(canvas.width / 2 - 20, canvas.height / 2 - 20, canvas);
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
                this.currentState = 'menu';
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
            this.currentState = 'menu';
        }
      }
      

      update() {
        if (this.currentState === 'playing') {
            // Manejar movimiento
            if (this.keys['ArrowUp']) {
                this.player.move('up');
            } else if (this.keys['ArrowDown']) {
                this.player.move('down');
            } else if (this.keys['ArrowLeft']) {
                this.player.move('left');
            } else if (this.keys['ArrowRight']) {
                this.player.move('right');
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

    renderGame() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Actualizar y dibujar el jugador
        this.player.update();
        this.player.draw(this.context);
    }

    renderQuit() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = '30px Segoe UI';
        this.context.fillStyle = 'white';
        this.context.textAlign = 'center';
        this.context.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2);
    }
}
