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

  // ortogonal projection (soon)

  // return the angle of this in radians
  angle() {
    return Math.atan2(this.y, this.x);
  }

  // set the angle of this in radians
  setAngle(angle) {
    let l = this.len();
    this.x = Math.cos(angle) * l;
    this.y = Math.sin(angle) * l;
    return this;
  }

  // rotate as angle with radians
  rotate(angle) {
    let l = this.len();
    let a = this.angle();
    this.x = Math.cos(angle + a) * l;
    this.y = Math.sin(angle + a) * l;
    return this;
  }

  // returns smallest positive (x and y) vector if length is 0
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

  //lower its len to maxlen
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

  // returns distance to vec
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
  // but can make you confused with argument counts. so, use with maths.
}

// making math function accessable with [" "]
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
// eg: u["*"](4)["+"](v)

//
//
// export { Vector };
// import { Vector } from "./vector.js"; //include this in your fike
