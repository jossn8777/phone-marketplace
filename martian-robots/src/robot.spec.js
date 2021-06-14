// random testcase
import { describe, expect } from '@jest/globals';
import Robot, { Mars } from './robot';

/**
 * y
 * ^   N
 * |W  +  E
 * |   S
 * 0------->x
 */

describe('Orientation of robot is W', () => {
  it("turn left, new orientation is S", () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 1, 1, 'W');
    const result = robot.execute('L');
    expect(result).toEqual([1, 1, 'S']);
  });

  it('turn right, new orientation is N', () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 1, 1, 'W');
    const result = robot.execute('R');
    expect(result).toEqual([1, 1, 'N']);
  });

  it('forward, keep orientation and update position', () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 1, 1, 'W');
    const result = robot.execute('F');
    expect(result).toEqual([0, 1, 'W']);
  });

  it('forward, in border', () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 0, 1, 'W');
    const result = robot.execute('F');
    expect(result).toEqual([0, 1, 'W', 'LOST']);
  });

  it('forward, in border, already have a robot loss in here', () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 0, 0, 'W');
    const result = robot.execute('F');
    expect(result).toEqual([0, 0, 'W', 'LOST']);

    const robot2 = new Robot(mars, 1, 0, 'W');
    const result2 = robot2.execute('FFRF'); // F -> go to position  of robot, found a scent -> ignore update position
    expect(result2).toEqual([0, 1, 'N']);
  });
});

describe('Orientation of robot is E', () => {
  it("turn left, new orientation is N", () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 1, 1, 'E');
    const result = robot.execute('L');
    expect(result).toEqual([1, 1, 'N']);
  });

  it('turn right, new orientation is S', () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 1, 1, 'E');
    const result = robot.execute('R');
    expect(result).toEqual([1, 1, 'S']);
  });

  it('forward, keep orientation and update position', () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 1, 1, 'E');
    const result = robot.execute('F');
    expect(result).toEqual([2, 1, 'E']);
  });

  it('forward, in border', () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 5, 1, 'E');
    const result = robot.execute('F');
    expect(result).toEqual([5, 1, 'E', 'LOST']);
  });
});

describe('Orientation of robot is S', () => {
  it("turn left, new orientation is E", () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 1, 1, 'S');
    const result = robot.execute('L');
    expect(result).toEqual([1, 1, 'E']);
  });

  it('turn right, new orientation is W', () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 1, 1, 'S');
    const result = robot.execute('R');
    expect(result).toEqual([1, 1, 'W']);
  });

  it('forward, keep orientation and update position', () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 1, 1, 'S');
    const result = robot.execute('F');
    expect(result).toEqual([1, 0, 'S']);
  });

  it('forward, in border', () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 1, 0, 'S');
    const result = robot.execute('F');
    expect(result).toEqual([1, 0, 'S', 'LOST']);
  });
});

describe('Orientation of robot is N', () => {
  it("turn left, new orientation is W", () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 1, 1, 'N');
    const result = robot.execute('L');
    expect(result).toEqual([1, 1, 'W']);
  });

  it('turn right, new orientation is E', () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 1, 1, 'N');
    const result = robot.execute('R');
    expect(result).toEqual([1, 1, 'E']);
  });

  it('forward, keep orientation and update position', () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 1, 1, 'N');
    const result = robot.execute('F');
    expect(result).toEqual([1, 2, 'N']);
  });

  it('forward, in border', () => {
    const mars = new Mars(5, 3);
    const robot = new Robot(mars, 1, 3, 'N');
    const result = robot.execute('F');
    expect(result).toEqual([1, 3, 'N', 'LOST']);
  });
});

