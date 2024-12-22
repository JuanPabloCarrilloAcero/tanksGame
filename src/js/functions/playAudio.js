const audioFiles = {
    explosion: new Audio('/src/assets/audio/explosion1.wav'),
    shoot: new Audio('/src/assets/audio/shoot.wav'),
    hit: new Audio('/src/assets/audio/tank_hit.wav'),
    brick_hit: new Audio('/src/assets/audio/brick_hit.wav'),
    game_start: new Audio('/src/assets/audio/game_start.mp3'),
    tank_moving: new Audio('/src/assets/audio/tank_moving.wav'),
    tank_idle: new Audio('/src/assets/audio/tank_idle.wav'),
};

export function playAudio(sound) {
    audioFiles.shoot.volume = 0.5;
    audioFiles.explosion.volume = 0.5;
    audioFiles.hit.volume = 0.5;
    audioFiles.brick_hit.volume = 0.5;
    audioFiles.game_start.volume = 0.5;
    audioFiles.tank_moving.volume = 0.5;
    audioFiles.tank_idle.volume = 0.5;
    if (audioFiles[sound]) {
        audioFiles[sound].currentTime = 0; // Reinicia el sonido si ya está reproduciéndose
        audioFiles[sound].play();
    }
}