let catImage;

function preload() {
  catImage = loadImage('furguson.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

class Face {
  constructor() {
    this.size = 50 + Math.random() * 150
    this.x = Math.random() * width;
    this.y = -this.size;
    this.speed = Math.random() * 3 + 1;
    this.direction = Math.random() - 0.5;
    this.rotationalSpeed = (Math.random() - 0.5) * 0.05;
    this.rotation = 0;
  } 

  display() {
    this.y += this.speed;
    this.x += this.direction * this.speed;

    imageMode(CENTER);
    push();

    // tint(255, 255, 255, 250);

    translate(this.x, this.y);
    rotate(this.rotation);
    image(catImage, 0, 0, this.size, this.size);
    pop();

    this.rotation += this.rotationalSpeed;
  }

  isOffScreen() {
    return this.y > height + this.size;
  }
}

const faces = [];

function draw() {
  background(0);

  if (frameCount % 10 === 0) {
    faces.push(new Face());
  }

  faces.forEach(face => face.display());

  faces.forEach(face => {
    if (face.isOffScreen()) {
      faces.splice(faces.indexOf(face), 1);
    }
  });
}


// Wait 10 seconds then go fullscreen
setTimeout(() => {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}, 10000);