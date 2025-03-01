
import { cn } from "@/lib/utils";
import { useState } from "react";

interface WorkoutCardProps {
  title: string;
  description: string;
  duration: string;
  intensity: "Easy" | "Medium" | "Hard";
  imageUrl?: string;
  className?: string;
  onClick?: () => void;
}

const WorkoutCard = ({
  title,
  description,
  duration,
  intensity,
  imageUrl = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=3270&auto=format&fit=crop",
  className,
  onClick,
}: WorkoutCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get background color based on intensity
  const getIntensityColor = () => {
    switch (intensity) {
      case "Easy":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "Hard":
        return "bg-red-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300",
        "border border-border shadow-sm hover:shadow-md hover-lift",
        "cursor-pointer bg-card",
        isHovered && "ring-1 ring-primary",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-transform duration-700",
            isHovered && "scale-105"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{duration}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={cn(
              "h-2 w-2 rounded-full",
              getIntensityColor()
            )} />
            <span className="text-xs text-muted-foreground">{intensity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
