"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface SparkleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export default function SparkleButton({ children, onClick, className = "", disabled = false }: SparkleButtonProps) {
  const [isHovering, setIsHovering] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [sparkles, setSparkles] = useState<{ id: string; x: number; y: number; size: number }[]>([])

  // Add sparkles on hover
  useEffect(() => {
    if (!isHovering || disabled) return

    const button = buttonRef.current
    if (!button) return

    const interval = setInterval(() => {
      const buttonRect = button.getBoundingClientRect()
      const x = Math.random() * buttonRect.width
      const y = Math.random() * buttonRect.height

      setSparkles((current) => [
        ...current.slice(-5), // Keep only the last 5 sparkles
        {
          id: Math.random().toString(),
          x,
          y,
          size: Math.random() * 6 + 2,
        },
      ])
    }, 300)

    return () => clearInterval(interval)
  }, [isHovering, disabled])

  // Remove sparkles after animation
  useEffect(() => {
    if (sparkles.length === 0) return

    const timeout = setTimeout(() => {
      setSparkles((current) => current.slice(1))
    }, 1000)

    return () => clearTimeout(timeout)
  }, [sparkles])

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}

      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="absolute pointer-events-none animate-fade-in-out"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
              fill={disabled ? "#666666" : "#FFFFFF"}
            />
          </svg>
        </span>
      ))}
    </button>
  )
}

