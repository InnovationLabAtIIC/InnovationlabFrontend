'use client'

import { cn } from '@/lib/utils'
import React from 'react'

type GridMProps = {
  config?: (0 | 1)[][] | (0 | 1)[] // accept 2D or flat
  size?: number // cell size in px
} & React.HTMLAttributes<HTMLDivElement>

export const GridM: React.FC<GridMProps> = ({ config = [[0]], size = 64, ...props }) => {
  // normalize config: if user passed a flat array, convert to 1-row 2D array
  const matrix: (0 | 1)[][] = Array.isArray(config[0])
    ? (config as (0 | 1)[][])
    : [config as (0 | 1)[]]

  // compute cols as max row length to handle uneven rows
  const cols = Math.max(...matrix.map(r => r.length), 1)
  const rows = Math.max(matrix.length, 1)

  // pad each row to 'cols' with 0 so flattened map is rectangular
  const padded = matrix.map(row => {
    if (row.length === cols) return row
    return [...row, ...new Array(cols - row.length).fill(0)] as (0 | 1)[]
  })

  const flattened = padded.flat()

  const colors = ['bg-primary/100', 'bg-primary/80', 'bg-primary/70']

  return (
    <div {...props}>
      <div
        className={cn('grid')}
        style={{
          // reliable grid sizing that doesn't rely on Tailwind dynamic classes
          gridTemplateColumns: `repeat(${cols}, ${size}px)`,
          gridTemplateRows: `repeat(${rows}, ${size}px)`,
          gap: '0px'
        }}
      >
        {flattened.map((val, index) => {
          const color = colors[index % colors.length]
          return (
            <div
              key={index}
              className={cn(val === 1 ? color : 'bg-transparent', 'flex items-center justify-center')}
              style={{
                width: `${size}px`,
                height: `${size}px`
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
