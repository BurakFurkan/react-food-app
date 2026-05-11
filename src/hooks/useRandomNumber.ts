import { useRef } from 'react'

export function useRandomNumber(min: number, max: number): number {
  const ref = useRef<number | null>(null)
  if (ref.current === null) {
    ref.current = Math.floor(Math.random() * (max - min + 1)) + min
  }
  return ref.current
}
