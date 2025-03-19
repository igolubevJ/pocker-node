export function ShuffleArray<T>(array: T[]) {
  return array.sort(() => Math.random() - 0.5);
}
