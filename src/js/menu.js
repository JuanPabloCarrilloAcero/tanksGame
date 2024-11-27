export class Menu {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.menuOptions = ['Start Game', 'Quit'];
        this.selectedOption = 0;
    }

    handleInput(e) {
        if (e.key === 'ArrowUp') {
            this.selectedOption = (this.selectedOption - 1 + this.menuOptions.length) % this.menuOptions.length;
        } else if (e.key === 'ArrowDown') {
            this.selectedOption = (this.selectedOption + 1) % this.menuOptions.length;
        }
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.font = '30px Segoe UI';
        this.context.fillStyle = 'white';
        this.context.textAlign = 'center';
        this.context.fillText('Main Menu', this.canvas.width / 2, 100);

        this.menuOptions.forEach((option, index) => {
            this.context.fillStyle = this.selectedOption === index ? 'yellow' : 'white';
            this.context.fillText(option, this.canvas.width / 2, 200 + index * 50);
        });
    }

    executeOption() {
        if (this.menuOptions[this.selectedOption] === 'Start Game') {
            return 'start';
        } else if (this.menuOptions[this.selectedOption] === 'Quit') {
            return 'quit';
        }
        return null;
    }
}
