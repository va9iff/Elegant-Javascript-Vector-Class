// u * (u + v);
// need to be
// (1;1) * | (1;1) + (2;0) | = (1;1) * | (3;4) | = (1;1) * 5 = (5;5)

// but if we modify "this", it goes like that
// (1;1) * | (1;1) + (2;0) | = (3;4) * |(3;4)| = (3;4) * 5 = (15;20)
// ^^^^^  !!!!!!!!!!!    ^^^^^
// adding (2;0) to (1;1) changes (1;1) everywhere

// so, we shouldn't modify "this"
// eg: NO this.x = this.x+vec.x;
// eg: YES V=this.re(); V.x=V.x+vec.x return V
// a = u.mul(u.add(v).len()); log(a);

class Vector {
  // takes x and y. if aren't passed, take as 0
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  // V = a new Vector that is equal to "this"
  // r = return value

  //r: V
  re() {
    return new Vector(this.x, this.y);
  }

  //r: V added vec
  add(vec) {
    let V = this.re();
    V.x += vec.x;
    V.y += vec.y;
    return V;
  }

  //r: V subtracted vec
  sub(vec) {
    let V = this.re();
    V.x -= vec.x;
    V.y -= vec.y;
    return V;
  }

  //r: V multiplied with num
  mul(num) {
    let V = this.re();
    V.x *= num;
    V.y *= num;
    return V;
  }

  //r: V devided to num
  div(num) {
    let V = this.re();
    V.x /= num;
    V.y /= num;
    return V;
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
    // return vec.mul(this.dot(vec) / vec.dot(vec)); //is also valid
  }

  //r: angle of V in radians
  angle() {
    return Math.atan2(this.y, this.x);
  }

  //r: V with given angle
  setAngle(angle) {
    let V = this.re();
    let l = this.len();

    V.x = Math.cos(angle) * l;
    V.y = Math.sin(angle) * l;
    return V;
  }

  //r: V rotated by angle
  rotate(angle) {
    let V = this.re();
    let l = this.len();
    let a = this.angle();

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
    return this.min(newLen).max(newLen);
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
