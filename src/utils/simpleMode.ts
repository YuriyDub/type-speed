export function hasNoMoreThanNConsecutiveDifferentChars(
  str1: string,
  str2: string,
  n: number
): boolean {
  let consecutiveCount = 0;
  for (let i = 0; i < str2.length; i++) {
    if (str2[i] !== str1[i]) {
      consecutiveCount++;
    } else {
      consecutiveCount = 0;
    }
  }

  if (consecutiveCount > n) {
    return false;
  } else {
    return true;
  }
}
