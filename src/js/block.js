import {getBlockImage} from "./functions/getBlockImage.js";
import { playAudio } from "./functions/playAudio.js";

const imageArray = {
    brick: getBlockImage('brick'),
    steel: getBlockImage('steel'),
    bush: getBlockImage('bush'),
    water: getBlockImage('water'),
    empty: getBlockImage('empty')
}

export class Block {
    constructor(x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type; // 'brick', 'steel', 'bush', 'water', 'empty'
        this.destructible = this.isDestructible();
        this.passable = this.isPassable();
        this.bulletPass = this.isBulletPassable();
        this.sprites_sheet = new Image();
        this.sprites_sheet.src = `/src/assets/sprites_sheet.png`;
        this.sprites_sheet_loaded = false;
        this.sprites_sheet.onload = () => {
            this.sprites_sheet_loaded = true;
        }
        
        // Animación
        this.frameIndex = 0; // Frame actual para bloques animados
        this.animationSpeed = 40; // Velocidad de animación (menor = más rápido)
        this.frameCounter = 0; // Contador para controlar la velocidad

    }

    draw(context) {       
        if (this.sprites_sheet_loaded) {            
            let sprite;

            // Selecciona el sprite correspondiente al tipo
            if (this.type === 'water') {
                // Alterna entre los frames del agua
                sprite = imageArray[this.type][this.frameIndex];
                this.animate();
            } else {
                sprite = imageArray[this.type];
            }

            // Dibujar el sprite en el canvas
            context.drawImage(
                this.sprites_sheet, 
                sprite.x, sprite.y, sprite.width, sprite.height, // Coordenadas del sprite en el sheet
                this.x, this.y, this.width, this.height // Coordenadas en el canvas
            );
        } else {
            // Placeholder
            context.fillStyle = 'black';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    animate() {
        // Incrementa el contador de frames
        this.frameCounter++;
        if (this.frameCounter >= this.animationSpeed) {
            this.frameCounter = 0; // Reinicia el contador
            this.frameIndex = (this.frameIndex + 1) % imageArray[this.type].length; // Alterna entre 0 y 1
        }
    }

    // If destructible
    takeDamage() {
        if (this.destructible) {
            playAudio('brick_hit'); // Reproducir sonido de ladrillo golpeado
            //Agregar animación explosión
            this.type = 'empty';
            this.destructible = this.isDestructible();
            this.passable = this.isPassable();
            this.bulletPass = this.isBulletPassable();
        }
    }

    isDestructible() {
        return this.type === 'brick';
    }

    isPassable() {
        return !(this.type === 'steel' || this.type === 'brick' || this.type === 'water');
    }

    isBulletPassable() {
        return (this.type === 'bush' || this.type === 'water' || this.type === 'empty');
    }
}