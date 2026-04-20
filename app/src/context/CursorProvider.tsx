'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

interface CursorContextValue {
  setHoverLabel: (label: string | null) => void
}

const CursorContext = createContext<CursorContextValue>({ setHoverLabel: () => {} })

export function useCursor() {
  return useContext(CursorContext)
}

export default function CursorProvider({ children }: { children: React.ReactNode }) {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hoverLabel, setHoverLabel] = useState<string | null>(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
      }
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      const lerp = 0.12
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp
      if (ringRef.current) {
        const size = hoverLabel ? 72 : 36
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [hoverLabel])

  const isExpanded = !!hoverLabel

  return (
    <CursorContext.Provider value={{ setHoverLabel }}>
      {children}
      {/* Only show on non-touch devices */}
      <div className="pointer-events-none fixed inset-0 z-[9999] select-none mix-blend-difference" aria-hidden="true">
        {/* Dot */}
        <div
          ref={dotRef}
          className="absolute w-[6px] h-[6px] rounded-full bg-white"
          style={{ top: 0, left: 0, willChange: 'transform' }}
        />
        {/* Ring */}
        <div
          ref={ringRef}
          className={`absolute rounded-full flex items-center justify-center transition-[width,height,background-color] duration-200 ${
            isExpanded
              ? 'w-[72px] h-[72px] bg-white'
              : 'w-[36px] h-[36px] bg-transparent border border-white'
          }`}
          style={{ top: 0, left: 0, willChange: 'transform' }}
        >
          {isExpanded && hoverLabel && (
            <span className="text-black font-sans text-[0.48rem] uppercase tracking-widest-2 leading-none">
              {hoverLabel}
            </span>
          )}
        </div>
      </div>
    </CursorContext.Provider>
  )
}
