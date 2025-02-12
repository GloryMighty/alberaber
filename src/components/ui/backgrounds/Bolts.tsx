"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const useAnimationCycle = (interval: number) => {
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCycle((prev) => prev + 1)
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  return cycle
}

const LightningCircle = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const animationCycle = useAnimationCycle(2000) // 2 seconds interval

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Lightning path data (main bolt and 2 branches)
  const lightningBolt = {
    main: "M 50 0 L 45 30 L 55 40 L 40 60 L 60 70 L 35 90 L 65 100 L 50 120",
    branch1: "M 55 40 L 65 35 L 70 45",
    branch2: "M 40 60 L 30 55 L 25 65",
  }

  const lightningVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: [1, 0.8, 0],
      transition: {
        duration: 0.5,
        delay: i * 0.0001,
        ease: [0.16, 0.77, 0.47, 0.97],
        opacity: { duration: 1.5, times: [0, 0.5, 1] },
      },
    }),
  }

  const numberOfBolts = 8
  const radius = Math.min(windowSize.width, windowSize.height) * 0.3

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <svg
        width={windowSize.width}
        height={windowSize.height}
        viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
        className="absolute"
      >
        {/* Glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[...Array(numberOfBolts)].map((_, index) => {
          const angle = (index / numberOfBolts) * 2 * Math.PI
          const centerX = windowSize.width / 2
          const centerY = windowSize.height / 2
          const x = centerX + radius * Math.cos(angle)
          const y = centerY + radius * Math.sin(angle)

          return (
            <g
              key={`${index}-${animationCycle}`}
              transform={`translate(${x}, ${y}) rotate(${(angle * 180) / Math.PI + 90})`}
            >
              {/* Main lightning bolt */}
              <motion.path
                d={lightningBolt.main}
                variants={lightningVariants}
                initial="hidden"
                animate="visible"
                key={`main-${animationCycle}`}
                custom={index}
                stroke="#7DF9FF"
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
                filter="url(#glow)"
              />

              {/* Branches */}
              <motion.path
                d={lightningBolt.branch1}
                variants={lightningVariants}
                initial="hidden"
                animate="visible"
                key={`branch1-${animationCycle}`}
                custom={index + 0.1}
                stroke="#7DF9FF"
                strokeWidth={1}
                strokeLinecap="round"
                fill="none"
                filter="url(#glow)"
              />

              <motion.path
                d={lightningBolt.branch2}
                variants={lightningVariants}
                initial="hidden"
                animate="visible"
                key={`branch2-${animationCycle}`}
                custom={index + 0.2}
                stroke="#7DF9FF"
                strokeWidth={1}
                strokeLinecap="round"
                fill="none"
                filter="url(#glow)"
              />
            </g>
          )
        })}
      </svg>

      {/* Flicker effect */}
      <motion.div
        className="absolute inset-0 bg-blue-200 opacity-0"
        animate={{
          opacity: [0, 0.1, 0],
        }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 0.2,
          times: [0, 0.1, 1],
        }}
      />
    </div>
  )
}

export default LightningCircle

