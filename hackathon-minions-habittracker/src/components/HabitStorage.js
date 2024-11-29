import moment from 'moment';


export const loadHabits = (userId, currentDate) => {
  const storedData = JSON.parse(localStorage.getItem("habitTrackerData")) || { userHabits: [] };

  if (!Array.isArray(storedData.userHabits)) {
    storedData.userHabits = [];
  }

  const user = storedData.userHabits.find((u) => u.userId === userId);

  const defaultHabits = [
    { id: 1, name: "Exercise", progress: Array(7).fill("Select"), options: ["Select", "More than 30 mins", "30 mins", "Less than 30 mins"] },
    { id: 2, name: "Sleep", progress: Array(7).fill("Select"), options: ["Select", "4 hours", "6 hours", "8 hours", "10 hours", "12 hours"] },
    { id: 3, name: "Early Dinner", progress: Array(7).fill("Select"), options: ["Select", "Before 7:30", "Before 8:30", "After 9"] },
    { id: 4, name: "Water Intake", progress: Array(7).fill("Select"), options: ["Select", "1 Liter", "2 Liters", "3 Liters", "4 Liters", "5 Liters"] },
    { id: 5, name: "Tech-Free Hours", progress: Array(7).fill("Select"), options: ["Select", "Yes", "No"] },
  ];

  if (user) {
    const dateHabits = user.dailyHabits.find((day) => day.date === currentDate);
    if (dateHabits) {
   
      return defaultHabits.map((defaultHabit) => {
        const storedHabit = dateHabits.habits.find((habit) => habit.id === defaultHabit.id);

        if (storedHabit) {
    
          const progressArray = Array(7)
            .fill("Select")
            .map((_, index) => {
              const dateKey = moment(currentDate).startOf("week").add(index, "days").format("YYYY-MM-DD");
              return storedHabit.progress[dateKey] || "Select";
            });

          return { ...defaultHabit, progress: progressArray };
        }

        return defaultHabit;
      });
    }
  }

  return defaultHabits;
};




export const saveHabits = (userId, currentDate, habits) => {
    // Fetch existing data from localStorage or initialize an empty structure
    const storedData = JSON.parse(localStorage.getItem("habitTrackerData")) || { userHabits: [] };

    // Ensure userHabits exists
    if (!Array.isArray(storedData.userHabits)) {
      storedData.userHabits = [];
    }

    // Find the user index
    const userIndex = storedData.userHabits.findIndex((u) => u.userId === userId);

    // Map each habit to include progress as a key-value pair
    const dayData = {
      date: currentDate,
      habits: habits.map((habit) => ({
        id: habit.id,
        name: habit.name,
        progress: habit.progress.reduce((acc, value, index) => {
          const progressDate = moment(currentDate).startOf("week").add(index, "days").format("YYYY-MM-DD");
          acc[progressDate] = value; // Set date as key and progress as value
          return acc;
        }, {}),
      })),
    };

    if (userIndex >= 0) {
      // Update existing user
      const user = storedData.userHabits[userIndex];
      const dayIndex = user.dailyHabits.findIndex((day) => day.date === currentDate);

      if (dayIndex >= 0) {
        // Update habits for the specific date
        user.dailyHabits[dayIndex] = dayData;
      } else {
        // Add new date's habits
        user.dailyHabits.push(dayData);
      }
    } else {
      // Add a new user with their habits
      storedData.userHabits.push({
        userId,
        name: "John Doe", 
        dailyHabits: [dayData],
      });
    }

    // Save updated data back to localStorage
    localStorage.setItem("habitTrackerData", JSON.stringify(storedData));
};



