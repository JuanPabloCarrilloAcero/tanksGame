export class Menu {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.menuOptions = ['Start Game', 'Quit'];
        this.selectedOption = 0;
        this.mainMenuImage = new Image();
        this.mainMenuImage.src = '/src/assets/main_menu_logo.PNG';
        this.mainMenuImage.onload = () => {
            this.mainMenuImageLoaded = true;
        };

        // Cargar la imagen del tanque
        this.tankImage = new Image();
        this.tankImage.src = '/src/assets/player1_tank.png'; 
        this.tankImageLoaded = false;

        this.tankImage.onload = () => {
            this.tankImageLoaded = true;
        };
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
        
        if(this.mainMenuImageLoaded){
            this.context.drawImage(this.mainMenuImage,this.canvas.width / 2 - 255, 100, 530, 300);
        }

        this.context.font = '30px ArcadeClassic';
        this.context.fillStyle = 'white';
        this.context.textAlign = 'center';        

        this.menuOptions.forEach((option, index) => {
            this.context.fillStyle = this.selectedOption === index ? 'yellow' : 'white';
            this.context.fillText(option, this.canvas.width / 2, 520 + index * 50);

            if (this.tankImageLoaded && this.selectedOption === index) {
                const xPosition = this.canvas.width / 2 - 130; // Posición horizontal
                const yPosition = 495 + index * 50; // Posición vertical
                const tankWidth = 30;
                const tankHeight = 30;

                // Guardar el estado actual del contexto
                this.context.save();

                // Trasladar el contexto al centro de la imagen
                this.context.translate(xPosition + tankWidth / 2, yPosition + tankHeight / 2);

                // Rotar 90 grados (en radianes: 90° = π/2)
                this.context.rotate(Math.PI / 2);

                // Dibujar la imagen del tanque con el contexto rotado
                this.context.drawImage(this.tankImage, -tankWidth / 2, -tankHeight / 2, tankWidth, tankHeight);

                // Restaurar el contexto a su estado original
                this.context.restore();
            }

        });
        this.context.font = '15px "Press Start 2P"';
        this.context.fillStyle = 'white';
        this.context.fillText('© RCSH - C.V. 2024', this.canvas.width / 2, 750);
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
