
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Welcome from "./Welcome";
import BasicInfo from "./BasicInfo";
import PhysicalInfo from "./PhysicalInfo";
import FitnessProfile from "./FitnessProfile";
import Equipment from "./Equipment";

const Onboarding = () => {
  const { currentStep, hasCompletedOnboarding } = useOnboarding();
  const navigate = useNavigate();

  useEffect(() => {
    if (hasCompletedOnboarding) {
      navigate("/");
    }
  }, [hasCompletedOnboarding, navigate]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Welcome />;
      case 1:
        return <BasicInfo />;
      case 2:
        return <PhysicalInfo />;
      case 3:
        return <FitnessProfile />;
      case 4:
        return <Equipment />;
      default:
        return <Welcome />;
    }
  };

  return (
    <div className="h-[100vh] flex flex-col">
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
