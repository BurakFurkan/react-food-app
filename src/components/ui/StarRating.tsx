interface StarRatingProps {
  value: number
  max?: number
  size?: number
}

export function StarRating({ value, max = 5, size = 15 }: StarRatingProps) {
  return (
    <div className="flex items-center" aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(value)
        const half   = !filled && i < value
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className="flex-shrink-0"
          >
            <defs>
              {half && (
                <linearGradient id={`half-${i}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="var(--accent)" />
                  <stop offset="50%" stopColor="var(--border)" />
                </linearGradient>
              )}
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01z"
              fill={filled ? 'var(--accent)' : half ? `url(#half-${i})` : 'var(--border)'}
              stroke="none"
            />
          </svg>
        )
      })}
    </div>
  )
}
