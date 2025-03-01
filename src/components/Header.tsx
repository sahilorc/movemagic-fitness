
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Header = ({ title, subtitle, className }: HeaderProps) => {
  return (
    <div className={cn("mb-6 space-y-1", className)}>
      {subtitle && (
        <p className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {subtitle}
        </p>
      )}
      <h1 className="animate-slide-down text-3xl font-medium tracking-tight">
        {title}
      </h1>
    </div>
  );
};

export default Header;
