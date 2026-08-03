import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  icon,
  color = "text-green-600",
  bgColor = "bg-green-100",
  subtitle,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
    >
      <div className="flex items-start justify-between">

        <div className="flex-1">

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-gray-800 mt-3">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-gray-500">
              {subtitle}
            </p>
          )}

        </div>

        <div
          className={`w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center ${color} shadow-sm`}
        >
          {icon}
        </div>

      </div>
    </motion.div>
  );
}

export default StatCard;