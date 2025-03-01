
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useOnboarding } from "@/contexts/OnboardingContext";

const Welcome = () => {
  const { setCurrentStep } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full px-6 py-12 text-center"
    >
      <div className="max-w-md mx-auto space-y-8">
        <div className="bg-primary/10 rounded-full p-6 h-32 w-32 mx-auto flex items-center justify-center">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <path d="M21 5.25L12 13.5L3 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 5.25H21V18C21 18.1989 20.921 18.3897 20.7803 18.5303C20.6397 18.671 20.4489 18.75 20.25 18.75H3.75C3.55109 18.75 3.36032 18.671 3.21967 18.5303C3.07902 18.3897 3 18.1989 3 18V5.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.3638 13.5L3.23145 19.5375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.7692 19.5375L13.6369 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold">Welcome to FitTrack</h1>
        
        <p className="text-muted-foreground">
          Let's personalize your experience with a few quick questions.
          This will help us create customized workout plans just for you.
        </p>
        
        <Button 
          onClick={() => setCurrentStep(1)} 
          className="w-full"
          size="lg"
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  );
};

export default Welcome;
