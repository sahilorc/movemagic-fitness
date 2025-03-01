
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { motion } from "framer-motion";
import { useState } from "react";

const equipmentOptions = [
  { id: "no-equipment", label: "No Equipment (Bodyweight only)" },
  { id: "dumbbells", label: "Dumbbells" },
  { id: "resistance-bands", label: "Resistance Bands" },
  { id: "kettlebells", label: "Kettlebells" },
  { id: "pull-up-bar", label: "Pull-up Bar" },
  { id: "bench", label: "Bench" },
  { id: "full-gym", label: "Full Gym Access" },
];

const preferredWorkouts = [
  { id: "hiit", label: "HIIT (High Intensity Interval Training)" },
  { id: "strength", label: "Strength Training" },
  { id: "cardio", label: "Cardio" },
  { id: "yoga", label: "Yoga" },
  { id: "pilates", label: "Pilates" },
  { id: "calisthenics", label: "Calisthenics" },
];

const Equipment = () => {
  const { userProfile, updateUserProfile, setCurrentStep, setHasCompletedOnboarding } = useOnboarding();
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(
    userProfile.availableEquipment || ["no-equipment"]
  );
  const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>(
    userProfile.preferredWorkouts || []
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleEquipmentToggle = (id: string) => {
    // If selecting "no-equipment", deselect all others
    if (id === "no-equipment") {
      setSelectedEquipment(prev => 
        prev.includes(id) ? [] : ["no-equipment"]
      );
    } else {
      // If selecting any other equipment, remove "no-equipment"
      setSelectedEquipment(prev => {
        const updated = prev.filter(item => item !== "no-equipment");
        return updated.includes(id)
          ? updated.filter(item => item !== id)
          : [...updated, id];
      });
    }
  };

  const handleWorkoutToggle = (id: string) => {
    setSelectedWorkouts(prev => 
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (selectedEquipment.length === 0) {
      newErrors.equipment = "Select at least one equipment option";
    }
    
    if (selectedWorkouts.length === 0) {
      newErrors.workouts = "Select at least one workout type";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      updateUserProfile({
        availableEquipment: selectedEquipment,
        preferredWorkouts: selectedWorkouts,
      });
      setHasCompletedOnboarding(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex flex-col h-full px-6 py-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Equipment & Preferences</h2>
        <p className="text-muted-foreground">Tell us what equipment you have and workout types you prefer.</p>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto">
        <div className="space-y-2">
          <Label>Available Equipment</Label>
          <div className="space-y-2">
            {equipmentOptions.map(item => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`eq-${item.id}`} 
                  checked={selectedEquipment.includes(item.id)}
                  onCheckedChange={() => handleEquipmentToggle(item.id)}
                />
                <Label htmlFor={`eq-${item.id}`}>{item.label}</Label>
              </div>
            ))}
          </div>
          {errors.equipment && <p className="text-sm text-destructive">{errors.equipment}</p>}
        </div>

        <div className="space-y-2">
          <Label>Preferred Workout Types</Label>
          <div className="space-y-2">
            {preferredWorkouts.map(item => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`wk-${item.id}`} 
                  checked={selectedWorkouts.includes(item.id)}
                  onCheckedChange={() => handleWorkoutToggle(item.id)}
                />
                <Label htmlFor={`wk-${item.id}`}>{item.label}</Label>
              </div>
            ))}
          </div>
          {errors.workouts && <p className="text-sm text-destructive">{errors.workouts}</p>}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setCurrentStep(3)}>
          Back
        </Button>
        <Button onClick={handleSubmit}>
          Complete Setup
        </Button>
      </div>
    </motion.div>
  );
};

export default Equipment;
