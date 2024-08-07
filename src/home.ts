// Enums and Interfaces
enum Timeframe {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
}

interface TimeframeData {
  current: number;
  previous: number;
}

interface Timeframes {
  [Timeframe.Daily]: TimeframeData;
  [Timeframe.Weekly]: TimeframeData;
  [Timeframe.Monthly]: TimeframeData;
}

interface Activity {
  title: string;
  timeframes: Timeframes;
}

// Global state
let currentTimeframe: Timeframe = Timeframe.Weekly;
let activityData: Activity[] = [];

// Fetch data function
async function fetchData(): Promise<Activity[]> {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Update dashboard function
function updateDashboard(data: Activity[], timeframe: Timeframe) {
  if (!data || data.length === 0) {
    displayError("No data available");
    return;
  }

  const currentHours = document.querySelectorAll<HTMLHeadingElement>(
    ".dashboard__miniCard__card__hours"
  );
  const previousHours = document.querySelectorAll<HTMLHeadingElement>(
    ".dashboard__miniCard__card__lastWeek"
  );

  currentHours.forEach((current) => {
    const activityName = current.getAttribute("data-activity");
    if (activityName) {
      const activity = data.find((activity) => activity.title === activityName);
      if (activity) {
        current.textContent = `${
          activity.timeframes[timeframe]?.current ?? 0
        }hrs`;
      }
    }
  });

  previousHours.forEach((current) => {
    const activityName = current.getAttribute("data-previous-activity");
    if (activityName) {
      const activity = data.find((activity) => activity.title === activityName);
      if (activity) {
        current.textContent = `Last ${getTimeframeText(timeframe)} - ${
          activity.timeframes[timeframe]?.previous ?? 0
        }hrs`;
      }
    }
  });
}

// Helper function to get timeframe text
function getTimeframeText(timeframe: Timeframe): string {
  switch (timeframe) {
    case Timeframe.Daily:
      return "Day";
    case Timeframe.Weekly:
      return "Week";
    case Timeframe.Monthly:
      return "Month";
  }
}

// Set timeframe function
function setTimeframe(timeframe: Timeframe) {
  currentTimeframe = timeframe;
  updateDashboard(activityData, currentTimeframe);
}

// Display error function
function displayError(message: string) {
  const errorElement = document.getElementById("error");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

// Main execution
document.addEventListener("DOMContentLoaded", async () => {
  try {
    activityData = await fetchData();
    console.log(activityData);
    updateDashboard(activityData, currentTimeframe);

    const timeframeButtons = document.querySelectorAll<HTMLElement>(
      '[id^="daily"], [id^="weekly"], [id^="monthly"]'
    );
    timeframeButtons.forEach((button) => {
      button.addEventListener("click", () =>
        setTimeframe(button.id as Timeframe)
      );
    });
  } catch (error) {
    displayError("Failed to load data");
  }
});
