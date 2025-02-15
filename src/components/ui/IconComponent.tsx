import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface IconComponentProps {
  icon: LucideIcon
  label: string
  onHover: () => void
  onLeave: () => void
}

export default function IconComponent({ icon: Icon, label, onHover, onLeave }: IconComponentProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center cursor-pointer"
      whileHover={{ scale: 1.05 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 w-48 h-48
                   shadow-[-20px_20px_60px_rgba(0,0,0,0.5)] drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]
                   flex flex-col items-center justify-center space-y-4
                   border border-gray-700"
        whileHover={{
          boxShadow: "-30px 30px 100px rgba(0,0,0,0.7)",
          borderColor: "rgba(59, 130, 246, 0.5)",
        }}
      >
        <motion.div
          className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-4"
          whileHover={{ scale: 1.1 }}
        >
          <Icon className="w-12 h-12 text-white" />
        </motion.div>
        <motion.span 
          className="text-transparent bg-clip-text neon-title text-xl font-bold block text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
