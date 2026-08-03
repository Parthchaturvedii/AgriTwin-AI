function ModuleUsage() {
  const modules = [
    { name: "Dashboard", value: 35 },
    { name: "Digital Twin", value: 24 },
    { name: "Disease Detection", value: 18 },
    { name: "Weather", value: 12 },
    { name: "Farm Management", value: 8 },
    { name: "AI Advisor", value: 3 },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold text-green-700">
        🚜 Module Usage
      </h2>

      <div className="space-y-5">

        {modules.map((item) => (

          <div key={item.name}>

            <div className="mb-2 flex justify-between">

              <span className="font-medium">
                {item.name}
              </span>

              <span className="font-bold text-green-700">
                {item.value}%
              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-200">

              <div
                className="h-3 rounded-full bg-green-600"
                style={{
                  width: `${item.value}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ModuleUsage;