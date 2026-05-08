import { useMemo } from 'react'

export function useRandomNumber(min: number, max: number): number {
  return useMemo(
    () => Math.floor(Math.random() * (max - min + 1)) + min,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [min, max],
  )
}
