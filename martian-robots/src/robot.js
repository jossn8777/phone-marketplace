
class Mars {
  constructor(sizeX, sizeY) {
    this._scents = [];
    this._sizeX = sizeX;
    this._sizeY = sizeY;
  }

  markScent([x, y]) {
    if (!this.hasScent([x, y])) {
      this._scents.push([x, y]);
    }
  }

  hasScent([x, y]) {
    return this._scents.some(([xi, yi]) => xi === x && yi === y);
  }

  isOutSide([x, y]) {
    return x < 0 || x > this._sizeX || y < 0 || y > this._sizeY;
  }
}

export { Mars };

// logic board
// RULE[NL] = [deltaX, deltaY, newOrientation] -> if orientation of robot is North and turn left, we will update x = deltaX + x, y = deltaY + y and orientation = newOrientation
const RULE = {
  NL: [0, 0, 'W'],
  NR: [0, 0, 'E'],
  NF: [0, 1, 'N'],

  EL: [0, 0, 'N'],
  ER: [0, 0, 'S'],
  EF: [1, 0, 'E'],

  WL: [0, 0, 'S'],
  WR: [0, 0, 'N'],
  WF: [-1, 0, 'W'],

  SL: [0, 0, 'E'],
  SR: [0, 0, 'W'],
  SF: [0, -1, 'S']
};

class Robot {
  constructor(mars, x, y, orientation) {
    this._mars = mars;
    this._x = x;
    this._y = y;
    this._o = orientation;
  }

  _next(ins) {
    if (!['L', 'R', 'F'].includes(ins)) return [this._x, this._y, this._o];

    const [dx, dy, og] = RULE[`${this._o}${ins}`];
    return [
      this._x + dx,
      this._y + dy,
      og
    ];
  }

  execute(instructions) {
    let isLost = false;

    for (let c of instructions) {
      const n = this._next(c);

      if (this._mars.isOutSide(n)) {
        if (!this._mars.hasScent(n)) {
          isLost = true;
          this._mars.markScent(n);
          break;
        }

        continue;
      }

      const [x, y, og] = n;
      this._x = x;
      this._y = y;
      this._o = og;
    }

    if (isLost) {
      return [this._x, this._y, this._o, 'LOST'];
    }

    return [this._x, this._y, this._o];
  }
}

export default Robot;