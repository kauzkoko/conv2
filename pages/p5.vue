<script setup>
const sketch1 = useP5((p5) => {
  let heads = [];
  let motion = false;
  let backgroundColor = 255;

  class Dude {
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }

    debug() {
      let safeMouseX = p5.constrain(p5.mouseX, 0, 400);
      console.log(safeMouseX);
    }

    display() {
      let safeMouseX = p5.constrain(p5.mouseX, 0, p5.width);
      let safeMouseY;
      if (motion && typeof p5.rotationY !== "undefined") {
        // Map rotation to Y position, assuming rotation range of -90 to 90 degrees
        safeMouseY = p5.map(p5.rotationY, -90, 90, 0, p5.height);
      } else {
        safeMouseY = p5.constrain(p5.mouseY, 0, p5.height);
      }
      p5.push();
      p5.strokeWeight(7);
      p5.rectMode(p5.CENTER);
      p5.translate(this.x - 25, this.y - 25);
      p5.scale(1 / 6);

      //head
      p5.fill(
        p5.map(safeMouseX, 0, p5.width, 255, 0),
        p5.map(safeMouseY, 0, p5.height, 255, 0),
        0
      );
      p5.ellipse(p5.width / 2, p5.height / 2, p5.width, p5.height);

      //left eye
      p5.fill(0);
      p5.rect(p5.width / 4, p5.map(safeMouseX, 0, p5.width, 100, 60), 50);
      p5.fill(255);
      p5.ellipse(p5.width / 4, p5.map(safeMouseX, 0, p5.width, 50, 10), 50);
      p5.fill(0);
      p5.ellipse(p5.width / 4, p5.map(safeMouseX, 0, p5.width, 50, 20), 20);

      p5.rect((p5.width / 4) * 3, 100, 50);
      p5.fill(255);
      p5.ellipse((p5.width / 4) * 3, 75, 75);
      p5.fill(0);
      p5.ellipse(
        (p5.width / 4) * 3,
        70,
        p5.map(safeMouseX, 0, p5.width, 50, 20)
      );

      p5.noFill();
      p5.bezier(
        (p5.width / 8) * 3,
        (p5.height / 8) * 3,
        p5.width / 16,
        p5.height / p5.map(safeMouseX, 0, p5.width, 16, 8),
        p5.width / p5.map(safeMouseX, 0, p5.width, 16, 8),
        p5.height / p5.map(safeMouseX, 0, p5.width, 1, 2),
        p5.width / 2,
        (p5.height / 8) * 3
      );

      p5.fill(0);
      p5.rect(
        p5.width / 2,
        (p5.height / 4) * p5.map(safeMouseX, 0, p5.width, 3, 2),
        300,
        50
      );
      p5.fill(255);
      p5.rect(
        p5.width / 2,
        (p5.height / 4) * p5.map(safeMouseX, 0, p5.width, 3, 2.5) - 10,
        250,
        20
      );
      p5.pop();
    }
  }

  p5.setup = () => {
    p5.createCanvas(400, 400);
    for (let stepper = 10; stepper > 0; stepper--) {
      for (let xIndex = 1; xIndex < stepper; xIndex++) {
        for (let yIndex = 1; yIndex < stepper; yIndex++) {
          heads.push(
            new Dude(
              (xIndex * p5.width) / stepper,
              (yIndex * p5.height) / stepper
            )
          );
        }
      }
    }

    if (typeof DeviceMotionEvent.requestPermission === "function") {
      document.body.addEventListener("click", function () {
        DeviceMotionEvent.requestPermission()
          .then(function () {
            console.log("DeviceMotionEvent enabled");

            motion = true;
          })
          .catch(function (error) {
            console.warn("DeviceMotionEvent not enabled", error);
          });
      });
    }
  };

  p5.draw = () => {
    p5.background(backgroundColor);
    p5.push();
    p5.translate(-10, -10);
    heads.forEach((head) => head.display());
    p5.pop();
  };

  p5.windowResized = () => {
    if (p5.windowWidth > 768) {
      backgroundColor = [255, 0, 0];
    } else {
      backgroundColor = [255];
    }
  };
}, "p5canvas");
</script>