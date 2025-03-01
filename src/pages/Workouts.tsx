
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import WorkoutCard from "@/components/WorkoutCard";
import { motion } from "framer-motion";
import { Workout, generateWorkouts } from "@/services/WorkoutService";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Strength", "Cardio", "Yoga", "HIIT", "Flexibility"];

const Workouts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { userProfile, hasCompletedOnboarding } = useOnboarding();
  const navigate = useNavigate();

  useEffect(() => {
    // If user hasn't completed onboarding, redirect to onboarding
    if (!hasCompletedOnboarding) {
      navigate("/onboarding");
      return;
    }

    // Generate workouts based on user profile
    const generatedWorkouts = generateWorkouts(userProfile);
    setWorkouts(generatedWorkouts);
  }, [userProfile, hasCompletedOnboarding, navigate]);

  // Filter workouts by selected category
  const filteredWorkouts = selectedCategory === "All" 
    ? workouts 
    : workouts.filter(workout => workout.category === selectedCategory);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="pb-24">
      <Header 
        title="Workouts"
        subtitle="Find your perfect routine"
      />

      {/* Categories */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {categories.map(category => (
          <button
            key={category}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all
              ${selectedCategory === category 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {workouts.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          <p>Customizing workouts based on your profile...</p>
        </div>
      ) : (
        /* Workouts grid */
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredWorkouts.map(workout => (
            <motion.div key={workout.id} variants={item}>
              <WorkoutCard
                title={workout.title}
                description={workout.description}
                duration={workout.duration}
                intensity={workout.intensity}
                imageUrl={workout.imageUrl}
                onClick={() => {
                  // Handle workout selection
                  console.log("Selected workout:", workout);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Workouts;
