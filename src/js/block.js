import {getBlockImage} from "./functions/getBlockImage.js";

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
    }

    draw(context) {
        const image = imageArray[this.type];
        if (image.complete) {
            context.drawImage(image, this.x, this.y, this.width, this.height);
        } else {
            // Placeholder
            context.fillStyle = 'gray';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    // If destructible
    takeDamage() {
        if (this.destructible) {
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