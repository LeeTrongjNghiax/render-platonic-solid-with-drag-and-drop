const getSwappedMergedCombinations = (n, k) => {
  const result = [];

  const backtrack = (start, currentCombo) => {
    if (currentCombo.length === k) {
      // 1. Push the original combination
      result.push(...currentCombo);

      // 2. Push the version with the last two elements swapped (if k >= 2)
      if (k >= 2) {
        const swapped = [...currentCombo];
        const lastIdx = k - 1;
        const secondToLastIdx = k - 2;

        // Swap elements
        [swapped[lastIdx], swapped[secondToLastIdx]] = [swapped[secondToLastIdx], swapped[lastIdx]];

        result.push(...swapped);
      }
      return;
    }

    for (let i = start; i < n; i++) {
      currentCombo.push(i);
      backtrack(i + 1, currentCombo);
      currentCombo.pop();
    }
  }

  backtrack(0, []);
  return result;
}

export default getSwappedMergedCombinations;
