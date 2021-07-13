class Vector {
  // takes x and y. if aren't passed, take as 0
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  // adds vec to this
  add(vec) {
    return new Vector(this.x + vec.x, this.y + vec.y);
  }

  // subtracts vec from this
  sub(vec) {
    return new Vector(this.x - vec.x, this.y - vec.y);
  }

  // multiplies this to num
  mul(num) {
    return new Vector(this.x * num, this.y * num);
  }

  // devid this to num
  div(num) {
    return new Vector(this.x / num, this.y / num);
  }

  // length of this
  len() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  // length square of this
  lensq() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  // reduce its length to 1
  norm() {
    return this.div(this.len());
  }

  // dot product
  dot(vec) {
    return this.x * vec.x + this.y * vec.y;
  }

  // cross product
  cross(vec) {
    return this.x * vec.y - this.y * vec.x;
  }

  // return the angle of this in radians
  direction() {
    return Math.atan2(this.y, this.x);
  }

  // set the direction of this in radians
  setDirection(direction) {
    let l = this.len();
    this.x = Math.cos(direction) * l;
    this.y = Math.sin(direction) * l;
    return this;
  }

  // returns smallest positive (y and x) vector if length is 0
  no0() {
    if (this.len() == 0) {
      this.x = Number.MIN_VALUE;
      this.y = Number.MIN_VALUE;
    }
    return this;
  }

  //rise its len to minlen
  min(minlen) {
    if (this.len() < minlen) {
      return this.norm().mul(minlen);
    }
    return this;
  }

  //rise its len to minlen
  max(maxlen) {
    if (this.len() > maxlen) {
      return this.norm().mul(maxlen);
    }
    return this;
  }

  // clamps x to an interval
  clampX(minX, maxX) {
    if (this.x < minX) {
      this.x = minX;
    } else if (this.x > maxX) {
      this.x = maxX;
    }
    return this;
  }

  // clamps y to an interval
  clampY(minY, maxY) {
    if (this.y < minY) {
      this.y = minY;
    } else if (this.y > maxY) {
      this.y = maxY;
    }
    return this;
  }

  // shorthand for .min().max()
  clampLen(minLen, maxLen) {
    return this.min(minLen).max(maxLen);
  }

  // returns vector to given vector
  vectorTo(vec) {
    return vec.sub(this);
  }
}

// export { Vector };

// import { Vector } from "./vector.js"; //include this in your fike
