import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createSVG = (text, color) => `
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}" />
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="white">${text}</text>
</svg>
`;

const images = [
  { path: 'src/assets/images/placeholders/img1.svg', text: 'Carousel 1', color: '#ff6b6b' },
  { path: 'src/assets/images/placeholders/img2.svg', text: 'Carousel 2', color: '#feca57' },
  { path: 'src/assets/images/placeholders/img3.svg', text: 'Carousel 3', color: '#48dbfb' },
  { path: 'src/assets/images/puzzle/puzzle_bg.svg', text: 'Puzzle Content', color: '#1dd1a1' },
  { path: 'src/assets/images/flowers/flower.svg', text: 'Flower', color: '#ff9ff3' },
  { path: 'src/assets/images/trivia/placeholder.svg', text: 'Trivia Image', color: '#5f27cd' },
  { path: 'src/assets/images/trick_start.svg', text: 'Trick Start', color: '#54a0ff' },
  { path: 'src/assets/images/trick_end.svg', text: 'Trick End', color: '#00d2d3' },
];

images.forEach(img => {
  const fullPath = path.resolve(__dirname, img.path);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, createSVG(img.text, img.color));
  console.log(`Created ${img.path}`);
});
