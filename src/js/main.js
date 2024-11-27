import { Game } from './game.js';

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const game = new Game(canvas, context);
game.start();
