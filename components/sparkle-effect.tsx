"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface Sparkle {
  id: string
  createdAt: number
  size: number
  style: {
    top: string
    left: string
    zIndex: number
    opacity: number
    transform: string
  }
}

interface SparkleEffectProps {
  minSize?: number
  maxSize?: number
  count?: number
  speed?: number
  fadeOutSpeed?: number
  flicker?: boolean
}

export default function SparkleEffect({
  minSize = 10,
  maxSize = 20,
  count = 15,
  speed = 200,
  fadeOutSpeed = 1000,
  flicker = true,
}: SparkleEffectProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const prefersReducedMotion = false // For accessibility, could be implemented with a media query
  const containerRef = useRef<HTMLDivElement>(null)

  const generateSparkle = (x?: number, y?: number): Sparkle => {
    const container = containerRef.current
    const containerWidth = container?.offsetWidth || window.innerWidth
    const containerHeight = container?.offsetHeight || window.innerHeight

    const posX = x !== undefined ? x : Math.random() * containerWidth
    const posY = y !== undefined ? y : Math.random() * containerHeight

    return {
      id: String(Math.random()),
      createdAt: Date.now(),
      size: Math.floor(Math.random() * (maxSize - minSize) + minSize),
      style: {
        top: `${posY}px`,
        left: `${posX}px`,
        zIndex: 2,
        opacity: Math.random(),
        transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`,
      },
    }
  }

  // Create initial sparkles
  useEffect(() => {
    if (prefersReducedMotion) return

    const initialSparkles = Array.from({ length: count }, () => generateSparkle())
    setSparkles(initialSparkles)

    // Add random sparkles over time
    const interval = setInterval(() => {
      setSparkles((currentSparkles) => {
        // Remove old sparkles
        const now = Date.now()
        const filtered = currentSparkles.filter((sparkle) => now - sparkle.createdAt < fadeOutSpeed)

        // Add a new sparkle
        return [...filtered, generateSparkle()]
      })
    }, speed)

    return () => clearInterval(interval)
  }, [count, fadeOutSpeed, prefersReducedMotion, speed])

  // Add sparkle on click
  const addSparkleAtPoint = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return

    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setSparkles((currentSparkles) => [...currentSparkles, generateSparkle(x, y)])
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ top: "50px" }} // Start sparkles below the navbar
      onClick={addSparkleAtPoint}
    >
      {sparkles.map((sparkle) => (
        <SparkleInstance key={sparkle.id} size={sparkle.size} style={sparkle.style} flicker={flicker} />
      ))}
    </div>
  )
}

interface SparkleInstanceProps {
  size: number
  style: {
    top: string
    left: string
    zIndex: number
    opacity: number
    transform: string
  }
  flicker: boolean
}

function SparkleInstance({ size, style, flicker }: SparkleInstanceProps) {
  const [flickerClass, setFlickerClass] = useState("")

  useEffect(() => {
    if (flicker) {
      const flickerSpeed = Math.random() > 0.5 ? "animate-flicker-slow" : "animate-flicker-fast"
      setFlickerClass(flickerSpeed)
    }
  }, [flicker])

  return (
    <div
      className={`absolute inline-block animate-fade-in-out ${flickerClass}`}
      style={{
        ...style,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  )
}

