"use client"

import React from "react"
import { motion } from "framer-motion"

const ConnectionAnimation: React.FC = () => {
  const dots = [
    { x: "10%", y: "20%" },
    { x: "30%", y: "70%" },
    { x: "50%", y: "30%" },
    { x: "70%", y: "60%" },
    { x: "90%", y: "40%" },
  ]

  return (
    <div className="relative w-full h-full overflow-hidden">
      {dots.map((dot, index) => (
        <React.Fragment key={index}>
          <motion.div
            className="absolute w-3 h-3 bg-blue-500 rounded-full"
            style={{ left: dot.x, top: dot.y }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          {dots.slice(index + 1).map((endDot, endIndex) => (
            <motion.div
              key={`line-${index}-${endIndex}`}
              className="absolute bg-blue-300 origin-left"
              style={{
                left: dot.x,
                top: dot.y,
                width: `calc(${Number.parseFloat(endDot.x) - Number.parseFloat(dot.x)}%)`,
                height: "2px",
                transformOrigin: "left center",
              }}
              animate={{
                rotate: [
                  0,
                  Math.atan2(
                    Number.parseFloat(endDot.y) - Number.parseFloat(dot.y),
                    Number.parseFloat(endDot.x) - Number.parseFloat(dot.x),
                  ) *
                    (180 / Math.PI),
                ],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ConnectionAnimation

