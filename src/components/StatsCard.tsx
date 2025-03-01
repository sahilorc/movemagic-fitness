
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Heart, Activity } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  changeLabel?: string;
  icon: "heart" | "activity" | "steps" | "calories";
  trend?: "up" | "down" | "neutral";
  className?: string;
}

const StatsCard = ({
  title,
  value,
  previousValue,
  changeLabel = "vs yesterday",
  icon,
  trend = "neutral",
  className,
}: StatsCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate value changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [value]);

  // Calculate percentage change
  const getPercentageChange = () => {
    if (!previousValue) return null;
    
    const current = typeof value === 'string' ? parseFloat(value) : value;
    const previous = typeof previousValue === 'string' ? parseFloat(previousValue) : previousValue;
    
    if (isNaN(current) || isNaN(previous) || previous === 0) return null;
    
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  const percentChange = getPercentageChange();

  // Determine which icon to render
  const renderIcon = () => {
    switch (icon) {
      case "heart":
        return <Heart className="text-primary animate-pulse-subtle" />;
      case "activity":
        return <Activity className="text-primary" />;
      default:
        return <Activity className="text-primary" />;
    }
  };

  return (
    <div 
      className={cn(
        "neo-morphism flex h-32 flex-col justify-between rounded-2xl p-4 transition-all hover-lift",
        isAnimating && "scale-105 shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="rounded-full bg-secondary p-2">
          {renderIcon()}
        </div>
      </div>
      
      <div className="mt-2">
        <p className={cn(
          "text-2xl font-semibold transition-all",
          isAnimating && "text-primary"
        )}>
          {value}
        </p>
        
        {percentChange && (
          <div className="mt-1 flex items-center gap-1">
            <span className={cn(
              "text-xs font-medium",
              trend === "up" && "text-green-500",
              trend === "down" && "text-red-500",
              trend === "neutral" && "text-muted-foreground"
            )}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "•"} {percentChange}%
            </span>
            <span className="text-xs text-muted-foreground">{changeLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
