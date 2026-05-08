'use client'

import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/userStore'

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

export function MainChart() {
  const { t }    = useTranslation()
  const { meals, userName } = useUserStore((s) => ({ meals: s.meals, userName: s.userName }))

  // Aggregate ingredient counts across all meals
  const ingredientMap = new Map<string, number>()
  meals.forEach((meal) => {
    meal.ingredients.forEach((ing) => {
      ingredientMap.set(ing.name, (ingredientMap.get(ing.name) ?? 0) + 1)
    })
  })
  const labels = Array.from(ingredientMap.keys())
  const counts = Array.from(ingredientMap.values())

  const chartData = {
    labels,
    datasets: [{
      label: t('overall nutrients'),
      data: counts,
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
      title:  { display: true, text: t('overall nutrients') },
    },
  }

  return (
    <div className="w-full rounded-[10px] bg-surface shadow-theme-md z-[55] sticky top-0
                    flex text-text flex-1 max-[992px]:flex-col max-[992px]:items-center max-[992px]:p-[5px]">
      {/* User info */}
      <div className="flex-1 h-full rounded-tl-[10px] rounded-bl-[10px] flex flex-col gap-4
                      items-start justify-start text-primary p-4 font-display
                      max-[768px]:h-[85px] max-[768px]:flex-row max-[768px]:items-start
                      max-[768px]:justify-center max-[768px]:gap-2 max-[768px]:p-[5px]">
        <h1 className="pl-10 text-primary max-[768px]:pl-0">{t('welcome')}</h1>
        <h1 className="pl-10 text-primary max-[768px]:pl-0">{userName}</h1>
      </div>

      {/* Label */}
      <div className="flex-1 flex flex-col items-center justify-center text-center pr-8
                      relative text-primary
                      before:content-[''] before:absolute before:left-0 before:h-[80%] before:w-px before:bg-text
                      after:content-['']  after:absolute after:right-0 after:h-[80%] after:w-px after:bg-text
                      max-[768px]:flex-row max-[768px]:gap-2 max-[768px]:p-0 max-[768px]:pr-0
                      max-[768px]:before:w-full max-[768px]:before:h-px max-[768px]:before:top-[-5px] max-[768px]:before:left-0
                      max-[768px]:after:w-full  max-[768px]:after:h-px  max-[768px]:after:bottom-[-5px] max-[768px]:after:left-0">
        <h1>{t('overall')}</h1>
        <h1>{t('nutrients')}</h1>
      </div>

      {/* Chart */}
      {meals.length > 0 && (
        <div className="flex-[3] w-full h-full rounded-tr-[10px] rounded-br-[10px]
                        flex items-center justify-center p-[10px]">
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  )
}
