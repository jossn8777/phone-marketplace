
import fs from 'fs';
import Robot, { Mars } from './robot';

const args = process.argv;

let file = './sample.txt';
if (args.length >= 3) {
  file = args[2];
}

console.log('File: ', file);
const content = fs.readFileSync(file, { encoding: 'utf-8' });

console.log('Input: ');
console.log(content);
console.log('\n');

console.log('Output: ');

const [size, ...segments] = content.split('\n');

const [_sizeX, _sizeY] = size.split(' ');
const sizeX = parseInt(_sizeX);
const sizeY = parseInt(_sizeY);

const mars = new Mars(parseInt(sizeX), parseInt(sizeY));

for (let i = 0; i < segments.length; i += 2) {
  const init = segments[i];
  const instruction = segments[i + 1];

  const [x, y, orientation] = init.split(' ');
  const robot = new Robot(mars, parseInt(x), parseInt(y), orientation);
  const item = robot.execute(instruction);
  console.log(item.join(' '));
}

console.log()