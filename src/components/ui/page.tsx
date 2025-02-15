"use client"

import { useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import { MessageSquare, Calendar, Brain } from "lucide-react"
import IconComponent from "./components/IconComponent"
import InteractiveBackground from "./components/InteractiveBackground"

export default function Home() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-950" onMouseMove={handleMouseMove}>
      <InteractiveBackground mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-24">
          <IconComponent
            icon={MessageSquare}
            label="Messages"
            onHover={() => setHoveredIcon("Messages")}
            onLeave={() => setHoveredIcon(null)}
          />
          <IconComponent
            icon={Calendar}
            label="Events"
            onHover={() => setHoveredIcon("Events")}
            onLeave={() => setHoveredIcon(null)}
          />
          <IconComponent
            icon={Brain}
            label="AI"
            onHover={() => setHoveredIcon("AI")}
            onLeave={() => setHoveredIcon(null)}
          />
        </div>
      </div>
      {hoveredIcon && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-10 backdrop-blur-md px-6 py-3 rounded-full text-white font-semibold"
        >
          {hoveredIcon}
        </motion.div>
      )}
    </div>
  )
}

