
import { UserProfile } from "@/contexts/OnboardingContext";

// Types for workout generation
export type Exercise = {
  name: string;
  sets: number;
  reps: string;
  restTime: string;
  description: string;
  equipment: string[];
  targetMuscle: string;
  imageUrl?: string;
};

export type Workout = {
  id: string;
  title: string;
  description: string;
  duration: string;
  intensity: "Easy" | "Medium" | "Hard";
  category: string;
  exercises: Exercise[];
  imageUrl?: string;
};

// Sample image URLs for different workout types
const workoutImages = {
  strength: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=3270&auto=format&fit=crop",
  cardio: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=3270&auto=format&fit=crop",
  yoga: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=3270&auto=format&fit=crop",
  hiit: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=3269&auto=format&fit=crop",
  flexibility: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=3270&auto=format&fit=crop",
  core: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=3270&auto=format&fit=crop",
};

// This function would normally call an AI API, but for now it generates workouts based on user profile
export const generateWorkouts = (userProfile: UserProfile): Workout[] => {
  const { fitnessLevel, fitnessGoals, preferredWorkouts, availableEquipment } = userProfile;
  
  let intensity: "Easy" | "Medium" | "Hard";
  switch(fitnessLevel) {
    case "Beginner":
      intensity = "Easy";
      break;
    case "Intermediate":
      intensity = "Medium";
      break;
    case "Advanced":
      intensity = "Hard";
      break;
    default:
      intensity = "Medium";
  }
  
  // Generate different types of workouts based on user preferences
  const workouts: Workout[] = [];
  
  // Add a strength workout if they prefer it
  if (preferredWorkouts.includes("strength")) {
    workouts.push(generateStrengthWorkout(intensity, availableEquipment));
  }
  
  // Add a cardio workout if they prefer it
  if (preferredWorkouts.includes("cardio")) {
    workouts.push(generateCardioWorkout(intensity));
  }
  
  // Add a HIIT workout if they prefer it
  if (preferredWorkouts.includes("hiit")) {
    workouts.push(generateHiitWorkout(intensity, availableEquipment));
  }
  
  // Add yoga or pilates for flexibility
  if (preferredWorkouts.includes("yoga") || preferredWorkouts.includes("pilates")) {
    workouts.push(generateYogaWorkout(intensity));
  }
  
  // If no specific preference or not enough workouts, add general workouts
  if (workouts.length < 3) {
    if (!workouts.some(w => w.category === "Strength")) {
      workouts.push(generateStrengthWorkout(intensity, availableEquipment));
    }
    if (!workouts.some(w => w.category === "Cardio")) {
      workouts.push(generateCardioWorkout(intensity));
    }
  }
  
  // Add goal-specific workouts
  if (fitnessGoals.includes("weight-loss") && !workouts.some(w => w.category === "HIIT")) {
    workouts.push(generateHiitWorkout(intensity, availableEquipment));
  }
  
  if (fitnessGoals.includes("flexibility") && !workouts.some(w => w.category === "Yoga")) {
    workouts.push(generateYogaWorkout(intensity));
  }
  
  return workouts;
};

// Generate a strength workout
const generateStrengthWorkout = (intensity: "Easy" | "Medium" | "Hard", equipment: string[]): Workout => {
  const hasEquipment = !equipment.includes("no-equipment");
  const hasDumbbells = equipment.includes("dumbbells");
  const hasKettlebells = equipment.includes("kettlebells");
  const hasBench = equipment.includes("bench");
  const hasGym = equipment.includes("full-gym");
  
  const exercises: Exercise[] = [];
  
  // Push-based exercises
  if (hasGym) {
    exercises.push({
      name: "Bench Press",
      sets: intensity === "Easy" ? 3 : intensity === "Medium" ? 4 : 5,
      reps: intensity === "Easy" ? "10" : intensity === "Medium" ? "8-10" : "6-8",
      restTime: "90 seconds",
      description: "Lie on a bench, grip the bar slightly wider than shoulder-width, lower to chest and press back up.",
      equipment: ["barbell", "bench"],
      targetMuscle: "chest"
    });
  } else if (hasDumbbells && hasBench) {
    exercises.push({
      name: "Dumbbell Bench Press",
      sets: intensity === "Easy" ? 3 : intensity === "Medium" ? 4 : 5,
      reps: intensity === "Easy" ? "12" : intensity === "Medium" ? "10-12" : "8-10",
      restTime: "90 seconds",
      description: "Lie on a bench with dumbbells at chest level, press up until arms are extended.",
      equipment: ["dumbbells", "bench"],
      targetMuscle: "chest"
    });
  } else if (hasDumbbells) {
    exercises.push({
      name: "Floor Dumbbell Press",
      sets: intensity === "Easy" ? 3 : intensity === "Medium" ? 4 : 5,
      reps: intensity === "Easy" ? "12" : intensity === "Medium" ? "10-12" : "8-10",
      restTime: "90 seconds",
      description: "Lie on the floor with dumbbells at chest level, press up until arms are extended.",
      equipment: ["dumbbells"],
      targetMuscle: "chest"
    });
  } else {
    exercises.push({
      name: "Push-ups",
      sets: intensity === "Easy" ? 3 : intensity === "Medium" ? 4 : 5,
      reps: intensity === "Easy" ? "8-10" : intensity === "Medium" ? "12-15" : "15-20",
      restTime: "60 seconds",
      description: "Place hands shoulder-width apart, lower body until chest nearly touches floor, push back up.",
      equipment: [],
      targetMuscle: "chest"
    });
  }
  
  // Pull-based exercises
  if (hasGym) {
    exercises.push({
      name: "Barbell Rows",
      sets: intensity === "Easy" ? 3 : intensity === "Medium" ? 4 : 5,
      reps: intensity === "Easy" ? "10" : intensity === "Medium" ? "8-10" : "6-8",
      restTime: "90 seconds",
      description: "Bend at hips with slight knee bend, pull barbell to lower chest, lower with control.",
      equipment: ["barbell"],
      targetMuscle: "back"
    });
  } else if (hasDumbbells) {
    exercises.push({
      name: "Dumbbell Rows",
      sets: intensity === "Easy" ? 3 : intensity === "Medium" ? 4 : 5,
      reps: intensity === "Easy" ? "12 each side" : intensity === "Medium" ? "10-12 each side" : "8-10 each side",
      restTime: "90 seconds",
      description: "Place one hand and knee on bench, pull dumbbell to hip, lower with control.",
      equipment: ["dumbbells"],
      targetMuscle: "back"
    });
  } else {
    exercises.push({
      name: "Inverted Rows",
      sets: intensity === "Easy" ? 3 : intensity === "Medium" ? 4 : 5,
      reps: intensity === "Easy" ? "8-10" : intensity === "Medium" ? "10-12" : "12-15",
      restTime: "60 seconds",
      description: "Position yourself under a table or bar, pull chest toward the bar, lower with control.",
      equipment: [],
      targetMuscle: "back"
    });
  }
  
  // Leg exercises
  if (hasGym) {
    exercises.push({
      name: "Barbell Squats",
      sets: intensity === "Easy" ? 3 : intensity === "Medium" ? 4 : 5,
      reps: intensity === "Easy" ? "10" : intensity === "Medium" ? "8-10" : "6-8",
      restTime: "120 seconds",
      description: "Place barbell on upper back, squat down until thighs are parallel to floor, stand back up.",
      equipment: ["barbell", "squat rack"],
      targetMuscle: "legs"
    });
  } else if (hasDumbbells || hasKettlebells) {
    exercises.push({
      name: hasKettlebells ? "Kettlebell Goblet Squats" : "Dumbbell Goblet Squats",
      sets: intensity === "Easy" ? 3 : intensity === "Medium" ? 4 : 5,
      reps: intensity === "Easy" ? "12" : intensity === "Medium" ? "10-12" : "8-10",
      restTime: "90 seconds",
      description: `Hold ${hasKettlebells ? "kettlebell" : "dumbbell"} at chest level, squat down until thighs are parallel to floor, stand back up.`,
      equipment: hasKettlebells ? ["kettlebells"] : ["dumbbells"],
      targetMuscle: "legs"
    });
  } else {
    exercises.push({
      name: "Bodyweight Squats",
      sets: intensity === "Easy" ? 3 : intensity === "Medium" ? 4 : 5,
      reps: intensity === "Easy" ? "15" : intensity === "Medium" ? "20" : "25",
      restTime: "60 seconds",
      description: "Stand with feet shoulder-width apart, squat down until thighs are parallel to floor, stand back up.",
      equipment: [],
      targetMuscle: "legs"
    });
  }
  
  // Core exercise
  exercises.push({
    name: "Plank",
    sets: intensity === "Easy" ? 3 : intensity === "Medium" ? 4 : 5,
    reps: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "45 seconds" : "60 seconds",
    restTime: "45 seconds",
    description: "Support your weight on forearms and toes, keep body in straight line from head to heels.",
    equipment: [],
    targetMuscle: "core"
  });
  
  return {
    id: `strength-${Date.now()}`,
    title: hasEquipment ? "Full Body Strength Training" : "Bodyweight Strength Circuit",
    description: `A comprehensive ${hasEquipment ? "equipment-based" : "bodyweight"} strength workout targeting all major muscle groups.`,
    duration: intensity === "Easy" ? "30 min" : intensity === "Medium" ? "45 min" : "60 min",
    intensity,
    category: "Strength",
    exercises,
    imageUrl: workoutImages.strength
  };
};

// Generate a cardio workout
const generateCardioWorkout = (intensity: "Easy" | "Medium" | "Hard"): Workout => {
  let title, description, duration;
  const exercises: Exercise[] = [];
  
  if (intensity === "Easy") {
    title = "Walking Cardio";
    description = "A low-impact walking routine to build cardio endurance without stressing your joints.";
    duration = "30 min";
    
    exercises.push({
      name: "Brisk Walking",
      sets: 1,
      reps: "30 minutes",
      restTime: "None",
      description: "Walk at a brisk pace where you can still hold a conversation but feel slightly breathless.",
      equipment: [],
      targetMuscle: "cardiovascular system"
    });
  } else if (intensity === "Medium") {
    title = "Jogging Intervals";
    description = "Alternating between jogging and walking to build cardio endurance and burn calories.";
    duration = "30 min";
    
    exercises.push({
      name: "Jog/Walk Intervals",
      sets: 8,
      reps: "3 min jog, 1 min walk",
      restTime: "Walking periods serve as rest",
      description: "Alternate between jogging at a moderate pace and walking for recovery.",
      equipment: [],
      targetMuscle: "cardiovascular system"
    });
  } else {
    title = "Running Intervals";
    description = "High-intensity running intervals to maximize calorie burn and cardiovascular fitness.";
    duration = "30 min";
    
    exercises.push({
      name: "Running Intervals",
      sets: 10,
      reps: "2 min run, 1 min walk",
      restTime: "Walking periods serve as rest",
      description: "Alternate between running at a challenging pace and walking for recovery.",
      equipment: [],
      targetMuscle: "cardiovascular system"
    });
  }
  
  return {
    id: `cardio-${Date.now()}`,
    title,
    description,
    duration,
    intensity,
    category: "Cardio",
    exercises,
    imageUrl: workoutImages.cardio
  };
};

// Generate a HIIT workout
const generateHiitWorkout = (intensity: "Easy" | "Medium" | "Hard", equipment: string[]): Workout => {
  const hasDumbbells = equipment.includes("dumbbells");
  const hasKettlebells = equipment.includes("kettlebells");
  const exercises: Exercise[] = [];
  
  // Exercise pool based on available equipment
  const exercisePool: Exercise[] = [
    {
      name: "Jumping Jacks",
      sets: 1,
      reps: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "40 seconds" : "50 seconds",
      restTime: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "20 seconds" : "10 seconds",
      description: "Start with feet together and arms at sides, jump feet out and arms up, then back to start position.",
      equipment: [],
      targetMuscle: "full body"
    },
    {
      name: "Mountain Climbers",
      sets: 1,
      reps: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "40 seconds" : "50 seconds",
      restTime: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "20 seconds" : "10 seconds",
      description: "In plank position, quickly alternate bringing knees toward chest.",
      equipment: [],
      targetMuscle: "core, shoulders"
    },
    {
      name: "Burpees",
      sets: 1,
      reps: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "40 seconds" : "50 seconds",
      restTime: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "20 seconds" : "10 seconds",
      description: "From standing, squat down, kick feet back to plank, perform a push-up, jump feet forward, and jump up with arms overhead.",
      equipment: [],
      targetMuscle: "full body"
    },
    {
      name: "High Knees",
      sets: 1,
      reps: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "40 seconds" : "50 seconds",
      restTime: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "20 seconds" : "10 seconds",
      description: "Jog in place, lifting knees as high as possible toward chest.",
      equipment: [],
      targetMuscle: "core, legs"
    },
    {
      name: "Plank Jacks",
      sets: 1,
      reps: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "40 seconds" : "50 seconds",
      restTime: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "20 seconds" : "10 seconds",
      description: "In plank position, jump feet out wide and back together like a jumping jack.",
      equipment: [],
      targetMuscle: "core, shoulders"
    }
  ];
  
  // Add equipment-based exercises if available
  if (hasDumbbells || hasKettlebells) {
    const weight = hasKettlebells ? "kettlebell" : "dumbbell";
    exercisePool.push(
      {
        name: `${weight.charAt(0).toUpperCase() + weight.slice(1)} Swings`,
        sets: 1,
        reps: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "40 seconds" : "50 seconds",
        restTime: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "20 seconds" : "10 seconds",
        description: `Hold ${weight} with both hands, hinge at hips and swing ${weight} between legs, then thrust hips forward to swing ${weight} to chest height.`,
        equipment: [weight + "s"],
        targetMuscle: "posterior chain"
      },
      {
        name: `${weight.charAt(0).toUpperCase() + weight.slice(1)} Squat Press`,
        sets: 1,
        reps: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "40 seconds" : "50 seconds",
        restTime: intensity === "Easy" ? "30 seconds" : intensity === "Medium" ? "20 seconds" : "10 seconds",
        description: `Hold ${weight}(s) at shoulder height, perform a squat, then press ${weight}(s) overhead as you stand.`,
        equipment: [weight + "s"],
        targetMuscle: "legs, shoulders"
      }
    );
  }
  
  // Pick exercises for the workout
  const numExercises = intensity === "Easy" ? 5 : intensity === "Medium" ? 6 : 8;
  const shuffled = [...exercisePool].sort(() => 0.5 - Math.random());
  
  for (let i = 0; i < Math.min(numExercises, shuffled.length); i++) {
    exercises.push(shuffled[i]);
  }
  
  // Calculate total duration
  const exerciseDuration = intensity === "Easy" ? 30 : intensity === "Medium" ? 40 : 50;
  const restDuration = intensity === "Easy" ? 30 : intensity === "Medium" ? 20 : 10;
  const totalSeconds = exercises.length * (exerciseDuration + restDuration);
  const totalMinutes = Math.ceil(totalSeconds / 60);
  
  return {
    id: `hiit-${Date.now()}`,
    title: "HIIT Cardio Blast",
    description: "A high-intensity interval training workout to boost cardio endurance and maximize calorie burn.",
    duration: `${totalMinutes} min`,
    intensity,
    category: "HIIT",
    exercises,
    imageUrl: workoutImages.hiit
  };
};

// Generate a yoga workout
const generateYogaWorkout = (intensity: "Easy" | "Medium" | "Hard"): Workout => {
  let title, description;
  const exercises: Exercise[] = [];
  
  if (intensity === "Easy") {
    title = "Gentle Yoga Flow";
    description = "A calming sequence of basic yoga poses to improve flexibility and reduce stress.";
    
    exercises.push(
      {
        name: "Child's Pose",
        sets: 1,
        reps: "1 minute",
        restTime: "None",
        description: "Kneel on the floor, touch big toes together and sit on heels, then fold forward with arms extended or by your side.",
        equipment: ["yoga mat"],
        targetMuscle: "back, hips"
      },
      {
        name: "Cat-Cow Stretch",
        sets: 1,
        reps: "1 minute (alternating)",
        restTime: "None",
        description: "On hands and knees, alternate between arching and rounding your back while breathing deeply.",
        equipment: ["yoga mat"],
        targetMuscle: "spine"
      },
      {
        name: "Downward-Facing Dog",
        sets: 1,
        reps: "1 minute",
        restTime: "None",
        description: "Form an inverted V-shape with your body, hands and feet on the floor, hips high, heels reaching toward floor.",
        equipment: ["yoga mat"],
        targetMuscle: "full body"
      },
      {
        name: "Mountain Pose",
        sets: 1,
        reps: "30 seconds",
        restTime: "None",
        description: "Stand tall with feet together, arms at sides, weight evenly distributed through feet.",
        equipment: ["yoga mat"],
        targetMuscle: "posture muscles"
      },
      {
        name: "Warrior I",
        sets: 1,
        reps: "30 seconds each side",
        restTime: "None",
        description: "From mountain pose, step one foot back, turn it out, bend front knee, and raise arms overhead.",
        equipment: ["yoga mat"],
        targetMuscle: "legs, shoulders"
      }
    );
  } else if (intensity === "Medium") {
    title = "Balanced Yoga Flow";
    description = "A balanced sequence of intermediate yoga poses to build strength and flexibility.";
    
    exercises.push(
      {
        name: "Sun Salutation A",
        sets: 3,
        reps: "Full sequence",
        restTime: "None",
        description: "A flowing sequence of poses: mountain pose, forward fold, half-lift, plank, low push-up, upward dog, downward dog, and back to standing.",
        equipment: ["yoga mat"],
        targetMuscle: "full body"
      },
      {
        name: "Warrior II",
        sets: 1,
        reps: "45 seconds each side",
        restTime: "None",
        description: "From mountain pose, step one foot back, turn it out, bend front knee, and extend arms parallel to floor.",
        equipment: ["yoga mat"],
        targetMuscle: "legs, shoulders"
      },
      {
        name: "Triangle Pose",
        sets: 1,
        reps: "45 seconds each side",
        restTime: "None",
        description: "From warrior II, straighten front leg, hinge at hip, and reach hand toward floor with opposite arm extended upward.",
        equipment: ["yoga mat"],
        targetMuscle: "legs, obliques"
      },
      {
        name: "Boat Pose",
        sets: 1,
        reps: "30 seconds",
        restTime: "None",
        description: "Sit on floor, lift legs off ground with knees bent or straight, balance on sit bones with chest lifted.",
        equipment: ["yoga mat"],
        targetMuscle: "core"
      }
    );
  } else {
    title = "Power Yoga Flow";
    description = "An energetic sequence of advanced yoga poses to build strength, flexibility, and balance.";
    
    exercises.push(
      {
        name: "Sun Salutation B",
        sets: 3,
        reps: "Full sequence",
        restTime: "None",
        description: "An extended sun salutation sequence adding chair pose and warrior I poses to the flow.",
        equipment: ["yoga mat"],
        targetMuscle: "full body"
      },
      {
        name: "Crow Pose",
        sets: 1,
        reps: "30 seconds",
        restTime: "None",
        description: "Place hands on floor, knees on back of arms, lean forward until feet lift off floor.",
        equipment: ["yoga mat"],
        targetMuscle: "arms, core"
      },
      {
        name: "Side Plank",
        sets: 1,
        reps: "30 seconds each side",
        restTime: "None",
        description: "From plank position, rotate onto one hand and outer edge of same-side foot, extend other arm upward.",
        equipment: ["yoga mat"],
        targetMuscle: "core, shoulders"
      },
      {
        name: "Wheel Pose",
        sets: 1,
        reps: "30 seconds",
        restTime: "None",
        description: "Lie on back, place hands by ears, lift hips and chest to form an arch with body.",
        equipment: ["yoga mat"],
        targetMuscle: "spine, chest, shoulders"
      }
    );
  }
  
  return {
    id: `yoga-${Date.now()}`,
    title,
    description,
    duration: intensity === "Easy" ? "20 min" : intensity === "Medium" ? "30 min" : "45 min",
    intensity,
    category: "Yoga",
    exercises,
    imageUrl: workoutImages.yoga
  };
};
