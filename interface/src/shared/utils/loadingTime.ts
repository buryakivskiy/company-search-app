/**
 * Ensures minimum loading time for UI feedback
 * Useful for showing spinners/loaders for at least the specified duration
 * 
 * @param startTime - Timestamp when operation started (Date.now())
 * @param minTime - Minimum loading time in milliseconds (default: 500)
 * @returns Promise that resolves when minimum time has elapsed
 */
export async function ensureMinimumLoadingTime(startTime: number, minTime: number = 500): Promise<void> {
  const elapsedTime = Date.now() - startTime;
  const remainingTime = minTime - elapsedTime;
  
  if (remainingTime > 0) {
    await new Promise(resolve => setTimeout(resolve, remainingTime));
  }
}
