export default function getRandomScale(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
