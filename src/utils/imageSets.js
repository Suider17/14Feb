export const GOOD_IMAGES = [
  'src/assets/images/trivia/g1.png', // Heart 1
  'src/assets/images/trivia/g2.jpg',
  'src/assets/images/trivia/g3.jpg',
  'src/assets/images/trivia/g4.jpg'
];

export const BAD_IMAGES = [
  'src/assets/images/trivia/b1.png', 
  'src/assets/images/trivia/b2.webp', 
  'src/assets/images/trivia/b3.webp', 
  'src/assets/images/trivia/b4.jpg', 
  'src/assets/images/trivia/b5.png'
];

export const GOOD_FACES = [
  '😊', '😍', '🥰', '💖'
];

export const BAD_FACES = [
  '😢', '😡', '😒', '💔'
];

export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
