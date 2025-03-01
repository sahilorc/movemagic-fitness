
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { motion } from "framer-motion";
import { useState } from "react";

const BasicInfo = () => {
  const { userProfile, updateUserProfile, setCurrentStep } = useOnboarding();
  const [formState, setFormState] = useState({
    name: userProfile.name,
    age: userProfile.age || "",
    gender: userProfile.gender,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormState(prev => ({ ...prev, gender: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name) newErrors.name = "Name is required";
    if (!formState.age) newErrors.age = "Age is required";
    else if (Number(formState.age) < 13 || Number(formState.age) > 100) {
      newErrors.age = "Age must be between 13 and 100";
    }
    if (!formState.gender) newErrors.gender = "Gender is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      updateUserProfile({
        name: formState.name,
        age: Number(formState.age),
        gender: formState.gender,
      });
      setCurrentStep(2);
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
        <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
        <p className="text-muted-foreground">Let's start with some basic details about you.</p>
      </div>

      <div className="space-y-6 flex-1">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            value={formState.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            placeholder="Your age"
            value={formState.age}
            onChange={handleInputChange}
          />
          {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <RadioGroup 
            value={formState.gender} 
            onValueChange={handleRadioChange}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
          {errors.gender && <p className="text-sm text-destructive">{errors.gender}</p>}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setCurrentStep(0)}>
          Back
        </Button>
        <Button onClick={handleSubmit}>
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

export default BasicInfo;
