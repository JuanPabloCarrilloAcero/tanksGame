import { Game } from './game.js';

const canvas = document.getElementById('gameCanvas');
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext('2d');


const game = new Game(canvas, context);
game.start();
