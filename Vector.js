// not tested every function after huge new V update

class Vector {
  // takes x and y. if aren't passed, take as 0
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  // V = a new Vector that is equal to "this"
  // r = return value

  //r: V; reconstructs the new vector from "this"
  //arg: valid arguments.
  re() {
    return new Vector(this.x, this.y);
  }

  //r: V added vec
  //param: Vector || a number for both x and y || 2 number for x and y
  add(vec = new Vector(1, 1), maybeY) {
    let V = this.re();
    V.x += vec.x || vec;
    V.y += maybeY || vec.y || vec;
    return V;
  }

  //r: V subtracted vec
  //param: Vector || a number for x and y || 2 number for each
  sub(vec = new Vector(1, 1), maybeY) {
    let V = this.re();
    V.x -= vec.x || vec;
    V.y -= maybeY || vec.y || vec;
    return V;
  }

  //r: V multiplied with num
  mul(num) {
    let V = this.re();
    V.x *= num || 1;
    V.y *= num || 1;
    return V;
  }

  //r: V devided to num
  div(num) {
    let V = this.re();
    V.x /= num || 1;
    V.y /= num || 1;
    return V;
  }

  //r: V's length
  len() {
    let V = this.re();
    return Math.sqrt(Math.pow(V.x, 2) + Math.pow(V.y, 2));
  }

  //r: V's length square
  lensq() {
    let V = this.re();
    return Math.pow(V.x, 2) + Math.pow(V.y, 2);
  }

  //r: V with length = 1
  norm() {
    let V = this.re();
    return V.div(V.len());
  }

  //r: dot product of V and vec
  dot(vec) {
    let V = this.re();
    return V.x * vec.x + V.y * vec.y;
  }

  //r: cross product of V and vec
  cross(vec) {
    let V = this.re();
    return V.x * vec.y - V.y * vec.x;
  }

  //r: projection V onto vec
  projectTo(vec) {
    let V = this.re();
    return vec.norm().mul(V.dot(vec.norm()));
  }

  //r: angle of V in radians
  angle() {
    let V = this.re();
    return Math.atan2(V.y, V.x);
  }

  //r: V with given angle
  setAngle(angle) {
    let V = this.re();
    let l = V.len();
    V.x = Math.cos(angle) * l;
    V.y = Math.sin(angle) * l;
    return V;
  }

  //r: V rotated by angle
  rotate(angle) {
    let V = this.re();
    let l = V.len();
    let a = V.angle();
    V.x = Math.cos(angle + a) * l;
    V.y = Math.sin(angle + a) * l;
    return V;
  }

  //r: V or V with (x & y) = smallest positive number if V is (0;0)
  no0() {
    let V = this.re();
    if (V == (0, 0)) {
      V.x = Number.MIN_VALUE;
      V.y = Number.MIN_VALUE;
    }
    return V;
  }

  //r: V with minimum length of minlen
  min(minlen) {
    let V = this.re();
    if (V.len() < minlen) {
      return V.norm().mul(minlen);
    }
    return V;
  }

  //r: V with maximum length of maxlen
  max(maxlen) {
    let V = this.re();
    if (V.len() > maxlen) {
      return V.norm().mul(maxlen);
    }
    return V;
  }

  //r: V with len = newLen
  setLen(newLen) {
    let V = this.re();
    return V.min(newLen).max(newLen);
  }

  //r: V with x clamped to an interval
  clampX(minX, maxX) {
    let V = this.re();
    if (V.x < minX) {
      V.x = minX;
    } else if (V.x > maxX) {
      V.x = maxX;
    }
    return V;
  }

  //r: V with y clamped to an interval
  clampY(minY, maxY) {
    let V = this.re();
    if (V.y < minY) {
      V.y = minY;
    } else {
      V.y = maxY;
    }
    return V;
  }

  //r: V with minlen < len < maxlen
  clampLen(minLen, maxLen) {
    let V = this.re();
    return V.min(minLen).max(maxLen);
  }

  //r: a Vector that looks from V to vec
  vectorTo(vec) {
    let V = this.re();
    return vec.sub(V);
  }

  //r: distance from V to vec
  distance_to(vec) {
    let V = this.re();
    return V.vectorTo(vec).len();
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
}

// making math function accessable with [" "]
// eg: u["*"](4)["+"](v)
Vector.prototype["+"] = function (arg) {
  return this.add(arg);
};
Vector.prototype["-"] = function (arg) {
  return this.sub(arg);
};
Vector.prototype["*"] = function (arg) {
  return this.mul(arg);
};
Vector.prototype["/"] = function (arg) {
  return this.div(arg);
};

//
//
// export { Vector };
// import { Vector } from "./vector.js"; //include this in your fike
