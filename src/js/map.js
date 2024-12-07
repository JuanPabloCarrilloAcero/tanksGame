import {Block} from './block.js';
import {getBlockSize} from "./functions/getBlockSize.js";
import {getLayout} from "./functions/getLayout.js";

export class Map {
    constructor(canvas) {
        this.blockSize = getBlockSize(canvas);
        this.blocks = [];
        const layout = getLayout();
        this.loadMap(layout);
    }

    loadMap(layout) {
        for (let row = 0; row < layout.length; row++) {
            for (let col = 0; col < layout[row].length; col++) {
                const type = layout[row][col];
                const x = col * this.blockSize;
                const y = row * this.blockSize;
                this.blocks.push(new Block(x, y, this.blockSize, this.blockSize, type));
            }
        }
    }

    draw(context) {
        this.blocks.forEach(block => block.draw(context));
    }
}
