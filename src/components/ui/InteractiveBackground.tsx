import { motion, type MotionValue, useTransform } from "framer-motion"

interface InteractiveBackgroundProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

export default function InteractiveBackground({ mouseX, mouseY }: InteractiveBackgroundProps) {
  const background = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]) =>
      `radial-gradient(600px at ${latestX}px ${latestY}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
  )

  return (
    <motion.div className="absolute inset-0 bg-[linear-gradient(to_right,#000000,#1a1a2e)]" style={{ background }}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMjIyIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20" />
    </motion.div>
  )
}

