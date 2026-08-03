export const startTracking = (pageName) => {
  const startTime = Date.now();

  return () => {
    const endTime = Date.now();

    const duration =
      (endTime - startTime) / 1000;

    const today = new Date();

    const day = today.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const usage =
      JSON.parse(localStorage.getItem("usage")) || {};

    if (!usage[day]) {
      usage[day] = {
        total: 0,
        pages: {},
      };
    }

    usage[day].total += duration;

    usage[day].pages[pageName] =
      (usage[day].pages[pageName] || 0) +
      duration;

    localStorage.setItem(
      "usage",
      JSON.stringify(usage)
    );
  };
};