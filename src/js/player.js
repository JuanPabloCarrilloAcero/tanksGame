import {getTankSize} from "./functions/getTanksSize.js";
import { playAudio } from './functions/playAudio.js';

export class Player {
    constructor(x, y, canvas, imagePath) {
        this.x = x; // Posición X del tanque
        this.y = y; // Posición Y del tanque
        this.width = getTankSize(canvas); // Ancho del tanque
        this.height = getTankSize(canvas); // Alto del tanque
        this.speed = 3; // Velocidad de movimiento
        this.direction = 'up'; // Dirección inicial
        this.health = 30;
        this.alive = true;
        this.canvas = canvas;
        this.bullets = []; // Arreglo para las balas
        this.cooldown = 0; // Tiempo de recarga entre disparos

        // Imagen del tanque
        this.image = new Image();
        this.image.src = imagePath;

        this.image.onload = () => {
            this.imageLoaded = true;
        };
        this.imageLoaded = false;
    }

    update() {
        this.reduceCooldown();
        this.updateBullets();
    }

    reduceCooldown() {
        if (this.cooldown > 0) {
            this.cooldown--;
        }
    }

    updateBullets() {
        this.bullets.forEach((bullet, index) => {
            bullet.update();
            if (bullet.x < 0 || bullet.x > this.canvas.width || bullet.y < 0 || bullet.y > this.canvas.height) {
                this.bullets.splice(index, 1);
            }
        });
    }

    draw(context) {
        // Dibujar el tanque
        if (this.imageLoaded) {
            context.save();
            context.translate(this.x + this.width / 2, this.y + this.height / 2);

            // Rotar la imagen según la dirección
            switch (this.direction) {
                case 'up':
                    context.rotate(0);
                    break;
                case 'down':
                    context.rotate(Math.PI);
                    break;
                case 'left':
                    context.rotate(-Math.PI / 2);
                    break;
                case 'right':
                    context.rotate(Math.PI / 2);
                    break;
            }

            context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            context.restore();
        } else {
            // Opcionalmente, dibujar un marcador de posición
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
        }

        // Dibujar las balas
        this.bullets.forEach((bullet) => bullet.draw(context));
    }

    move(direction, blocks) {
        this.direction = direction;

        let dx = 0;
        let dy = 0;

        switch (direction) {
            case 'up':
                dy = -this.speed;
                break;
            case 'down':
                dy = this.speed;
                break;
            case 'left':
                dx = -this.speed;
                break;
            case 'right':
                dx = this.speed;
                break;
        }

        const newX = this.x + dx;
        const newY = this.y + dy;

        // Verificar colisiones con los bordes del canvas
        if (newX < 0 || newX + this.width > this.canvas.width || newY < 0 || newY + this.height > this.canvas.height) {
            return; // Fuera de los límites, no mover
        }

        // Verificar colisiones con bloques del mapa
        if (this.willCollideWithBlock(newX, newY, blocks)) {
            return; // Colisión detectada, no mover
        }

        // If no collision, update position
        this.x = newX;
        this.y = newY;
    }

    willCollideWithBlock(newX, newY, blocks) {
        for (let block of blocks) {
            if (!block.passable) {
                if (this.rectCollides(newX, newY, this.width, this.height, block.x, block.y, block.width, block.height)) {
                    return true;
                }
            }
        }
        return false;
    }

    rectCollides(ax, ay, aw, ah, bx, by, bw, bh) {
        return (
            ax < bx + bw &&
            ax + aw > bx &&
            ay < by + bh &&
            ay + ah > by
        );
    }

    shoot() {
        if (this.bullets.length === 0) {
            playAudio('shoot');
            this.bullets.push(new Bullet(this.x + this.width / 2, this.y + this.height / 2, this.direction));
            this.cooldown = 50; // Ajusta el tiempo de recarga según sea necesario
        }
    }

    takeDamage() {
        playAudio('hit');
        this.health -= 10; // Disminuir salud
        if (this.health <= 0) {
            playAudio('explosion');
            this.alive = false;
        }
    }

    isAlive(){
        return this.alive;
    }
}

class Bullet {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.speed = 7;
        this.size = 5;
        this.direction = direction;
    }

    update() {
        switch (this.direction) {
            case 'up':
                this.y -= this.speed;
                break;
            case 'down':
                this.y += this.speed;
                break;
            case 'left':
                this.x -= this.speed;
                break;
            case 'right':
                this.x += this.speed;
                break;
        }
    }

    draw(context) {
        context.fillStyle = 'yellow';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.strokeStyle = 'red';
        context.lineWidth = 3; 
        context.stroke();
        context.fill();
    }
}
  