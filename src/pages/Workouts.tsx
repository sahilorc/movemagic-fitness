
import { useState } from "react";
import Header from "@/components/Header";
import WorkoutCard from "@/components/WorkoutCard";
import { motion } from "framer-motion";

const categories = ["All", "Strength", "Cardio", "Yoga", "Flexibility"];

const workouts = [
  {
    id: 1,
    title: "HIIT Cardio Blast",
    description: "A high-intensity interval training workout to boost your cardio endurance and burn calories.",
    duration: "25 min",
    intensity: "Hard" as const,
    category: "Cardio",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=3270&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Full Body Strength",
    description: "Build strength and muscle with this comprehensive full body routine.",
    duration: "45 min",
    intensity: "Medium" as const,
    category: "Strength",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=3270&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Yoga Flow",
    description: "Improve flexibility, balance, and mindfulness with this calming yoga session.",
    duration: "30 min",
    intensity: "Easy" as const,
    category: "Yoga",
    imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=3270&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Core Crusher",
    description: "Strengthen your core and improve posture with this targeted ab workout.",
    duration: "20 min",
    intensity: "Medium" as const,
    category: "Strength",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=3270&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Flexibility Focus",
    description: "Improve range of motion and prevent injuries with this stretching routine.",
    duration: "25 min",
    intensity: "Easy" as const,
    category: "Flexibility",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=3270&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Tabata Training",
    description: "Maximize calorie burn in minimal time with this efficient Tabata workout.",
    duration: "20 min",
    intensity: "Hard" as const,
    category: "Cardio",
    imageUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=3269&auto=format&fit=crop"
  }
];

const Workouts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

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

      {/* Workouts grid */}
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
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Workouts;
