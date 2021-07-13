class Vector {
  constructor(x, y) {
    // takes x and y. if aren't passed, take as 0
    this.x = x || 0;
    this.y = y || 0;
  }
  add(vec) {
    // adds vec to this
    return new Vector(this.x + vec.x, this.y + vec.y);
  }
  sub(vec) {
    // subtracts vec from this
    return new Vector(this.x - vec.x, this.y - vec.y);
  }
  mul(num) {
    // multiplies this to num
    return new Vector(this.x * num, this.y * num);
  }
  div(num) {
    // devid this to num
    return new Vector(this.x / num, this.y / num);
  }
  len() {
    // length of this
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  lensq() {
    // length square of this
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }
  norm() {
    // reduce its length to 1s
    return this.div(this.len());
  }
  dot(vec) {
    // dot product
    return this.x * vec.x + this.y * vec.y;
  }
  cross(vec) {
    // Cross product
    return this.x * vec.y - this.y * vec.x;
  }
  no0() {
    // returns smallest positive (y and x) vector if length of this is 0
    if (this.len() == 0) {
      this.x = Number.MIN_VALUE;
      this.y = Number.MIN_VALUE;
    }
    return this;
  }
  direction() {
    // return the angle of the vector in radians
    return Math.atan2(this.y, this.x);
  }
  setDirection(direction) {
    // set the direction of the vector in radians
    let l = this.len();
    this.x = Math.cos(direction) * l;
    this.y = Math.sin(direction) * l;
    return this;
  }
}
export { Vector };

// import { Vector } from "./vector.js"; //include this in your fike
