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
    // reduce its length to 1
    return this.div(this.len());
  }
  dot(vec) {
    // dot product
    return this.x * vec.x + this.y * vec.y;
  }
  cross(vec) {
    // cross product
    return this.x * vec.y - this.y * vec.x;
  }
  direction() {
    // return the angle of this in radians
    return Math.atan2(this.y, this.x);
  }
  setDirection(direction) {
    // set the direction of this in radians
    let l = this.len();
    this.x = Math.cos(direction) * l;
    this.y = Math.sin(direction) * l;
    return this;
  }
  no0() {
    // returns smallest positive (y and x) vector if length is 0
    if (this.len() == 0) {
      this.x = Number.MIN_VALUE;
      this.y = Number.MIN_VALUE;
    }
    return this;
  }
  min(minlen) {
    //rise its len to minlen
    if (this.len() < minlen) {
      return this.norm().mul(minlen);
    }
    return this;
  }
  max(maxlen) {
    //rise its len to minlen
    if (this.len() > maxlen) {
      return this.norm().mul(maxlen);
    }
    return this;
  }
}

// export { Vector };

// import { Vector } from "./vector.js"; //include this in your fike
