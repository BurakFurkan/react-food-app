'use client'

import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import type { Meal } from '@/types'
const PLACEHOLDER = '/images/placeholder.png'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BG_COLORS = [
  'rgba(255,99,132,0.2)','rgba(255,159,64,0.2)','rgba(255,205,86,0.2)',
  'rgba(75,192,192,0.2)','rgba(54,162,235,0.2)','rgba(153,102,255,0.2)',
  'rgba(201,203,207,0.2)',
]
const BORDER_COLORS = [
  'rgb(255,99,132)','rgb(255,159,64)','rgb(255,205,86)',
  'rgb(75,192,192)','rgb(54,162,235)','rgb(153,102,255)',
  'rgb(201,203,207)',
]

interface Props { meal: Meal }

export function MealChart({ meal }: Props) {
  const labels = meal.ingredients.map((i) => i.name)
  const data   = meal.ingredients.map((_, idx) => idx + 1)

  const chartData = {
    labels,
    datasets: [{
      label: meal.title,
      data,
      backgroundColor: labels.map((_, i) => BG_COLORS[i % BG_COLORS.length]),
      borderColor:     labels.map((_, i) => BORDER_COLORS[i % BORDER_COLORS.length]),
      borderWidth: 1,
    }],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title:  { display: true, text: meal.title },
    },
  }

  return (
    <div className="w-full h-[200px] rounded-[10px] bg-surface shadow-theme-md flex text-[#777785] flex-1
                    max-[992px]:flex-col max-[992px]:items-center max-[992px]:justify-center max-[992px]:p-[5px]">
      {/* Thumb */}
      <div className="flex-1 h-full rounded-tl-[10px] rounded-bl-[10px] flex flex-col gap-4
                      items-center justify-center p-4 max-[768px]:h-1/2">
        <img
          src={meal.images[0]}
          alt={meal.title}
          className="w-full h-auto rounded-[30%] object-cover max-[768px]:w-[45%]"
          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
        />
      </div>

      {/* Title */}
      <div className="flex-1 flex flex-col items-center justify-center text-center relative font-display
                      pr-8 text-text-secondary
                      before:content-[''] before:absolute before:left-0 before:h-[80%] before:w-px before:bg-text
                      after:content-['']  after:absolute after:right-0 after:h-[80%] after:w-px after:bg-text
                      max-[992px]:text-[0.8rem]
                      max-[992px]:before:w-[80%] max-[992px]:before:h-px max-[992px]:before:top-0 max-[992px]:before:left-[10%]
                      max-[992px]:after:w-[80%]  max-[992px]:after:h-px  max-[992px]:after:bottom-0 max-[992px]:after:left-[10%]">
        <h1 className="text-lg font-semibold">{meal.title}</h1>
      </div>

      {/* Chart */}
      <div className="flex-[3] w-full rounded-tr-[10px] rounded-br-[10px] flex items-center justify-center p-[10px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}
