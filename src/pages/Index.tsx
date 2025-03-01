
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import WorkoutCard from "@/components/WorkoutCard";
import { motion } from "framer-motion";

const Index = () => {
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good morning");
    else if (hours < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

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
        title={`${greeting}, Sarah`}
        subtitle="Monday, June 12"
      />

      {/* Stats section */}
      <section className="mb-8">
        <motion.div 
          className="grid grid-cols-2 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <StatsCard
              title="Heart Rate"
              value="72 bpm"
              previousValue="68"
              icon="heart"
              trend="up"
            />
          </motion.div>
          <motion.div variants={item}>
            <StatsCard
              title="Activity"
              value="842 cal"
              previousValue="790"
              icon="activity"
              trend="up"
            />
          </motion.div>
          <motion.div variants={item}>
            <StatsCard
              title="Steps"
              value="5,248"
              previousValue="4,800"
              icon="activity"
              trend="up"
            />
          </motion.div>
          <motion.div variants={item}>
            <StatsCard
              title="Sleep"
              value="7h 24m"
              previousValue="6h 58m"
              icon="activity"
              trend="up"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Today's plan section */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-medium">Today's Plan</h2>
          <button className="text-sm font-medium text-primary">View all</button>
        </div>
        
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Up Next • 10:00 AM</p>
              <h3 className="text-lg font-medium">Morning Cardio</h3>
              <p className="text-sm text-muted-foreground">30 min • 150 cal</p>
            </div>
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 transition-colors">
              Start
            </button>
          </div>
          
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-3/12 bg-primary" />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">3 of 8 workouts completed this week</p>
        </div>
      </section>

      {/* Recommended workouts */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-medium">Recommended For You</h2>
          <button className="text-sm font-medium text-primary">View all</button>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <WorkoutCard
              title="HIIT Cardio Blast"
              description="A high-intensity interval training workout to boost your cardio endurance and burn calories."
              duration="25 min"
              intensity="Hard"
              imageUrl="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=3270&auto=format&fit=crop"
            />
          </motion.div>
          <motion.div variants={item}>
            <WorkoutCard
              title="Full Body Strength"
              description="Build strength and muscle with this comprehensive full body routine."
              duration="45 min"
              intensity="Medium"
              imageUrl="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=3270&auto=format&fit=crop"
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
