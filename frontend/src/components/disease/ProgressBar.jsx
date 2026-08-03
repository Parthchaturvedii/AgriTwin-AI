function ProgressBar({ value }) {
  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between">
        <span className="font-semibold">
          Confidence
        </span>

        <span className="font-bold text-green-700">
          {value}%
        </span>
      </div>

      <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-700"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;