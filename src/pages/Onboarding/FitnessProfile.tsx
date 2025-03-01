
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { motion } from "framer-motion";
import { useState } from "react";

const fitnessGoals = [
  { id: "weight-loss", label: "Weight Loss" },
  { id: "muscle-gain", label: "Muscle Gain" },
  { id: "endurance", label: "Endurance" },
  { id: "flexibility", label: "Flexibility" },
  { id: "overall-fitness", label: "Overall Fitness" },
];

const FitnessProfile = () => {
  const { userProfile, updateUserProfile, setCurrentStep } = useOnboarding();
  const [fitnessLevel, setFitnessLevel] = useState<"Beginner" | "Intermediate" | "Advanced">(
    userProfile.fitnessLevel || "Beginner"
  );
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    userProfile.fitnessGoals || []
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!fitnessLevel) newErrors.fitnessLevel = "Fitness level is required";
    if (selectedGoals.length === 0) newErrors.goals = "Select at least one fitness goal";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      updateUserProfile({
        fitnessLevel,
        fitnessGoals: selectedGoals,
      });
      setCurrentStep(4);
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
        <h2 className="text-2xl font-bold mb-2">Fitness Profile</h2>
        <p className="text-muted-foreground">Tell us about your fitness level and goals.</p>
      </div>

      <div className="space-y-6 flex-1">
        <div className="space-y-2">
          <Label>Your fitness level</Label>
          <RadioGroup 
            value={fitnessLevel} 
            onValueChange={(val) => setFitnessLevel(val as "Beginner" | "Intermediate" | "Advanced")}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Beginner" id="beginner" />
              <Label htmlFor="beginner">Beginner - New to exercise</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Intermediate" id="intermediate" />
              <Label htmlFor="intermediate">Intermediate - Exercise 1-3 times weekly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Advanced" id="advanced" />
              <Label htmlFor="advanced">Advanced - Exercise 4+ times weekly</Label>
            </div>
          </RadioGroup>
          {errors.fitnessLevel && <p className="text-sm text-destructive">{errors.fitnessLevel}</p>}
        </div>

        <div className="space-y-2">
          <Label>Your fitness goals (select all that apply)</Label>
          <div className="space-y-2">
            {fitnessGoals.map(goal => (
              <div key={goal.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={goal.id} 
                  checked={selectedGoals.includes(goal.id)}
                  onCheckedChange={() => handleGoalToggle(goal.id)}
                />
                <Label htmlFor={goal.id}>{goal.label}</Label>
              </div>
            ))}
          </div>
          {errors.goals && <p className="text-sm text-destructive">{errors.goals}</p>}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setCurrentStep(2)}>
          Back
        </Button>
        <Button onClick={handleSubmit}>
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

export default FitnessProfile;
