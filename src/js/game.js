import {Menu} from "./menu.js";

export class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.currentState = 'menu';
        this.menu = new Menu(canvas, context);
    }

    start() {
        window.addEventListener('keydown', (e) => this.handleInput(e));
        this.loop();
    }

    loop() {
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

    handleInputOnPlaying(e) {
        if (e.key === 'Escape') {
            this.currentState = 'menu';
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
        this.context.font = '30px Segoe UI';
        this.context.fillStyle = 'white';
        this.context.textAlign = 'center';
        this.context.fillText('Game in Progress...', this.canvas.width / 2, this.canvas.height / 2);
    }

    renderQuit() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = '30px Segoe UI';
        this.context.fillStyle = 'white';
        this.context.textAlign = 'center';
        this.context.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2);
    }
}
