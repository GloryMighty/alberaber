"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useMousePosition } from "@/hooks/useMousePosition"
import Maze from "./Maze"

interface NeonMazeProps {
  width?: string
  height?: string
  text?: string
  href?: string
}

const NeonMaze: React.FC<NeonMazeProps> = ({ width = "w-96", height = "h-32", text = "DigiCard", href = "/index" }) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setCardPosition({ x: rect.left, y: rect.top })
    }
  }, [])

  const calculateRotation = () => {
    if (!isHovered) return { x: 0, y: 0 }
    const centerX = cardPosition.x + (cardRef.current?.offsetWidth || 0) / 2
    const centerY = cardPosition.y + (cardRef.current?.offsetHeight || 0) / 2
    const maxRotation = 10 // Maximum rotation in degrees

    const rotateY = ((mousePosition.x - centerX) / (cardRef.current?.offsetWidth || 1)) * maxRotation
    const rotateX = ((centerY - mousePosition.y) / (cardRef.current?.offsetHeight || 1)) * maxRotation

    return { x: rotateX, y: rotateY }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative mx-4 ${width} ${height} rounded overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={calculateRotation()}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-50"
        animate={{
          background: isHovered
            ? [
                "linear-gradient(90deg, #ff00ff, #00ffff)",
                "linear-gradient(90deg, #ffff00, #00ff00)",
                "linear-gradient(90deg, #ff00ff, #00ffff)",
              ]
            : "linear-gradient(90deg, #ff00ff, #00ffff)",
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
      <div className="absolute inset-0 overflow-hidden">
        <Maze />
      </div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ backfaceVisibility: "hidden" }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <a href={href} className="block w-full h-full flex items-center justify-center">
          <span className="text-3xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] animated-gradient-title">{text}</span>
        </a>
      </motion.div>
    </motion.div>
  )
}

export default NeonMaze
