
import { useState } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Button } from "@/components/ui/button";

const statsData = [
  { label: "Workouts", value: "32" },
  { label: "Total Minutes", value: "860" },
  { label: "Calories", value: "12,480" },
  { label: "Streak", value: "8 days" }
];

const achievements = [
  { id: 1, title: "Early Bird", description: "Complete 5 workouts before 8AM", progress: 80 },
  { id: 2, title: "Power User", description: "Log in for 10 consecutive days", progress: 100 },
  { id: 3, title: "Cardio Master", description: "Complete 20 cardio workouts", progress: 65 }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("stats");
  const navigate = useNavigate();
  const { userProfile, setHasCompletedOnboarding } = useOnboarding();

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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  const handleEditProfile = () => {
    // Reset onboarding state to go through the flow again
    setHasCompletedOnboarding(false);
    navigate("/onboarding");
  };

  return (
    <div className="pb-24">
      <div className="mb-8 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-background bg-secondary">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 rounded-full bg-primary p-2 shadow-md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4H8C6.9 4 6 4.9 6 6V18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V6C18 4.9 17.1 4 16 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-medium">{userProfile.name || "Sarah Johnson"}</h2>
        <p className="text-muted-foreground">Fitness Enthusiast</p>
        
        <div className="mt-4 flex gap-3">
          <Button 
            onClick={handleEditProfile}
            className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 transition-colors"
          >
            Edit Profile
          </Button>
          <Button 
            variant="outline"
            className="rounded-full border border-border bg-background px-6 py-2 text-sm font-medium shadow-sm hover:bg-muted/30 transition-colors"
          >
            Settings
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-border">
        <div className="flex gap-4">
          {["stats", "achievements"].map((tab) => (
            <button
              key={tab}
              className={cn(
                "pb-2 font-medium capitalize transition-colors relative",
                activeTab === tab 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary"
                  layoutId="tabIndicator"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Tab Content */}
      {activeTab === "stats" && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="mb-8 grid grid-cols-2 gap-4">
            {statsData.map((stat, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="neo-morphism flex flex-col items-center rounded-xl p-4 text-center"
              >
                <p className="text-xl font-semibold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="space-y-6">
            <motion.div variants={item}>
              <h3 className="mb-3 text-lg font-medium">Activity</h3>
              <div className="grid grid-cols-7 gap-1 h-24">
                {Array.from({ length: 28 }).map((_, i) => {
                  const intensity = Math.floor(Math.random() * 4);
                  let bgColor = "bg-secondary";
                  
                  if (intensity === 1) bgColor = "bg-primary/30";
                  if (intensity === 2) bgColor = "bg-primary/60";
                  if (intensity === 3) bgColor = "bg-primary";
                  
                  return (
                    <div key={i} className="flex flex-col items-center">
                      {i < 7 && (
                        <span className="text-xs text-muted-foreground mb-1">
                          {["M", "T", "W", "T", "F", "S", "S"][i]}
                        </span>
                      )}
                      <div className={`${bgColor} w-full rounded-sm aspect-square`} />
                    </div>
                  );
                })}
              </div>
            </motion.div>
            
            <motion.div variants={item} className="pt-4">
              <h3 className="mb-3 text-lg font-medium">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { date: "Today", workout: "Morning Yoga", duration: "30 min" },
                  { date: "Yesterday", workout: "HIIT Cardio", duration: "25 min" },
                  { date: "Mon, June 10", workout: "Full Body Strength", duration: "45 min" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                      <p className="font-medium">{activity.workout}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{activity.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Achievements Tab Content */}
      {activeTab === "achievements" && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {achievements.map((achievement) => (
            <motion.div 
              key={achievement.id}
              variants={item}
              className="neo-morphism overflow-hidden rounded-xl"
            >
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-medium">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary font-medium">
                  {achievement.progress === 100 ? "✓" : `${achievement.progress}%`}
                </div>
              </div>
              <div className="h-1 w-full bg-secondary">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-out" 
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
