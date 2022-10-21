let colorlist = ['gold', 'yellow', 'turquoise', 'red']

const ARM_LENGTH = 50;

let forearm;
let backarm;

function setup() {
    createCanvas(windowWidth, windowHeight);
    const mid = createVector(windowWidth / 2, windowHeight / 2)
    backarm = new Arm(mid.x, mid.y, mid.x + ARM_LENGTH, mid.y)
    forearm = new Arm(backarm.front.x, backarm.front.y, backarm.front.x + ARM_LENGTH + 1, backarm.front.y);

    background(255);
}

function draw() {
    clear();
    strokeWeight(10);
    stroke(255, 204, 0);
    backarm.draw();
    stroke(20);
    forearm.draw();

    let og_to_m = createVector(mouseX - backarm.og.x, mouseY - backarm.og.y);
    const BOTH_ARMS = forearm.length + backarm.length;
    const len = og_to_m.mag();
    if (len > BOTH_ARMS) og_to_m.setMag(BOTH_ARMS);

    stroke(128, 128, 128)
    line(backarm.og.x, backarm.og.y, backarm.og.x + og_to_m.x, backarm.og.y + og_to_m.y);

    forearm.front.set(backarm.og.x + og_to_m.x, backarm.og.y + og_to_m.y);
    if (Math.abs(forearm.length - forearm.pointDists().mag()) > 0.1) {
        console.log("FUCK");
    }
}
class Arm {
    constructor(origin_x, origin_y, fore_x, fore_y) {
        this.og = createVector(origin_x, origin_y);
        this.front = createVector(fore_x, fore_y);
        this.length = dist(origin_x, origin_y, fore_x, fore_y);
    }

    pointDists() {
        let out = this.front.copy();
        let og = this.og.copy();
        out.sub(og);

        return out;
    }

    draw() {
        line(this.og.x, this.og.y, this.front.x, this.front.y);
    }
}
