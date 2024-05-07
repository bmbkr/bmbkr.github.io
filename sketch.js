let images = [];

function preload() {
  images.push(loadImage('furguson.png'));
  images.push(loadImage('honey.png'));
  images.push(loadImage('tux.png'));
}

// workaround??
document.addEventListener('touchstart', {});

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
    this.rotationalSpeed = (Math.random() - 0.5) * 0.1;
    this.rotation = 0;
    this.imageIndex = Math.floor(Math.random() * images.length);
  } 

  display() {
    this.y += this.speed;
    this.x += this.direction * this.speed;

    imageMode(CENTER);
    push();

    // tint(255, 255, 255, 250);

    translate(this.x, this.y);
    rotate(this.rotation);
    image(images[this.imageIndex], 0, 0, this.size, this.size);
    pop();

    this.rotation += this.rotationalSpeed;
  }

  isOffScreen() {
    return this.y > height + this.size;
  }
}

const faces = [];

function draw() {
  background(0, 0, 0, 8);

  if (frameCount % 10 === 0) {
    faces.push(new Face());
  }

  // filter(BLUR, 2);

  faces.forEach(face => face.display());

  faces.forEach(face => {
    if (face.isOffScreen()) {
      faces.splice(faces.indexOf(face), 1);
    }
  });
}

function touchStarted () {
  var fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
}

/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling the page.
 */
document.ontouchmove = function(event) {
    event.preventDefault();
};


// reload every 10 minutes
setTimeout(() => {
  location.reload();
}, 10 * 60 * 1000);
