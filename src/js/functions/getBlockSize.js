import {boardSize} from "../constants/constants.js";

export function getBlockSize(canvas) {
    return canvas.width / boardSize;
}