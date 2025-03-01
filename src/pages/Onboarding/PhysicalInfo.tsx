
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { motion } from "framer-motion";
import { useState } from "react";

const PhysicalInfo = () => {
  const { userProfile, updateUserProfile, setCurrentStep } = useOnboarding();
  const [formState, setFormState] = useState({
    weight: userProfile.weight || "",
    height: userProfile.height || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.weight) newErrors.weight = "Weight is required";
    else if (Number(formState.weight) < 30 || Number(formState.weight) > 500) {
      newErrors.weight = "Weight must be between 30 and 500 lbs";
    }
    
    if (!formState.height) newErrors.height = "Height is required";
    else if (Number(formState.height) < 100 || Number(formState.height) > 250) {
      newErrors.height = "Height must be between 100 and 250 cm";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      updateUserProfile({
        weight: Number(formState.weight),
        height: Number(formState.height),
      });
      setCurrentStep(3);
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
        <h2 className="text-2xl font-bold mb-2">Physical Information</h2>
        <p className="text-muted-foreground">Let us know about your physical measurements.</p>
      </div>

      <div className="space-y-6 flex-1">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (in lbs)</Label>
          <Input
            id="weight"
            name="weight"
            type="number"
            placeholder="Your weight in lbs"
            value={formState.weight}
            onChange={handleInputChange}
          />
          {errors.weight && <p className="text-sm text-destructive">{errors.weight}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Height (in cm)</Label>
          <Input
            id="height"
            name="height"
            type="number"
            placeholder="Your height in cm"
            value={formState.height}
            onChange={handleInputChange}
          />
          {errors.height && <p className="text-sm text-destructive">{errors.height}</p>}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          Back
        </Button>
        <Button onClick={handleSubmit}>
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

export default PhysicalInfo;
