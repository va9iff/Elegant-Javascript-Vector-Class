// EXAMPLES

// a = u["+"](v)["-"](p)["*"](4);

// l = V(5,8)["+"](s)["*"](3).len()
// functions go from left to right. so, ["*"] isn't called first

// different from .add(), it auto generates new Vector and doesn't modify 'this'

// u = V(10,10)
// u["+"](5,5) // gives 15;15, but u is 10;10
// u.add(5,5)  // u is 15,15, and returns u

// it is like a methematical expression. you can u = u["+"](v)

class Vector {
  // takes x and y. if aren't passed, take as 0
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  // V = a new Vector that is equal to "this"
  // r = return value

  //r: V; reconstructs the new vector from "this"
  re() {
    return new Vector(this.x, this.y);
  }

  //r: V added vec
  add(vec = 0) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  //r: V subtracted vec
  sub(vec = 0) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  //r: V multiplied with num
  mul(num = 1) {
    this.x *= num;
    this.y *= num;
    return this;
  }

  //r: V devided to num
  div(num = 1) {
    this.x /= num;
    this.y /= num;
    return this;
  }

  //r: V's length
  len() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  //r: V's length square
  lensq() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  //r: V with length = 1
  norm() {
    if (!this.len()) return this; //0 Vector
    this.div(this.len());
    return this;
  }

  //r: dot product of V and vec
  dot(vec) {
    return this.x * vec.x + this.y * vec.y;
  }

  //r: cross product of V and vec
  cross(vec) {
    return this.x * vec.y - this.y * vec.x;
  }

  //r: projection V onto vec
  projectTo(vec) {
    return vec.norm().mul(this.dot(vec.norm()));
  }

  //r: angle of V in radians
  angle() {
    return Math.atan2(this.y, this.x);
  }

  //r: V with given angle in radians
  setAngle(angle) {
    let l = this.len();
    let a = angle || this.angle();
    this.x = Math.cos(a) * l;
    this.y = Math.sin(a) * l;
    return this;
  }

  //r: V rotated by angle
  rotate(angle = 0) {
    let l = this.len();
    let a = this.angle();
    this.x = Math.cos(angle + a) * l;
    this.y = Math.sin(angle + a) * l;
    return this;
  }

  //r: V or V with (x & y) = smallest positive number if V is (0;0)
  no0() {
    if (V == (0, 0)) {
      this.x = Number.MIN_VALUE;
      this.y = Number.MIN_VALUE;
    }
    return this;
  }

  //r: V with minimum length of minlen
  min(minlen) {
    minlen = minlen || this.len();
    if (this.len() < minlen) {
      return this.norm().mul(minlen);
    }
    return this;
  }

  //r: V with maximum length of maxlen
  max(maxlen) {
    if (this.len() > maxlen) {
      return this.norm().mul(maxlen);
    }
    return this;
  }

  //r: V with len = newLen
  setLen(newLen) {
    this.min(newLen).max(newLen);
    return this;
  }

  //r: V with x clamped to an interval
  clampX(minX, maxX) {
    if (this.x < minX) {
      this.x = minX;
    } else {
      this.x = maxX;
    }
    return this;
  }

  //r: V with y clamped to an interval
  clampY(minY, maxY) {
    if (this.y < minY) {
      this.y = minY;
    } else {
      this.y = maxY;
    }
    return this;
  }

  //r: V with minlen < len < maxlen
  clampLen(minLen, maxLen) {
    this.min(minLen).max(maxLen);
    return this;
  }

  //r: a Vector that looks from V to vec
  vectorTo(vec) {
    return vec.sub(this);
  }

  //r: distance from V to vec
  distanceTo(vec) {
    return this.vectorTo(vec).len();
  }

  // shorthand for writing operations nicer.
  // takes operation type in odds, argument in evens.
  // eg: u.op("*", 4, "+", new Vector(9, 0), "/", v.len())
  // is same with u.mul(4).add(new Vector(9, 0)).div(v.len()).
  op() {
    let oplist = arguments; // arguments given to the function
    let opresult = this;
    for (let index = 0; index < oplist.length; index += 2) {
      let op_type = oplist[index];
      let arg_to_op = oplist[index + 1];
      opresult = opresult[op_type](arg_to_op);
    }
    return opresult;
  }
  // we can also use other functions with names like
  // u.op("setAngle", Math.PI / 4); u.op("len", null);
  // but it can confilect with parameter counts.
}

// making math function accessable with [" "]
// eg: a = u["+"](v)["-"](p)["*"](4);

Vector.prototype["+"] = function () {
  return this.re().add(...arguments);
};
Vector.prototype["-"] = function () {
  return this.re().sub(...arguments);
};
Vector.prototype["*"] = function () {
  return this.re().mul(...arguments);
};
Vector.prototype["/"] = function () {
  return this.re().div(...arguments);
};

var V = (x, y) => new Vector(x, y);

//
//
// export { Vector };
// import { Vector } from "./vector.js";
