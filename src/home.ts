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
    const response = await fetch(`${import.meta.env.BASE_URL}data.json`);
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
    ".dashboard__miniCard__container__info__hours"
  );
  const previousHours = document.querySelectorAll<HTMLHeadingElement>(
    ".dashboard__miniCard__container__info__prev__hours"
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
function setTimeframe(timeframe: Timeframe, clickedButton: HTMLElement) {
  currentTimeframe = timeframe;
  updateDashboard(activityData, currentTimeframe);
  updateActiveButton(clickedButton);
}

// Apply dynamic styling to cliked links
function updateActiveButton(clickedLink: HTMLElement) {
  const buttons = document.querySelectorAll<HTMLElement>(
    '[id^="daily"], [id^="weekly"], [id^="monthly"]'
  );
  buttons.forEach((button) => {
    button.classList.remove("color-white");
  });
  clickedLink.classList.add("color-white");
}

// Display error function
function displayError(message: string) {
  alert("Error : " + message);
}

// Main execution
document.addEventListener("DOMContentLoaded", async () => {
  try {
    activityData = await fetchData();
    updateDashboard(activityData, currentTimeframe);

    const timeframeLinks = document.querySelectorAll<HTMLElement>(
      '[id^="daily"], [id^="weekly"], [id^="monthly"]'
    );
    timeframeLinks.forEach((link) => {
      link.addEventListener("click", () =>
        setTimeframe(link.id as Timeframe, link)
      );
    });

    //Apply activ link default styling
    const weeklyButton = document.getElementById("weekly");
    if (weeklyButton) {
      updateActiveButton(weeklyButton);
    }
  } catch (error) {
    displayError("Failed to load data");
  }
});
