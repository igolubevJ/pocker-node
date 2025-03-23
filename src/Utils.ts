export function ShuffleArray<T>(array: T[]) {
  return array.sort(() => Math.random() - 0.5);
}

export async function WaitForSecondsAsync(seconds: number): Promise<void> {
  return new Promise((res, rej) => {
    setTimeout(res, seconds * 1000);
  });
}

export function GetRandomElementFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
