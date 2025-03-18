const formatter = new Intl.NumberFormat("en-US", {
  signDisplay: "exceptZero",
});

export function formatNumber(val: number): string {
  return formatter.format(val);
}
