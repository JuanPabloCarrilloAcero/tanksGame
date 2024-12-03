export class Player {
    constructor(x, y, canvas) {
      this.x = x; // Posición X del tanque
      this.y = y; // Posición Y del tanque
      this.width = 40; // Ancho del tanque
      this.height = 40; // Alto del tanque
      this.speed = 2; // Velocidad de movimiento
      this.direction = 'up'; // Dirección inicial
      this.canvas = canvas;
      this.bullets = []; // Arreglo para las balas
      this.cooldown = 0; // Tiempo de recarga entre disparos
  
      // Imagen del tanque
      this.image = new Image();
      this.image.src = '/src/assets/player_tank.png';

      this.image.onload = () => {
        this.imageLoaded = true;
      };
      this.imageLoaded = false;
    }
  
    update() {
      // Reducir el cooldown
      if (this.cooldown > 0) {
        this.cooldown--;
      }
  
      // Actualizar posición de las balas
      this.bullets.forEach((bullet, index) => {
        bullet.update();
        // Remover la bala si sale del canvas
        if (
          bullet.x < 0 ||
          bullet.x > this.canvas.width ||
          bullet.y < 0 ||
          bullet.y > this.canvas.height
        ) {
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
  
        context.drawImage(
          this.image,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
        context.restore();
      } else {
        // Opcionalmente, dibujar un marcador de posición
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
      }
  
      // Dibujar las balas
      this.bullets.forEach((bullet) => bullet.draw(context));
    }
  
    move(direction) {
        this.direction = direction;
    
        // Movimiento
        switch (direction) {
            case 'up':
                if (this.y - this.speed >= 0) {
                    this.y -= this.speed;
                }
                break;
            case 'down':
                if (this.y + this.height + this.speed <= this.canvas.height) {
                    this.y += this.speed;
                }
                break;
            case 'left':
                if (this.x - this.speed >= 0) {
                    this.x -= this.speed;
                }
                break;
            case 'right':
                if (this.x + this.width + this.speed <= this.canvas.width) {
                    this.x += this.speed;
                }
                break;
        }
    }
  
    shoot() {
      if (this.cooldown === 0) {
        this.bullets.push(new Bullet(this.x + this.width / 2, this.y + this.height / 2, this.direction));
        this.cooldown = 50; // Ajusta el tiempo de recarga según sea necesario
      }
    }
  }
  
  class Bullet {
    constructor(x, y, direction) {
      this.x = x;
      this.y = y;
      this.speed = 2;
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
      context.fill();
    }
  }
  