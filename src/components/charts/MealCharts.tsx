'use client'

import { useUserStore } from '@/store/userStore'
import { MealChart } from './MealChart'

export function MealCharts() {
  const meals = useUserStore((s) => s.meals)

  if (meals.length === 0) return null

  return (
    <div className="w-full flex-[3] flex flex-col items-center justify-center gap-4">
      {meals.map((meal) => (
        <MealChart key={meal.id} meal={meal} />
      ))}
    </div>
  )
}
