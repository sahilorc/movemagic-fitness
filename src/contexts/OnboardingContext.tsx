
import { createContext, useContext, useState, ReactNode } from "react";

// Define the user profile type
export type UserProfile = {
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  fitnessLevel: "Beginner" | "Intermediate" | "Advanced";
  fitnessGoals: string[];
  preferredWorkouts: string[];
  availableEquipment: string[];
};

// Initial user profile state
const initialUserProfile: UserProfile = {
  name: "",
  age: 0,
  gender: "",
  weight: 0,
  height: 0,
  fitnessLevel: "Beginner",
  fitnessGoals: [],
  preferredWorkouts: [],
  availableEquipment: [],
};

// Define the context type
type OnboardingContextType = {
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
};

// Create the context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Create a provider component
export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5; // Total number of onboarding steps

  // Function to update the user profile
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  };

  return (
    <OnboardingContext.Provider
      value={{
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        userProfile,
        updateUserProfile,
        currentStep,
        setCurrentStep,
        totalSteps,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

// Create a hook to use the context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
