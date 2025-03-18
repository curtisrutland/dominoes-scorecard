export function zip<TA, TB>(a: TA[], b: TB[]): [TA, TB][] {
  return a.map((k, idx) => [k, b[idx]]);
}
