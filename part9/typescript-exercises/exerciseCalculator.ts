interface exerciseData {
  dailyHours: number[];
  target: number;
}

const parseExerciseArguments = (args: string[]): exerciseData => {
  const [_x, _y, targetString, ...hoursArray] = args;
  if (isNaN(Number(targetString)))
    throw new Error("Provided target is not a number!");
  const target = Number(targetString);

  let dailyHours: number[] = [];
  for (const hours of hoursArray) {
    if (isNaN(Number(hours)))
      throw new Error("Provided hours contained a non-number!");
    dailyHours.push(Number(hours));
  }

  return {
    dailyHours,
    target,
  };
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): Result => {
  let periodLength = 0;
  let trainingDays = 0;
  let totalHours = 0;
  for (const hours of dailyHours) {
    periodLength += 1;
    if (hours > 0) {
      trainingDays += 1;
      totalHours += hours;
    }
  }

  let success: boolean;
  let rating: number;
  let ratingDescription: string;
  let average = totalHours / periodLength;
  if (average < 0.5 * target) {
    success = false;
    rating = 1;
    ratingDescription = "needs improvement";
  } else if (average >= 0.5 * target && average < target) {
    success = false;
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    success = true;
    rating = 3;
    ratingDescription = "target reached, good job!";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyHours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
