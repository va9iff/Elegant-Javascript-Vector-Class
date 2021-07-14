class Vector {
  // takes x and y. if aren't passed, take as 0
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  // V = a new Vector that is equal to "this"
  // r = return value

  //r: V
  reconstruct() {
    return new Vector(this.x, this.y);
  }

  //r: V added vec
  add(vec) {
    return new Vector(this.x + vec.x, this.y + vec.y);
    // not modifying this.x or this.y. returns a new Vector
  }

  //r: V subtracted vec
  sub(vec) {
    return new Vector(this.x - vec.x, this.y - vec.y);
  }

  //r: V multiplied with num
  mul(num) {
    return new Vector(this.x * num, this.y * num);
  }

  //r: V devided to num
  div(num) {
    return new Vector(this.x / num, this.y / num);
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
    return this.div(this.len());
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
    // return b.mul(this.dot(b) / b.dot(b)); //is also valid
  }

  //r: angle of V in radians
  angle() {
    return Math.atan2(this.y, this.x);
  }

  //r: V with given angle
  setAngle(angle) {
    let l = this.len(); // for multiple use
    return new Vector(Math.cos(angle) * l, Math.sin(angle) * l);
  }

  //r: V rotated by angle
  rotate(angle) {
    let l = this.len();
    let a = this.angle();
    return new Vector(Math.cos(angle + a) * l, Math.sin(angle + a) * l);
  }

  //r: V with x and y equal to smalles positive number
  no0() {
    if (this.len() == 0) {
      return new Vector(Number.MIN_VALUE, Number.MIN_VALUE);
    } else {
      return this.reconstruct();
    }
  }

  //r: V with minimum length of minlen
  min(minlen) {
    if (this.len() < minlen) {
      return this.norm().mul(minlen);
    }
    return this.reconstruct();
  }

  //r: V with maximum length of maxlen
  max(maxlen) {
    if (this.len() > maxlen) {
      return this.norm().mul(maxlen);
    }
    return this.reconstruct();
  }

  //r: V with len = newLen
  setLen(newLen) {
    return this.min(newLen).max(newLen);
  }

  // clamp V's x to an interval r: V
  clampX(minX, maxX) {
    xclamped = this.reconstruct();
    if (xclamped.x < minX) {
      xclamped.x = minX;
    } else if (xclamped.x > maxX) {
      xclamped.x = maxX;
    }
    return xclamped;
  }

  // clamp V's y to an interval r: V
  clampY(minY, maxY) {
    yclamped = this.reconstruct();
    if (yclamped.y < minY) {
      yclamped.y = minY;
    } else if (yclamped.y > maxY) {
      yclamped.y = maxY;
    }
    return yclamped;
  }

  //r: V with minlen < len < maxlen
  clampLen(minLen, maxLen) {
    return this.min(minLen).max(maxLen);
  }

  //r: a Vector that looks from V to vec
  vectorTo(vec) {
    return vec.sub(this);
  }

  //r: distance from V to vec
  distance_to(vec) {
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
  // but can make you confused with argument counts. avoid using like this.
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
