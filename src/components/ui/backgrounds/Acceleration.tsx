"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const LightningBackground: React.FC = () => {
  const [bolts, setBolts] = useState<{ id: number; path: string }[]>([])

  useEffect(() => {
    const createBolt = () => {
      const id = Date.now()
      const startX = Math.random() * window.innerWidth
      const endX = startX + (Math.random() - 0.5) * 200
      const startY = window.innerHeight  // Start from bottom
      const endY = 0  // End at top
      const midX = startX + (endX - startX) * 0.5 + (Math.random() - 0.5) * 150
      const midY = startY * 0.5 + (Math.random() - 0.5) * 150

      const path = `M${startX},${startY} Q${midX},${midY} ${endX},${endY}`

      setBolts((prevBolts) => [...prevBolts, { id, path }])

      setTimeout(() => {
        setBolts((prevBolts) => prevBolts.filter((bolt) => bolt.id !== id))
      }, 300)  // Slightly longer duration
    }

    const interval = setInterval(createBolt, 800)  // Slower interval
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-gray-900 overflow-hidden">
      <svg className="w-full h-full">
        <AnimatePresence>
          {bolts.map((bolt) => (
            <motion.path
              key={bolt.id}
              d={bolt.path}
              stroke="#00FFFF"
              strokeWidth="8"  // Slightly thinner
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0, 1, 0.5],  // More dynamic opacity
                strokeWidth: [8, 12, 8]  // Pulsating effect
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
          ))}
        </AnimatePresence>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-900 pointer-events-none" />
    </div>
  )
}

export default LightningBackground
