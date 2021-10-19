export function* NextMessageGenerator() {
  const a: number = yield 3;
  yield a * 2;
}
