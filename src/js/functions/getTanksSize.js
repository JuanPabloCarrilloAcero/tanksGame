import {getBlockSize} from "./getBlockSize.js";

export function getTankSize(canvas) {
    return getBlockSize(canvas) / 2;
}