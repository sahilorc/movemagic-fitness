
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Dumbbell, User, Scan } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState('/');

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);

  const navItems = [
    { label: "Home", icon: Home, route: "/" },
    { label: "Nutrition", icon: Scan, route: "/nutrition" },
    { label: "Workouts", icon: Dumbbell, route: "/workouts" },
    { label: "Profile", icon: User, route: "/profile" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="glass-morphism mx-auto mb-6 flex items-center rounded-full px-4 py-3">
        {navItems.map((item) => {
          const isActive = activeRoute === item.route;
          return (
            <Link
              key={item.route}
              to={item.route}
              className={cn(
                "relative flex flex-col items-center justify-center px-6 py-2 transition-all duration-300 ease-in-out",
                isActive ? "text-primary scale-110" : "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "absolute -bottom-3 h-1 w-8 rounded-full transition-all duration-300",
                  isActive ? "bg-primary" : "bg-transparent"
                )}
              />
              <item.icon className="h-5 w-5" />
              <span className="mt-1 text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
