"use client"

import { useEffect, useRef } from "react"

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Star properties
    const stars: {
      x: number
      y: number
      radius: number
      color: string
      opacity: number
      speed: number
      twinkleSpeed: number
      twinkleDirection: number
    }[] = []

    // Create stars
    const createStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 800)

      for (let i = 0; i < starCount; i++) {
        // Randomly choose star color
        const colorChoice = Math.random()
        let color

        if (colorChoice < 0.7) {
          // 70% white stars
          color = "rgba(255, 255, 255, 1)"
        } else if (colorChoice < 0.85) {
          // 15% blue stars
          color = "rgba(173, 216, 230, 1)"
        } else {
          // 15% yellow stars
          color = "rgba(255, 255, 224, 1)"
        }

        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          color,
          opacity: Math.random(),
          speed: Math.random() * 0.05,
          twinkleSpeed: 0.005 + Math.random() * 0.01,
          twinkleDirection: Math.random() > 0.5 ? 1 : -1,
        })
      }
    }

    createStars()

    // Animate stars
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        // Update star opacity for twinkling effect
        star.opacity += star.twinkleSpeed * star.twinkleDirection

        // Reverse direction if opacity reaches limits
        if (star.opacity >= 1 || star.opacity <= 0.2) {
          star.twinkleDirection *= -1
        }

        // Draw the star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)

        // Use the star's color with its current opacity
        const rgba = star.color.replace("1)", `${star.opacity})`)
        ctx.fillStyle = rgba

        // Add glow effect for brighter stars
        if (star.radius > 1) {
          ctx.shadowBlur = 10
          ctx.shadowColor = star.color
        } else {
          ctx.shadowBlur = 0
        }

        ctx.fill()

        // Move star
        star.y += star.speed

        // Reset star position if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

